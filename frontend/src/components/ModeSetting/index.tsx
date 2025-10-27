import { useState } from "react";
import { StartButton } from "../Buttons/StartButton";

export function ModeSetting() {
    const [handicap, setHandicap] = useState("none");
    const [handicapSide, setHandicapSide] = useState("");
    const [handicapType, setHandicapType] = useState("");
    const [firstPlayer, setFirstPlayer] = useState("");
    const [secondPlayer, setSecondPlayer] = useState("");

    const handicapOptions = ["香落ち", "右香落ち", "角落ち", "飛車落ち", "二枚落ち", "四枚落ち", "六枚落ち", "八枚落ち", "九枚落ち", "十枚落ち", "八枚落ち（トンボ）", "青空将棋"];

    return (
        <div className="border-2 rounded-2xl bg-white px-10 pt-10 pb-10 w-[400px]">
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col">
                    <label>先手</label>
                    <input
                        type="text"
                        className="bg-white border-2 rounded-sm p-1"
                        value={firstPlayer}
                        onChange={(e) => setFirstPlayer(e.target.value)}
                        placeholder="プレイヤー名"
                    />
                </div>

                <div className="flex flex-col">
                    <label>後手</label>
                    <input
                        type="text"
                        className="bg-white border-2 rounded-sm p-1"
                        value={secondPlayer}
                        onChange={(e) => setSecondPlayer(e.target.value)}
                        placeholder="プレイヤー名"
                    />
                </div>

                <div className="flex flex-col">
                    <label>ハンデ</label>
                    <div className="flex space-x-4">
                        <label className="flex items-center space-x-1">
                            <input
                                type="radio"
                                name="handicap"
                                value="あり"
                                checked={handicap === "あり"}
                                onChange={() => setHandicap("あり")}
                            />
                            <span>あり</span>
                        </label>
                        <label className="flex items-center space-x-1">
                            <input
                                type="radio"
                                name="handicap"
                                value="none"
                                checked={handicap === "none"}
                                onChange={() => {
                                    setHandicap("none");
                                    setHandicapSide("");
                                    setHandicapType("");
                                }}
                            />
                            <span>なし</span>
                        </label>
                    </div>
                </div>

                {handicap === "あり" && (
                    <>
                        <div className="flex flex-col">
                            <label>どちらにハンデを設けますか？</label>
                            <div className="flex space-x-4">
                                <label className="flex items-center space-x-1">
                                    <input
                                        type="radio"
                                        name="handicapSide"
                                        value="先手"
                                        checked={handicapSide === "先手"}
                                        onChange={() => {
                                            setHandicapSide("先手");
                                            setHandicapType("");
                                        }}
                                    />
                                    <span>先手</span>
                                </label>
                                <label className="flex items-center space-x-1">
                                    <input
                                        type="radio"
                                        name="handicapSide"
                                        value="後手"
                                        checked={handicapSide === "後手"}
                                        onChange={() => {
                                            setHandicapSide("後手");
                                            setHandicapType("");
                                        }}
                                    />
                                    <span>後手</span>
                                </label>
                            </div>
                        </div>

                        {handicapSide && (
                            <div className="flex flex-col mt-3">
                                <label>
                                    {handicapSide} に与えるハンデを選んでください
                                </label>
                                <select
                                    className="border-2 rounded-md p-1 mt-1"
                                    value={handicapType}
                                    onChange={(e) => setHandicapType(e.target.value)}
                                >
                                    <option value="">選択してください</option>
                                    {handicapOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </>
                )}

                <div className="flex justify-center items-center h-16">
                    {(handicap === "none" || (handicap === "あり" && handicapSide && handicapType)) && firstPlayer && secondPlayer && (
                        <StartButton
                            config={{
                                firstPlayer,
                                secondPlayer,
                                handicap,
                                handicapSide,
                                handicapType,
                            }}
                        />
                    )}
                </div>

            </div>
        </div>
    );
}
