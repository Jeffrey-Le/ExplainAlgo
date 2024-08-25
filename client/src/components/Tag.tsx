import Container from "./Container";

interface TagProps {
    children?: React.ReactNode
}

function Tag({children}: TagProps) {
    return (
        <Container classes="h-6 justify-center items-center bg-red-500 rounded-full border-2 border-yellow-200 p-2">
            {children}
        </Container>
    )
}

export default Tag;