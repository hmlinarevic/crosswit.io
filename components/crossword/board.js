import { useState, useEffect, useCallback, useRef } from "react";

import Square from "../square";

/**
 * Returns indices for the single straight line (horizontal, vertical, or diagonal)
 * from the drag start cell to the drag end cell. Direction is inferred from
 * start → current each time, so changing direction replaces the line entirely.
 * The segment is exactly the letters between start and current (inclusive).
 */
function getLineIndicesFromStartToCurrent(startIdx, currentIdx, gridSize) {
    const maxIdx = gridSize * gridSize - 1;
    const start = Math.max(0, Math.min(startIdx, maxIdx));
    const current = Math.max(0, Math.min(currentIdx, maxIdx));
    if (start === current) return [start];

    const r0 = Math.floor(start / gridSize);
    const c0 = start % gridSize;
    const r1 = Math.floor(current / gridSize);
    const c1 = current % gridSize;

    const dR = r1 - r0;
    const dC = c1 - c0;
    const stepR = dR === 0 ? 0 : dR > 0 ? 1 : -1;
    const stepC = dC === 0 ? 0 : dC > 0 ? 1 : -1;
    const step = stepC + stepR * gridSize;

    // End = current cell when it's on the line, otherwise the last cell on the line before passing current
    let endR, endC;
    if (stepR === 0) {
        endR = r0;
        endC = Math.max(0, Math.min(gridSize - 1, c1));
    } else if (stepC === 0) {
        endR = Math.max(0, Math.min(gridSize - 1, r1));
        endC = c0;
    } else {
        // Diagonal: (r1,c1) on line from (r0,c0) iff (r1-r0)*stepR === (c1-c0)*stepC
        const onLine = (r1 - r0) * stepR === (c1 - c0) * stepC;
        const kMaxGridR = stepR > 0 ? (gridSize - 1) - r0 : r0;
        const kMaxGridC = stepC > 0 ? (gridSize - 1) - c0 : c0;
        const kMax = Math.min(kMaxGridR, kMaxGridC);
        const kToCurrent = stepR === 1 ? (r1 - r0) : (r0 - r1);
        const kCap = Math.max(0, Math.min(kToCurrent, kMax));
        const k = onLine ? kCap : Math.max(0, Math.min(kMax, Math.round(stepR === 1 ? (r1 - r0) : (r0 - r1))));
        endR = r0 + k * stepR;
        endC = c0 + k * stepC;
    }

    const endIdx = endR * gridSize + endC;
    const indices = [];
    let i = start;

    while (true) {
        indices.push(i);
        if (i === endIdx) break;

        const next = i + step;
        const nr = Math.floor(next / gridSize);
        const nc = next % gridSize;

        if (nr < 0 || nr >= gridSize || nc < 0 || nc >= gridSize) break;
        if (stepR !== 0 && (stepR > 0 ? nr > endR : nr < endR)) break;
        if (stepC !== 0 && (stepC > 0 ? nc > endC : nc < endC)) break;

        i = next;
    }

    return indices;
}

const collectedData = {
    squares: [],
    indexes: [],

    clear() {
        this.squares = [];
        this.indexes = [];
    },
};

const colors = [
    "#3f3574",
    "#453a80",
    "#4c408d",
    "#54469b",
    "#774a97",
    "#994e92",
    "#bb528e",
    "#cc548c",
    "#dd5589",
    "#524f67",
];

