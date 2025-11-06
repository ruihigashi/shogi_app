import { type BoardState, type Player } from '../../types/shogi';

// 移動経路上に他の駒がないかを確認する
const isPathClear = (board: BoardState, from: { row: number; col: number }, to: { row: number; col: number }): boolean => {
    const rowDiff = Math.sign(to.row - from.row);
    const colDiff = Math.sign(to.col - from.col);
    let { row, col } = from;

    while (row !== to.row || col !== to.col) {
        row += rowDiff;
        col += colDiff;

        if (row === to.row && col === to.col) {
            break;
        }

        if (board[row][col]) {
            return false;
        }
    }

    return true;
};

// 歩兵の動き
const isValidPawnMove = (from: { row: number; col: number }, to: { row: number; col: number }, player: Player): boolean => {
    const direction = player === 'first' ? -1 : 1;
    return to.row - from.row === direction && to.col === from.col;
};

// 香車の動き
const isValidLanceMove = (board: BoardState, from: { row: number; col: number }, to: { row: number; col: number }, player: Player): boolean => {
    const direction = player === 'first' ? -1 : 1;
    return to.col === from.col && (to.row - from.row) * direction > 0 && isPathClear(board, from, to);
};

// 桂馬の動き
const isValidKnightMove = (from: { row: number; col: number }, to: { row: number; col: number }, player: Player): boolean => {
    const direction = player === 'first' ? -2 : 2;
    return Math.abs(to.col - from.col) === 1 && to.row - from.row === direction;
};

// 銀将の動き
const isValidSilverMove = (from: { row: number; col: number }, to: { row: number; col: number }, player: Player): boolean => {
    const direction = player === 'first' ? -1 : 1;
    const rowDiff = to.row - from.row;
    const colDiff = Math.abs(to.col - from.col);

    return (rowDiff === direction && colDiff <= 1) || (rowDiff === -direction && colDiff === 1);
};

// 金将の動き
const isValidGoldMove = (from: { row: number; col: number }, to: { row: number; col: number }, player: Player): boolean => {
    const direction = player === 'first' ? -1 : 1;
    const rowDiff = to.row - from.row;
    const colDiff = Math.abs(to.col - from.col);

    return (rowDiff === direction && colDiff <= 1) || (rowDiff === 0 && colDiff === 1) || (rowDiff === -direction && colDiff === 0);
};

// 角行の動き
const isValidBishopMove = (board: BoardState, from: { row: number; col: number }, to: { row: number; col: number }): boolean => {
    return Math.abs(to.row - from.row) === Math.abs(to.col - from.col) && isPathClear(board, from, to);
};

// 飛車の動き
const isValidRookMove = (board: BoardState, from: { row: number; col: number }, to: { row: number; col: number }): boolean => {
    return (to.row === from.row || to.col === from.col) && isPathClear(board, from, to);
};

// 王将・玉将の動き
const isValidKingMove = (from: { row: number; col: number }, to: { row: number; col: number }): boolean => {
    return Math.abs(to.row - from.row) <= 1 && Math.abs(to.col - from.col) <= 1;
};

// メインの駒の動きのバリデーション
export const isValidMove = (board: BoardState, from: { row: number; col: number }, to: { row: number; col: number }): boolean => {
    const piece = board[from.row][from.col];
    const destination = board[to.row][to.col];

    if (!piece) {
        return false;
    }

    // 自分の駒がある場所には移動できない
    if (destination && destination.player === piece.player) {
        return false;
    }

    switch (piece.type) {
        case '歩兵':
            return isValidPawnMove(from, to, piece.player);
        case '香車':
            return isValidLanceMove(board, from, to, piece.player);
        case '桂馬':
            return isValidKnightMove(from, to, piece.player);
        case '銀将':
            return isValidSilverMove(from, to, piece.player);
        case '金将':
        case 'と金':
        case '成香':
        case '成桂':
        case '成銀':
            return isValidGoldMove(from, to, piece.player);
        case '角行':
            return isValidBishopMove(board, from, to);
        case '飛車':
            return isValidRookMove(board, from, to);
        case '王将':
        case '玉将':
            return isValidKingMove(from, to);
        case '竜馬':
            return (isValidBishopMove(board, from, to) || isValidKingMove(from, to));
        case '竜王':
            return (isValidRookMove(board, from, to) || isValidKingMove(from, to));
        default:
            return false;
    }
};