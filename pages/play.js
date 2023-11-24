import { useState, useEffect, useCallback } from "react";

import { fetchAllCrosswordLevels, calcGameScore } from "../utils";

import Memorize from "../components/memorize";
import Game from "../components/game";
import GameEnd from "../components/game-end/";

const DELAYS = {
    // in miliseconds
    memorize: {
        firstPart: 4000,
        secondPart: 4000,
    },
    fade: 1000,
    short: 250,
    normal: 500,
    long: 1000,
};

let crossword;

export default function Play({ allCrosswordLevels }) {
    const [showUi, setShowUi] = useState({
        isMemorizeNext: true,
        isGameNext: false,
        isGameDone: false,
    });

    const [userStats, setUserStats] = useState({
        scores: {
            level: 0,
            total: 0,
        },
    });

    const [gameStats, setGameStats] = useState({
        level: 1,
        result: null,
        timeLeft: null,
        wordsFoundNum: null,
    });

    const [retryData, setRetryData] = useState();

    if (retryData) {
        crossword = retryData.crossword;
    } else {
        crossword = allCrosswordLevels[gameStats.level];
    }

    // --- handlers ---

    const handleMemorizeEnd = () => {
        setShowUi((ui) => {
            return {
                ...ui,
                isMemorizeNext: false,
                isGameNext: true,
            };
        });
    };

    const handleGameEnd = useCallback((data) => {
        setGameStats((gameStats) => {
            return {
                ...gameStats,
                result: data.result,
                timeLeft: data.timeLeft,
                wordsFoundNum: data.wordsFoundNum,
            };
        });

        if (data.result === "completed") {
            const score = calcGameScore(data.wordsFoundNum, data.timeLeft);

            setUserStats((userStats) => {
                return {
                    ...userStats,
                    scores: {
                        level: score,
                        total: userStats.scores.total + score,
                    },
                };
            });

            setRetryData(null);
        }

        setShowUi((ui) => {
            return {
                ...ui,
                isGameDone: true,
                isGameNext: false,
            };
        });
    }, []);

    const handleNextClick = () => {
        // update level
        setGameStats((gameStats) => {
            return {
                ...gameStats,
                level: gameStats.level + 1,
            };
        });

        // mount components
        setShowUi((ui) => {
            return {
                ...ui,
                isMemorizeNext: true,
                isGameDone: false,
            };
        });
    };

    const handleRetryGame = (data) => {
        setRetryData({ crossword: data });

        setShowUi((ui) => {
            return {
                ...ui,
                isMemorizeNext: true,
                isGameNext: false,
                isGameDone: false,
            };
        });
    };

    return (
        <>
            {showUi.isMemorizeNext && (
                <Memorize
                    level={gameStats.level}
                    wordsToMemorize={crossword.insertedWords.map(
                        (data) => data.word
                    )}
                    timeToMemorize={crossword.timeAllocation.memorize}
                    onEnd={handleMemorizeEnd}
                    delays={DELAYS}
                />
            )}

            {showUi.isGameNext && (
                <Game
                    crossword={crossword}
                    timeToPlay={crossword.timeAllocation.game}
                    delays={DELAYS}
                    onGameEnd={handleGameEnd}
                />
            )}

            {showUi.isGameDone && (
                <GameEnd
                    level={gameStats.level}
                    result={gameStats.result}
                    timeLeft={gameStats.timeLeft}
                    wordsFoundNum={gameStats.wordsFoundNum}
                    levelScore={userStats.scores.level}
                    totalScore={userStats.scores.total}
                    onNextClick={handleNextClick}
                    onRetryClick={handleRetryGame}
                />
            )}
        </>
    );
}

export async function getServerSideProps() {
    const data = await fetchAllCrosswordLevels();

    return {
        props: {
            allCrosswordLevels: data,
        },
    };
}
