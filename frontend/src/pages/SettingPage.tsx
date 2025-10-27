import { BackGround } from "../components/BackGround";
import { BackPageButton } from "../components/Buttons/BackPageButton";
import { ModeSetting } from "../components/ModeSetting";

export function SettingPage() {
    return (
        <div>
            <BackGround title="モード選択" nextPage={<ModeSetting />} backPage={<BackPageButton />}/>
        </div>
    )
}