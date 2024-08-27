
interface ButtonProps {
    type?: "button" | "submit" | "reset";
    title?: string,
    clickEvent?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function Button({type = "submit", title = "Button", clickEvent}: ButtonProps) {
    return (
        <>
            <button type={type} className="bg-red-50 m-4" onClick={clickEvent}>
                {title}
            </button>
        </>
    )
}