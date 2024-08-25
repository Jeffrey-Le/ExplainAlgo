import Container from "../../components/Container";
import Tag from "../../components/Tag";

import "../../styles/screen.css"

interface QuestionSubBoxProps {
    title?: string
}

function QuestionSubBox({title}: QuestionSubBoxProps) {
    // Fetch Data And Display Question Here

    console.log(title);

    return (
        <>
            <Container classes="items-center flex-col bg-green-300 grid rounded-md question">
                <div className="flex justify-center title"> {title} </div>
                <div className="flex justify-center tags">
                    <Tag>  Hello </Tag>
                </div>
                <div className="flex justify-center text-xl"> Question Content or Question would go here </div>
                <div className="flex justify-center example"> Example here </div>
            </Container>
        </>
    )
}

export default QuestionSubBox;