import { useNavigate } from "react-router";

export function StartButton() {
    const navigate = useNavigate();

    return (
        <div>
            <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-16 py-6 font-bold rounded-2xl"
            onClick={() => navigate("/battle")}
            >
                対戦スタート
            </button>
        </div>
    )
}