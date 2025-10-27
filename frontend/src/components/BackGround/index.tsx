import type { PageType } from "../../types/Props/props"

export function BackGround(props: PageType) {
    const { title, nextPage, backPage, shogiBoard } = props;
    return (
        <div className="bg-[url('../../public/assets/images/background.jpg')] min-h-screen bg-cover bg-center object-cover opacity-70">
            {backPage}
            <div className="flex flex-col justify-center items-center h-screen">
                <h1 className="font-bold text-5xl mb-10">{title}</h1>
                {nextPage}
                {shogiBoard}
            </div>
        </div>
    )
}