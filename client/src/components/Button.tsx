
interface ButtonProps {
    title?: string,
    clickEvent?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function Button({title = "Button", clickEvent}: ButtonProps) {
    return (
        <>
            <button className="bg-red-50 m-4" onClick={clickEvent}>
                {title}
            </button>
        </>
    )
}