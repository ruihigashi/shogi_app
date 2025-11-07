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
    const [selectedCapturedPiece, setSelectedCapturedPiece] = useState<{ piece: Piece; player: Player } | null>(null);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState<Player | null>(null);

    useEffect(() => {
        if (config.handicap === "あり") {
            const handicappedBoard = applyHandicap(initialBoard, config.handicapType, config.handicapSide);
            setBoard(handicappedBoard);
        }
    }, [config]);

    const handleCapturedPieceClick = (piece: Piece, player: Player) => {
        if (gameOver || player !== currentPlayer) return;

        setSelectedPiece(null);
        setSelectedCapturedPiece({ piece, player });

        const moves = [];
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (board[r][c] === null) {
                    // Check for two pawns in the same file
                    if (piece.type === '歩兵') {
                        let pawnExists = false;
                        for (let i = 0; i < 9; i++) {
                            const p = board[i][c];
                            if (p && p.type === '歩兵' && p.player === currentPlayer) {
                                pawnExists = true;
                                break;
                            }
                        }
                        if (pawnExists) continue;
                    }

                    // Check for unmovable pieces
                    if (piece.type === '歩兵' || piece.type === '香車') {
                        if (player === 'first' && r === 0) continue;
                        if (player === 'second' && r === 8) continue;
                    }
                    if (piece.type === '桂馬') {
                        if (player === 'first' && (r === 0 || r === 1)) continue;
                        if (player === 'second' && (r === 7 || r === 8)) continue;
                    }

                    moves.push({ row: r, col: c });
                }
            }
        }
        setPossibleMoves(moves);
    };

    const handleSquareClick = (row: number, col: number) => {
        if (gameOver) return;

        const pieceOnSquare = board[row][col];

        // If clicking on a piece of the current player, select it or switch selection
        if (pieceOnSquare && pieceOnSquare.player === currentPlayer) {
            setSelectedCapturedPiece(null);
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

        // If a piece on the board is selected, try to move it
        if (selectedPiece) {
            if (isValidMove(board, selectedPiece, { row, col })) {
                const newBoard = [...board.map(r => [...r])];
                const selected = newBoard[selectedPiece.row][selectedPiece.col];

                if (selected) {
                    const target = newBoard[row][col];
                    if (target) {
                        if (target.type === '王将' || target.type === '玉将') {
                            setGameOver(true);
                            setWinner(currentPlayer);
                        } else {
                            const capturedPiece = { ...target, player: currentPlayer };
                            // Un-promote the piece if it is promoted
                            switch (capturedPiece.type) {
                                case 'と金': capturedPiece.type = '歩兵'; break;
                                case '成香': capturedPiece.type = '香車'; break;
                                case '成桂': capturedPiece.type = '桂馬'; break;
                                case '成銀': capturedPiece.type = '銀将'; break;
                                case '竜馬': capturedPiece.type = '角行'; break;
                                case '竜王': capturedPiece.type = '飛車'; break;
                            }

                            if (currentPlayer === 'first') {
                                setCapturedByFirst([...capturedByFirst, capturedPiece]);
                            } else {
                                setCapturedBySecond([...capturedBySecond, capturedPiece]);
                            }
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
        }
        // If a captured piece is selected, try to drop it
        else if (selectedCapturedPiece) {
            const { piece, player } = selectedCapturedPiece;
            if (possibleMoves.some(move => move.row === row && move.col === col)) {
                const newBoard = [...board.map(r => [...r])];
                newBoard[row][col] = { ...piece, player: player };

                if (player === 'first') {
                    const indexToRemove = capturedByFirst.findIndex(p => p.type === piece.type);
                    if (indexToRemove > -1) {
                        const newCaptured = [...capturedByFirst];
                        newCaptured.splice(indexToRemove, 1);
                        setCapturedByFirst(newCaptured);
                    }
                } else {
                    const indexToRemove = capturedBySecond.findIndex(p => p.type === piece.type);
                    if (indexToRemove > -1) {
                        const newCaptured = [...capturedBySecond];
                        newCaptured.splice(indexToRemove, 1);
                        setCapturedBySecond(newCaptured);
                    }
                }

                setBoard(newBoard);
                setSelectedCapturedPiece(null);
                setPossibleMoves([]);
                setCurrentPlayer(currentPlayer === 'first' ? 'second' : 'first');
            } else {
                // If clicking an invalid square, deselect the captured piece
                setSelectedCapturedPiece(null);
                setPossibleMoves([]);
            }
        }
    };

    const boardComponent = board.map((row, i) => (
        <div key={i} className="flex">
            {row.map((piece, j) => {
                const isPossibleMove = possibleMoves.some(move => move.row === i && move.col === j);
                return (
                    <div key={`${i}-${j}`} className={`w-1/9 aspect-square border border-black flex justify-center items-center text-xs md:text-base ${selectedPiece && selectedPiece.row === i && selectedPiece.col === j ? 'bg-blue-300' : ''} ${isPossibleMove ? 'bg-green-300' : ''}`} onClick={() => handleSquareClick(i, j)}>
                        {piece ? piece.type : ""}
                    </div>
                );
            })}
        </div>
    ));

    return (
        <div className="relative flex flex-col items-center my-[-24px]">
            {gameOver && (
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10">
                    <div className="text-4xl font-bold text-white">
                        {winner === 'first' ? `${config.firstPlayer}の勝ち` : `${config.secondPlayer}の勝ち`}
                    </div>
                </div>
            )}
            {/* 後手の持ち駒 */}
            <div className="w-76 my-1">
                <label className="flex justify-center items-center font-semibold text-xl">
                    後手：
                    <span className="font-bold text-2xl">
                        {config.secondPlayer}
                    </span>
                </label>
                <div className="captured-pieces-container flex-col h-full">
                    {Object.entries(
                        capturedBySecond.reduce((acc, piece) => {
                            acc[piece.type] = (acc[piece.type] || 0) + 1;
                            return acc;
                        }, {} as Record<PieceType, number>)
                    ).map(([pieceType, count]) => {
                        const piece = capturedBySecond.find(p => p.type === pieceType as PieceType)!;
                        return (
                            <div key={pieceType} className="captured-piece-group" onClick={() => handleCapturedPieceClick(piece, 'second')}>
                                <div className={`shogi-piece ${selectedCapturedPiece && selectedCapturedPiece.player === 'second' && selectedCapturedPiece.piece.type === pieceType ? 'selected' : ''}`}>
                                    {pieceType}
                                </div>
                                {count > 1 && <span className="piece-count">x{count}</span>}
                            </div>
                        );
                    })}
                </div>

            </div>

            {/* 中央エリア */}
            <div className="flex items-center">
                {/* 盤面 */}
                <div className="flex flex-col border-2 border-black max-w-[90vw] max-h-[95vh] bg-amber-500">
                    {boardComponent}
                </div>
            </div>

            {/* 先手の持ち駒 */}
            <div className="w-76 my-1">
                <div className="captured-pieces-container flex-col h-full">
                    {Object.entries(
                        capturedByFirst.reduce((acc, piece) => {
                            acc[piece.type] = (acc[piece.type] || 0) + 1;
                            return acc;
                        }, {} as Record<PieceType, number>)
                    ).map(([pieceType, count]) => {
                        const piece = capturedByFirst.find(p => p.type === pieceType as PieceType)!;
                        return (
                            <div key={pieceType} className="captured-piece-group" onClick={() => handleCapturedPieceClick(piece, 'first')}>
                                <div className={`shogi-piece ${selectedCapturedPiece && selectedCapturedPiece.player === 'first' && selectedCapturedPiece.piece.type === pieceType ? 'selected' : ''}`}>
                                    {pieceType}
                                </div>
                                {count > 1 && <span className="piece-count">x{count}</span>}
                            </div>
                        );
                    })}
                </div>
            </div>
            <label className="flex justify-center items-center text-red-500 font-semibold text-xl">
                先手：
                <span className="font-bold text-2xl">
                    {config.firstPlayer}
                </span>
            </label>
        </div>
    );
}