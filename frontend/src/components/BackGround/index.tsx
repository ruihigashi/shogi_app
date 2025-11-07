import type { PageType } from "../../types/shogi"

export function BackGround(props: PageType) {
    const { title, nextPage, backPage, shogiBoard } = props;
    return (
        <div>
            <div className="fixed inset-0 z-[-1] bg-[url('../../public/assets/images/background.jpg')] bg-cover bg-center opacity-70" />
            {backPage}
            <div className="flex flex-col justify-center items-center min-h-screen">
                <h1 className="font-bold text-5xl mb-10">{title}</h1>
                {nextPage}
                {shogiBoard}
            </div>
        </div>
    )
}