import type { PageType } from "../../types/shogi"

export function BackGround(props: PageType & { titleClassName?: string }) {
    const { title, nextPage, backPage, shogiBoard, titleClassName } = props;
    return (
        <div>
            <div className="fixed inset-0 z-[-1] bg-[url('../../public/assets/images/background.jpg')] bg-cover bg-center opacity-70" />
            {backPage}
            <div className="flex flex-col justify-center items-center">
                <h1 className={`font-bold text-2xl mb-5 ${titleClassName}`}>{title}</h1>
                {nextPage}
                {shogiBoard}
            </div>
        </div>
    )
}