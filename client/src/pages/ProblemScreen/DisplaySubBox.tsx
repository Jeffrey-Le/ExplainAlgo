import { useEffect, useState } from "react";

import Container from "../../components/Container"

import "../../styles/screen.css"
import { useDisplaySubBox } from "./ProblemScreenPage.hooks";
import { useProblemsListPage } from "../ProblemsList/ProblemsListPage.hooks";

interface ContentType {
    output?: string | null
    solution?: string | null
}

function DisplaySubBox() {
    const [content, setContent] = useState<ContentType | null>({'output': null, "solution": null});
    const [clicked, setValue] = useState<keyof ContentType | null>(null);

    const {solution, isLoading, isError, error} = useDisplaySubBox();

    useEffect(() => {
        console.log(clicked);
    }, [clicked]);

    useEffect(() => {
        if (solution)
            setContent((prev) => {
            console.log(solution)
            const newData = prev;

            if (newData)
                newData['solution'] = solution[0]['solution'];

            return newData;
        });
    }, [solution]);

    if (isLoading)
        return <div> Loading... </div>;

    if (isError)
        return <div> {error?.message} </div>;



    const handleClick = ((val: keyof ContentType) => {
        setValue(val);

    })

    return (
        <>
            <Container classes="grid justify-center items-center bg-blue-500 rounded-md display">
                <ul className="grid" style={{gridTemplateColumns: "50% 50%"}}>
                    <li onClick={() => handleClick('output')} className={`rounded-md overflow-hidden ${clicked === "output" ? "active" : ""}`}>
                        Output
                    </li>
                    <li onClick={() => handleClick('solution')} className={`rounded-md overflow-hidden ${clicked === "solution" ? "active" : ""}`}>
                        Solution
                    </li>
                </ul>
                {clicked && content && content[clicked] ? <div> {content[clicked]} </div> : <div> Display answer here </div>}
            </Container>
        </>
    )
}

export default DisplaySubBox