import { useProblemScreenPage } from "./ProblemScreenPage.hooks";

import Container from "../../components/Container";

import { useParams } from "react-router-dom";
import QuestionSubBox from "./QuestionSubBox";
import AnswerSubBox from "./AnswerSubBox";
import DisplaySubBox from "./DisplaySubBox";

import "../../styles/screen.css"

function ProblemScreenPage() {
    const {question_title} = useParams();
    //const {newProblems, isLoading, isError, error} = useProblemScreenPage();

    // if (isLoading)
    //     return <div> Loading... </div>;

    // if (isError)
    //     return <div> {error?.message} </div>;

    /*
        <Container classes="justify-center items-center flex-col">
                <AnswerSubBox />
                <DisplaySubBox />
            </Container>
    */

    return (
        <>
        <Container classes="grid screen gap-2">
            <QuestionSubBox title={question_title} />
            <AnswerSubBox />
            <DisplaySubBox />
        </Container>
        </>
    )
}

export default ProblemScreenPage;