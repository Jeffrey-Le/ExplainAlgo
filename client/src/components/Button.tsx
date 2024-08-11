

export default function Button({title = "Button"}) {
    return (
        <>
            <button className="bg-red-50 m-4">
                {title}
            </button>
        </>
    )
}