import { BackGround } from "../components/BackGround";
import { ModeButton } from "../components/Buttons/ModeButton";

export function MainPage() {
    return (
        <div>
            <BackGround title="将棋対戦ゲーム" button={<ModeButton />} />
        </div>
    )
}