import { useNavigate } from "react-router"

export function ModeButton() {
    const navigate = useNavigate();
    return (
        <div>
            <button
                onClick={() => navigate('/setting')}
                className="bg-amber-700 hover:bg-amber-900 text-white font-bold px-8 py-3 md:px-16 md:py-6 rounded-2xl text-lg md:text-xl"
            >
                対人戦
            </button>
        </div>
    )
}