import { useLocation, useNavigate } from "react-router";
import backpagebutton from "../../../public/assets/images/backpagebutton.png";

export function BackPageButton() {
    const navigate = useNavigate();
    const location = useLocation();

    const backPage = () => {
        if (location.pathname === "/setting") {
            navigate("/");
        } else {
            navigate("/setting");
        }
    };

    return (
        <div>
            <button
                className="ml-5 my-2 w-14"
                onClick={backPage}
            >
                <img src={backpagebutton} alt="前ページ遷移" />
            </button>
        </div>
    )
}