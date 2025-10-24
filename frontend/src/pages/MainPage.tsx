import { ModeButton } from "../components/Button/Buttons/ModeButton";

export function MainPage() {
    return (
        <div className="bg-[url('../../public/assets/images/background.jpg')] min-h-screen bg-cover bg-center object-cover opacity-70">
            <div className="flex flex-col justify-center items-center h-[100vh]">
                <h1 className="font-bold text-5xl mb-10">将棋対戦ゲーム</h1>
                <ModeButton />
            </div>
        </div>
    )
}