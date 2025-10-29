import { useLocation } from "react-router-dom";
import { BackGround } from "../components/BackGround";
import { BackPageButton } from "../components/Buttons/BackPageButton";
import { ShogiBoard } from "../components/ShogiBoard";

export function ShogiBattlePage() {
    const location = useLocation();
    const config = location.state;

    return (
        <div>
            <BackGround
                title="いざ尋常に勝負"
                backPage={<BackPageButton />}
                shogiBoard={<ShogiBoard config={config} />}
            />
        </div>
    )
}