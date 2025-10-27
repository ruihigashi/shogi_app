import { BackGround } from "../components/BackGround";
import { StartButton } from "../components/Buttons/StartButton";

export function SettingPage() {
    return (
        <div>
            <BackGround title="モード選択" button={<StartButton />} />
        </div>
    )
}