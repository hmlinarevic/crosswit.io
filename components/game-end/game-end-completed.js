import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

import ScoreRow from "./score-row";
import Button from "../ui/button";
import Fade from "../fade";

export default function GameEndCompleted({
    level,
    result,
    levelScore,
    totalScore,
    wordsFoundNum,
    timeLeft,
    onNextClick,
    onQuitClick,
}) {
    const [showResults, setShowResults] = useState();

    const handleNextClick = () => {
        setShowResults(false);

        setTimeout(() => {
            onNextClick();
        }, 500);
    };

    useEffect(() => {
        setTimeout(() => {
            setShowResults(true);
        }, 500);
    }, []);

    // e.i. "level 01 completed"
    const status = `level ${level < 10 && 0}${level} ${result}`;

    return (
        <Fade toggler={showResults} duration={500}>
            {/* icon */}
            <FontAwesomeIcon
                icon={faCheckCircle}
                className="mx-auto mb-4 block text-4xl text-green-700"
            />
            {/* status */}
            <h2 className="mb-8 text-3xl">{status}</h2>

            {/* score card */}
            <div className="mt-4 mb-8 min-w-[220px] rounded-3xl border border-green-700 bg-green-900 bg-opacity-10 p-10">
                <ScoreRow className="mb-4 text-2xl">
                    <span>score</span>
                    <span className="text-green-400">{levelScore}</span>
                </ScoreRow>
                <ScoreRow>
                    <span className="text-neutral-500">words found</span>
                    <span className="text-right text-green-400">
                        {wordsFoundNum}
                    </span>
                </ScoreRow>
                <ScoreRow>
                    <span className="text-neutral-500">time left</span>
                    <span className="text-right text-green-400">
                        + {timeLeft}
                    </span>
                </ScoreRow>
            </div>

            {/* buttons */}
            <Button
                className="rounded-3xl py-2 px-12"
                onClick={handleNextClick}
            >
                next
            </Button>
            <Button
                className="mt-4 rounded-3xl py-2 px-12"
                onClick={onQuitClick}
            >
                quit
            </Button>

            {/* total score */}
            <div className="mt-12 text-center">
                <span className="text-neutral-500">
                    total score{" "}
                    <span className="text-violet-500 opacity-100">
                        {totalScore}
                    </span>
                </span>
            </div>
        </Fade>
    );
}
