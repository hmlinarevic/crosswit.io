import { useEffect, useState } from "react";

export default function Square({
    value,
    isSelectMode,
    index,
    onSquareEnter,
    searchResult,
    searchColor,
}) {
    // state

    const [styles, setStyles] = useState({
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "transparent",
        backgroundColor: "transparent",
    });

    // effects

    useEffect(() => {
        if (searchResult.isOk && searchResult.indexes.includes(index)) {
            changeBgColor(searchColor);
        }
    }, [searchResult, index, searchColor]);

    useEffect(() => {
        if (!isSelectMode) {
            changeBorder("transparent");
        }
    }, [isSelectMode]);

    // functions

    const changeBorder = (color) => {
        setStyles((prevStyles) => {
            return { ...prevStyles, borderColor: color };
        });
    };

    const changeBgColor = (color) => {
        setStyles((prevStyles) => {
            return { ...prevStyles, backgroundColor: color, color: "white" };
        });
    };

    const selectSquareOnMouseEnter = (e) => {
        if (!isSelectMode) return;

        changeBorder(searchColor);
        onSquareEnter(e, index);
    };

    // fix isSelectMode being false when mouse down on square
    const selectSquareOnMouseDown = (e) => {
        changeBorder(searchColor);
        onSquareEnter(e, index);
    };

    return (
        <li className="select-none">
            <span
                onMouseDown={selectSquareOnMouseDown}
                onMouseEnter={selectSquareOnMouseEnter}
                className="block rounded border-amber-300 px-4 py-2 transition-colors"
                style={styles}
            >
                {(value && value.toUpperCase()) || "."}
            </span>
        </li>
    );
}