export default function Board({ crossword, onFoundWord, hoverHighlightIndexes }) {
    const [selectMode, setSelectMode] = useState({ isActive: false });
    const [selectedData, setSelectedData] = useState({
        squares: [],
        indexes: [],
    });
    const [searchResult, setSearchResult] = useState({ isOk: false });
    const [colorIndex, setColorIndex] = useState(0); // turn of for testing
    // const [searchColor, setSearchColor] = useState(colors[colorIndex]); // turn off for testing
    const [searchColor, setSearchColor] = useState("#403d52"); // testing
    const [currentSelectionIndexes, setCurrentSelectionIndexes] = useState([]);
    const selectModeRef = useRef(selectMode);
    const reportedWordKeysRef = useRef(new Set());
    const lastPuzzleKeyRef = useRef("");

    useEffect(() => {
        selectModeRef.current = selectMode;
    }, [selectMode]);

    // Only clear reported words when the puzzle actually changes (e.g. new level), not on
    // every re-render, so mobile re-renders don't reset and allow the same word to count again.
    useEffect(() => {
        const puzzleKey = crossword.size + "-" + (crossword.insertedWords ?? [])
            .map((e) => e.indexes.slice().sort((a, b) => a - b).join(","))
            .sort()
            .join("|");
        if (lastPuzzleKeyRef.current !== puzzleKey) {
            lastPuzzleKeyRef.current = puzzleKey;
            reportedWordKeysRef.current.clear();
        }
    }, [crossword]);

    const toggleSelectMode = () => {
        setSelectMode((selectMode) => {
            return { isActive: !selectMode.isActive };
        });
    };

    // Only sets the first cell (mousedown/touchstart). Line updates only from mousemove/touchmove
    // via addToCollectedDataByIndex so the highlighted line has a single source of truth.
    const addToCollectedData = useCallback((e, index) => {
        if (collectedData.indexes.length === 0) {
            collectedData.squares.push(e.target.innerText);
            collectedData.indexes.push(index);
            setCurrentSelectionIndexes(collectedData.indexes.slice());
        }
        // When we already have a start, do not update the line here; mousemove/touchmove will.
    }, []);

    const addToCollectedDataByIndex = useCallback((index) => {
        const size = crossword.size;
        const letter = crossword.squares[index];
        if (letter == null) return;
        if (collectedData.indexes.length === 0) {
            collectedData.squares.push(letter);
            collectedData.indexes.push(index);
            setCurrentSelectionIndexes(collectedData.indexes.slice());
            return;
        }
        const startIdx = collectedData.indexes[0];
        const line = getLineIndicesFromStartToCurrent(startIdx, index, size);
        collectedData.indexes = line;
        collectedData.squares = line.map((i) => crossword.squares[i] ?? "");
        setCurrentSelectionIndexes(line);
    }, [crossword.size, crossword.squares]);

    useEffect(() => {
        const handleMouseDown = () => {
            toggleSelectMode();
        };

        const handleMouseUp = () => {
            toggleSelectMode();
            setCurrentSelectionIndexes([]);
            setSelectedData({
                indexes: collectedData.indexes.slice(),
                squares: collectedData.squares.slice(),
            });
            collectedData.clear();
        };

        const handleMouseMove = (e) => {
            if (!selectModeRef.current.isActive) return;
            const el = document.elementFromPoint(e.clientX, e.clientY);
            const square = el?.closest?.("[data-square-index]");
            if (square) {
                const index = parseInt(square.getAttribute("data-square-index"), 10);
                if (Number.isNaN(index)) return;
                const lastIdx = collectedData.indexes[collectedData.indexes.length - 1];
                if (lastIdx === index) return;
                addToCollectedDataByIndex(index);
            }
        };

        const handleTouchStart = () => {
            toggleSelectMode();
        };

        const handleTouchEnd = () => {
            toggleSelectMode();
            setCurrentSelectionIndexes([]);
            setSelectedData({
                indexes: collectedData.indexes.slice(),
                squares: collectedData.squares.slice(),
            });
            collectedData.clear();
        };

        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("touchstart", handleTouchStart, { capture: true });
        document.addEventListener("touchend", handleTouchEnd, { capture: true });

        return () => {
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("touchstart", handleTouchStart, { capture: true });
            document.removeEventListener("touchend", handleTouchEnd, { capture: true });
        };
    }, [addToCollectedDataByIndex]);

    const search = useCallback(() => {
        let matchedEntry = null;

        crossword.insertedWords.find((entry) => {
            const word =
                entry.word === selectedData.squares.join("").toLowerCase();

            if (word) {
                const match = entry.indexes.every((entryIndex, i) => {
                    return entryIndex === selectedData.indexes[i];
                });
                if (match) {
                    matchedEntry = entry;
                    return true;
                }
            }
        });

        if (matchedEntry) {
            setSearchResult({
                isOk: true,
                indexes: selectedData.indexes,
            });
            setSearchColor(prevState => prevState);
            // Use puzzle's canonical indexes so the same word counts once regardless of selection direction
            const key = matchedEntry.indexes.join(",");
            if (!reportedWordKeysRef.current.has(key)) {
                reportedWordKeysRef.current.add(key);
                onFoundWord();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedData, crossword, onFoundWord]);

    useEffect(() => {
        if (selectedData.squares.length) {
            search();
        }
    }, [selectedData, search]);

    useEffect(() => {
        if (searchResult.isOk) {
            setColorIndex((prevIndex) => prevIndex + 1);
        }
    }, [searchResult]);

    useEffect(() => {
        const handleTouchMove = (e) => {
            if (!selectModeRef.current.isActive || !e.changedTouches?.length) return;
            e.preventDefault();
            const touch = e.changedTouches[0];
            const el = document.elementFromPoint(touch.clientX, touch.clientY);
            const square = el?.closest?.("[data-square-index]");
            if (square) {
                const index = parseInt(square.getAttribute("data-square-index"), 10);
                if (Number.isNaN(index)) return;
                const lastIdx = collectedData.indexes[collectedData.indexes.length - 1];
                if (lastIdx === index) return;
                addToCollectedDataByIndex(index);
            }
        };
        document.addEventListener("touchmove", handleTouchMove, { passive: false });
        return () => document.removeEventListener("touchmove", handleTouchMove);
    }, [addToCollectedDataByIndex]);

    const size = crossword.size;
    const gapPx = 6;
    const maxW = `calc((100dvw - 2rem - ${(size - 1) * gapPx}px) / ${size})`;
    const maxH = `calc((100dvh - 14rem - ${(size - 1) * gapPx}px) / ${size})`;
    const squareSize = `min(42px, ${maxW}, ${maxH})`;

    return (
        <div
            className="mx-auto w-fit max-w-[min(100dvw,100%)] max-h-[min(100dvh,100%)]"
            style={{ "--board-square-size": squareSize }}
        >
        <ul
            className={`grid h-fit w-fit justify-items-center gap-1.5 font-ubuntu touch-none select-none ${selectMode.isActive ? "cursor-grabbing" : "cursor-grab"}`}
            style={{
                gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
            }}
        >
            {crossword.squares.map((val, i) => (
                <Square
                    key={val + i}
                    index={i}
                    value={val}
                    isSelectMode={selectMode.isActive}
                    onSquareEnter={addToCollectedData}
                    searchResult={searchResult}
                    searchColor={searchColor}
                    isInCurrentSelection={currentSelectionIndexes.includes(i)}
                    isHoverHighlight={hoverHighlightIndexes?.includes(i)}
                />
            ))}
        </ul>
        </div>
    );
}
