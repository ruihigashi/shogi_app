import { BackGround } from "../components/BackGround";
import { BackPageButton } from "../components/Buttons/BackPageButton";

export function ShogiBattlePage() {
    return (
        <div>
            <BackGround title="いざ尋常に勝負" backPage={<BackPageButton />}/>
        </div>
    )
}