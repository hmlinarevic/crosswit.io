import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Fade from "../components/fade";
import Button from "../components/ui/button";
import Leaderboard from "../components/leaderboard";
import brainPng from "../public/brainv.png";

export default function Home() {
    const [showContent, setShowContent] = useState(true);
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    const router = useRouter();

    const handlePlayClick = () => {
        setShowContent(false);
    };

    const changePage = () => {
        router.push("/play");
    };

    const showLeaderboardHandler = () => {
        setShowLeaderboard((prevState) => !prevState);
    };

    return (
        <>
            {showLeaderboard && (
                <Leaderboard onClose={showLeaderboardHandler} />
            )}

            <section className="grid h-screen place-content-center">
                <Fade toggler={showContent} duration={500} onEnd={changePage}>
                    <div className="flex select-none items-center justify-center font-titilliumWeb text-6xl">
                        <span>cr</span>
                        {/* logo */}
                        <Image
                            className="relative top-[10px]"
                            src={brainPng}
                            style={{ width: "60px", height: "auto" }}
                            alt="abstract brain symbol"
                        />
                        <span>sswit</span>
                    </div>

                    <span className="block text-center font-ubuntu text-lg opacity-60">
                        {"word search & memory trainer"}
                    </span>
                    <Button
                        className="mt-6 w-[120px] py-2"
                        onClick={handlePlayClick}
                    >
                        play
                    </Button>

                    <Button
                        className="mt-3 w-[120px] py-2"
                        onClick={() => router.push("/about")}
                    >
                        about
                    </Button>
                </Fade>
            </section>
        </>
    );
}
