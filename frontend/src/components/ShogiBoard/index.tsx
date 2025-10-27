export function ShogiBoard() {
    const board = [];
    for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
            row.push(<div key={`${i}-${j}`} className="w-12 h-12 border border-black"></div>);
        }
        board.push(<div key={i} className="flex">{row}</div>);
    }

    return (
        <div className="flex flex-col border-2 border-black w-[434px] h-[434px] bg-amber-600">
            {board}
        </div>
    );
}