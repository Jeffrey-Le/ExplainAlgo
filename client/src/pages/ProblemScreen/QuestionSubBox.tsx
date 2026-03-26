import Container from "../../components/Container";
import Tag from "../../components/Tag";

import "../../styles/screen.css"
import { ProblemType } from "../../types/types";
interface QuestionSubBoxProps {
    title?: string
    data?: ProblemType
}

function QuestionSubBox({title, data}: QuestionSubBoxProps) {
    // Fetch Data And Display Question Here

    console.log(title);

    return (
        <>
            <Container classes="items-center flex-col bg-green-300 grid rounded-md question p-6">
                <div className="flex justify-center title"> {title} </div>
                <div className="flex justify-center tags">
                    <Tag>  Hello </Tag>
                </div>
                <div className="flex justify-center text-xl"> {data?.question} </div>
                <div className="flex justify-center text-m"> {data?.description} </div>
                {data ? <><div className="flex justify-center example"> {data.example?.input} </div>
                <div className="flex justify-center example"> {data.example?.output} </div> </>: <div></div>}
            </Container>
        </>
    )
}

export default QuestionSubBox;