import { type ShogiBoardProps } from "../../types/shogi";
import { applyHandicap } from "./Logic/Logic";



export function ShogiBoard(props: ShogiBoardProps) {
    const { config } = props;

    const initialBoard = [
        ["香", "桂", "銀", "金", "王", "金", "銀", "桂", "香"],
        ["", "飛", "", "", "", "", "", "角", ""],
        ["歩", "歩", "歩", "歩", "歩", "歩", "歩", "歩", "歩"],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["歩", "歩", "歩", "歩", "歩", "歩", "歩", "歩", "歩"],
        ["", "角", "", "", "", "", "", "飛", ""],
        ["香", "桂", "銀", "金", "玉", "金", "銀", "桂", "香"],
    ];

    const boardState = config.handicap === "あり" ? applyHandicap(initialBoard, config.handicapType, config.handicapSide) : initialBoard;

    const board = boardState.map((row, i) => (
        <div key={i} className="flex">
            {row.map((piece, j) => (
                <div key={`${i}-${j}`} className="w-12 h-12 border border-black flex justify-center items-center">
                    {piece}
                </div>
            ))}
        </div>
    ));

    return (
        <div>
            {/* プレイヤー名表示 */}
            <label className="flex justify-end items-center font-semibold text-xl">
                後手：
                <span className="font-bold text-2xl">
                    {config.secondPlayer}
                </span>
            </label>

            {/* 持ち駒 */}
            <div>

            </div>

            {/* 盤面 */}
            <div className="flex flex-col border-2 border-black w-[434px] h-[434px] bg-amber-500">
                {board}
            </div>

            {/* プレイヤー名表示 */}
            <label className="flex justify-start items-center text-red-500 font-semibold text-xl">
                先手：
                <span className="font-bold text-2xl">
                    {config.firstPlayer}
                </span>
            </label>

            {/* 持ち駒 */}
            <div className="w-full h-10 bg-amber-700">

            </div>
        </div>
    );
}