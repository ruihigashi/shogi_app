import { useNavigate } from "react-router"
import backpagebutton from "../../../public/assets/images/backpagebutton.png"

export function BackPageButton() {
    const navigate = useNavigate();

    return (
        <div>
            <button
                className="ml-5 my-5 w-20"
                onClick={() => navigate("/")}
            >
                <img src={backpagebutton} alt="前ページ遷移" />
            </button>
        </div>
    )
}