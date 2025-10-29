export const applyHandicap = (board: string[][], handicapType: string, handicapSide: string) => {
    const newBoard = board.map(row => [...row]);
    const playerRow = handicapSide === "先手" ? 0 : 8;
    const majorRow = handicapSide === "先手" ? 1 : 7;

    switch (handicapType) {
        case "香落ち":
            newBoard[playerRow][0] = "";
            break;
        case "右香落ち":
            newBoard[playerRow][8] = "";
            break;
        case "角落ち":
            newBoard[majorRow][handicapSide === "先手" ? 7 : 1] = "";
            break;
        case "飛車落ち":
            newBoard[majorRow][handicapSide === "先手" ? 1 : 7] = "";
            break;
        case "飛香落ち":
            newBoard[playerRow][8] = "";
            newBoard[majorRow][handicapSide === "先手" ? 1 : 7] = "";
            break;
        case "二枚落ち":
            newBoard[majorRow][handicapSide === "先手" ? 1 : 7] = "";
            newBoard[majorRow][handicapSide === "先手" ? 7 : 1] = "";
            break;
        case "四枚落ち":
            newBoard[playerRow][0] = "";
            newBoard[playerRow][8] = "";
            newBoard[majorRow][handicapSide === "先手" ? 1 : 7] = "";
            newBoard[majorRow][handicapSide === "先手" ? 7 : 1] = "";
            break;
        case "六枚落ち":
            newBoard[playerRow][0] = "";
            newBoard[playerRow][1] = "";
            newBoard[playerRow][7] = "";
            newBoard[playerRow][8] = "";
            newBoard[majorRow][handicapSide === "先手" ? 1 : 7] = "";
            newBoard[majorRow][handicapSide === "先手" ? 7 : 1] = "";
            break;
        case "八枚落ち":
            newBoard[playerRow][0] = "";
            newBoard[playerRow][1] = "";
            newBoard[playerRow][2] = "";
            newBoard[playerRow][6] = "";
            newBoard[playerRow][7] = "";
            newBoard[playerRow][8] = "";
            newBoard[majorRow][handicapSide === "先手" ? 1 : 7] = "";
            newBoard[majorRow][handicapSide === "先手" ? 7 : 1] = "";
            break;
        case "十枚落ち":
            newBoard[playerRow] = ["", "", "", "", "王", "", "", "", ""];
            newBoard[majorRow] = ["", "", "", "", "", "", "", "", ""];
            break;
        case "九枚落ち":
            newBoard[playerRow][0] = "";
            newBoard[playerRow][1] = "";
            newBoard[playerRow][2] = "";
            newBoard[playerRow][3] = "";
            newBoard[playerRow][6] = "";
            newBoard[playerRow][7] = "";
            newBoard[playerRow][8] = "";
            newBoard[majorRow][handicapSide === "先手" ? 1 : 7] = "";
            newBoard[majorRow][handicapSide === "先手" ? 7 : 1] = "";
            break;
        case "八枚落ち（トンボ）":
            newBoard[playerRow][0] = "";
            newBoard[playerRow][1] = "";
            newBoard[playerRow][2] = "";
            newBoard[playerRow][3] = "";
            newBoard[playerRow][5] = "";
            newBoard[playerRow][6] = "";
            newBoard[playerRow][7] = "";
            newBoard[playerRow][8] = "";
            break;
        case "青空将棋":
            return [
                ["香車", "桂馬", "銀", "金", "王", "金", "銀", "桂馬", "香車"],
                ["", "飛車", "", "", "", "", "", "角", ""],
                ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""],
                ["", "角", "", "", "", "", "", "飛車", ""],
                ["香車", "桂馬", "銀", "金", "玉", "金", "銀", "桂馬", "香車"],
            ];
        default:
            break;
    }
    return newBoard;
};