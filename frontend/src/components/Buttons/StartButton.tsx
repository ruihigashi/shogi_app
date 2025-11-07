import { useNavigate } from "react-router";


    type StartButtonProps = {
        config: {
            firstPlayer: string;
            secondPlayer: string;
            handicap: string;
            handicapSide: string;
            handicapType: string;
        };
    };

export function StartButton(props: StartButtonProps) {
    const { config } = props
    const navigate = useNavigate();

    return (
        <div>
            <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 md:px-16 md:py-6 font-bold rounded-2xl text-lg md:text-xl"
                onClick={() => navigate("/battle", { state: config })}
            >
                対局スタート
            </button>
        </div>
    )
}