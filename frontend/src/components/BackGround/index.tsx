export function BackGround(props: { title: string, button?: React.ReactNode }) {
    const { title, button } = props; 
    return (
        <div className="bg-[url('../../public/assets/images/background.jpg')] min-h-screen bg-cover bg-center object-cover opacity-70">
            <div className="flex flex-col justify-center items-center h-screen">
                <h1 className="font-bold text-5xl mb-10">{title}</h1>
                {button}
            </div>
        </div>
    )
}