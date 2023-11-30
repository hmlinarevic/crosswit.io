import { useState, useEffect, useCallback } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";

import Fade from "../fade";
import Button from "../ui/button";

import { fetchCrosswordLevel } from "../../utils";
import { XCircle } from "react-feather";

let retryLevel;

export default function GameEndFailed({
    level,
    result,
    levelScore,
    totalScore,
    onQuitClick,
    onRetryClick,
}) {
    const [showResults, setShowResults] = useState();

    const status = `level ${level} ${result}`;

    const handleRetryClick = () => {
        setShowResults(false);

        setTimeout(() => {
            onRetryClick(retryLevel);
        }, 500);
    };

    useEffect(() => {
        setTimeout(() => {
            setShowResults(true);
        }, 500);
    }, []);

    useEffect(() => {
        const storeRetryLevel = async () => {
            retryLevel = await fetchCrosswordLevel(level);
        };

        storeRetryLevel();
    }, [level, totalScore]);

    return (
        <Fade toggler={showResults} duration={500} className="relative">
            <XCircle
                size={26}
                className="mx-auto mb-1 block text-4xl text-love absolute top-[-2.25rem] left-2 right-2"
            />

            {/* status */}
            <h2 className="mb-6 font-caveat text-4xl text-love">{status}</h2>

            {/* buttons */}
            <Button
                className="mx-auto mb-3"
                onClick={handleRetryClick}
            >
                retry
            </Button>
            <Button
                className="mx-auto"
                onClick={onQuitClick}
            >
                quit
            </Button>
            {/* total score */}
            <div className="mt-12 text-center">
                <span className="font-bold text-rose">
                    TOTAL SCORE{" "}
                    <span className="font-bold text-love">{totalScore}</span>
                </span>
            </div>
        </Fade>
    );
}
