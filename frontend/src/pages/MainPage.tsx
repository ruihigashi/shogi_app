import { BackGround } from "../components/BackGround";
import { ModeButton } from "../components/Buttons/ModeButton";

export function MainPage() {
    return (
        <div className="min-h-screen items-center flex flex-col justify-center">
            <BackGround
                title="将棋対戦ゲーム"
                nextPage={<ModeButton />}
            />
        </div>
    )
}