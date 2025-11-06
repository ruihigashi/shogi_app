import { useEffect, useState } from "react";
import { type ShogiBoardProps, type BoardState, type Piece, type Player, type PieceType } from "../../types/shogi";
import { isValidMove } from "./move-validation";

// Helper function to create a piece
const piece = (type: PieceType, player: Player): Piece => ({ type, player });

const initialBoard: BoardState = [
    [piece('香車', 'second'), piece('桂馬', 'second'), piece('銀将', 'second'), piece('金将', 'second'), piece('王将', 'second'), piece('金将', 'second'), piece('銀将', 'second'), piece('桂馬', 'second'), piece('香車', 'second')],
    [null, piece('飛車', 'second'), null, null, null, null, null, piece('角行', 'second'), null],
    [piece('歩兵', 'second'), piece('歩兵', 'second'), piece('歩兵', 'second'), piece('歩兵', 'second'), piece('歩兵', 'second'), piece('歩兵', 'second'), piece('歩兵', 'second'), piece('歩兵', 'second'), piece('歩兵', 'second')],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [piece('歩兵', 'first'), piece('歩兵', 'first'), piece('歩兵', 'first'), piece('歩兵', 'first'), piece('歩兵', 'first'), piece('歩兵', 'first'), piece('歩兵', 'first'), piece('歩兵', 'first'), piece('歩兵', 'first')],
    [null, piece('角行', 'first'), null, null, null, null, null, piece('飛車', 'first'), null],
    [piece('香車', 'first'), piece('桂馬', 'first'), piece('銀将', 'first'), piece('金将', 'first'), piece('玉将', 'first'), piece('金将', 'first'), piece('銀将', 'first'), piece('桂馬', 'first'), piece('香車', 'first')],
];

const applyHandicap = (board: BoardState, handicapType: string, handicapSide: string): BoardState => {
    const newBoard = board.map(row => [...row]);
    const player = handicapSide === "先手" ? "first" : "second";
    const playerRow = player === "first" ? 8 : 0;
    const majorRow = player === "first" ? 7 : 1;


    switch (handicapType) {
        case "香落ち":
            newBoard[playerRow][0] = null;
            break;
        case "右香落ち":
            newBoard[playerRow][8] = null;
            break;
        case "角落ち":
            newBoard[majorRow][player === "first" ? 1 : 7] = null;
            break;
        case "飛車落ち":
            newBoard[majorRow][player === "first" ? 7 : 1] = null;
            break;
        case "飛香落ち":
            newBoard[playerRow][8] = null;
            newBoard[majorRow][player === "first" ? 7 : 1] = null;
            break;
        case "二枚落ち":
            newBoard[majorRow][player === "first" ? 7 : 1] = null;
            newBoard[majorRow][player === "first" ? 1 : 7] = null;
            break;
    }
    return newBoard;
};

export function ShogiBoard(props: ShogiBoardProps) {
    const { config } = props;
    const [board, setBoard] = useState<BoardState>(initialBoard);
    const [selectedPiece, setSelectedPiece] = useState<{ row: number; col: number } | null>(null);
    const [currentPlayer, setCurrentPlayer] = useState<Player>('first');
    const [capturedByFirst, setCapturedByFirst] = useState<Piece[]>([]);
    const [capturedBySecond, setCapturedBySecond] = useState<Piece[]>([]);
    const [possibleMoves, setPossibleMoves] = useState<{ row: number; col: number }[]>([]);

    useEffect(() => {
        if (config.handicap === "あり") {
            const handicappedBoard = applyHandicap(initialBoard, config.handicapType, config.handicapSide);
            setBoard(handicappedBoard);
        }
    }, [config]);

    const handleSquareClick = (row: number, col: number) => {
        if (selectedPiece) {
            const targetPiece = board[row][col];

            if (targetPiece && targetPiece.player === currentPlayer) {
                setSelectedPiece({ row, col });
                const moves = [];
                for (let r = 0; r < 9; r++) {
                    for (let c = 0; c < 9; c++) {
                        if (isValidMove(board, { row, col }, { row: r, col: c })) {
                            moves.push({ row: r, col: c });
                        }
                    }
                }
                setPossibleMoves(moves);
                return;
            }

            if (isValidMove(board, selectedPiece, { row, col })) {
                const newBoard = [...board.map(r => [...r])];
                const selected = newBoard[selectedPiece.row][selectedPiece.col];

                if (selected) {
                    const target = newBoard[row][col];
                    if (target) {
                        const capturedPiece = { ...target, player: currentPlayer };
                        if (currentPlayer === 'first') {
                            setCapturedByFirst([...capturedByFirst, capturedPiece]);
                        } else {
                            setCapturedBySecond([...capturedBySecond, capturedPiece]);
                        }
                    }

                    const pieceToMove = { ...selected };

                    const promotionZone = pieceToMove.player === 'first' ? [0, 1, 2] : [6, 7, 8];
                    const canPromote =
                        (promotionZone.includes(row) || promotionZone.includes(selectedPiece.row)) &&
                        ['歩兵', '香車', '桂馬', '銀将', '角行', '飛車'].includes(pieceToMove.type);

                    if (canPromote) {
                        const promote = window.confirm('成りますか？');
                        if (promote) {
                            switch (pieceToMove.type) {
                                case '歩兵': pieceToMove.type = 'と金'; break;
                                case '香車': pieceToMove.type = '成香'; break;
                                case '桂馬': pieceToMove.type = '成桂'; break;
                                case '銀将': pieceToMove.type = '成銀'; break;
                                case '角行': pieceToMove.type = '竜馬'; break;
                                case '飛車': pieceToMove.type = '竜王'; break;
                            }
                        }
                    }

                    newBoard[row][col] = pieceToMove;
                    newBoard[selectedPiece.row][selectedPiece.col] = null;
                    setBoard(newBoard);
                    setSelectedPiece(null);
                    setPossibleMoves([]);
                    setCurrentPlayer(currentPlayer === 'first' ? 'second' : 'first');
                }
            } else {
                setSelectedPiece(null);
                setPossibleMoves([]);
            }
        } else {
            const piece = board[row][col];
            if (piece && piece.player === currentPlayer) {
                setSelectedPiece({ row, col });
                const moves = [];
                for (let r = 0; r < 9; r++) {
                    for (let c = 0; c < 9; c++) {
                        if (isValidMove(board, { row, col }, { row: r, col: c })) {
                            moves.push({ row: r, col: c });
                        }
                    }
                }
                setPossibleMoves(moves);
            }
        }
    };

    const boardComponent = board.map((row, i) => (
        <div key={i} className="flex">
            {row.map((piece, j) => {
                const isPossibleMove = possibleMoves.some(move => move.row === i && move.col === j);
                return (
                    <div key={`${i}-${j}`} className={`w-20 h-14 border border-black flex justify-center items-center ${selectedPiece && selectedPiece.row === i && selectedPiece.col === j ? 'bg-blue-300' : ''} ${isPossibleMove ? 'bg-green-300' : ''}`} onClick={() => handleSquareClick(i, j)}>
                        {piece ? piece.type : ""}
                    </div>
                );
            })}
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
                {capturedBySecond.map((piece, index) => (
                    <span key={index}>{piece.type}</span>
                ))}
            </div>

            {/* 盤面 */}
            <div className="flex flex-col border-2 border-black w-[500px] h-[504px] bg-amber-500">
                {boardComponent}
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
                {capturedByFirst.map((piece, index) => (
                    <span key={index}>{piece.type}</span>
                ))}
            </div>
        </div>
    );
}