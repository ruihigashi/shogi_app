import { BackGround } from "../components/BackGround";
import { BackPageButton } from "../components/Buttons/BackPageButton";
import { StartButton } from "../components/Buttons/StartButton";

export function SettingPage() {
    return (
        <div>
            <BackGround title="モード選択" nextPage={<StartButton />} backPage={<BackPageButton />}/>
        </div>
    )
}