import { useEffect, useState } from "react";

import Container from "../../components/Container"

import "../../styles/screen.css"
import { useDisplaySubBox } from "./ProblemScreenPage.hooks";

interface ContentType {
    output?: string | null
    solution?: string | null
}

function DisplaySubBox() {
    const [clicked, setValue] = useState<keyof ContentType | null>(null);

    const {solution, isLoading, isError, error, refetch, isFetching} = useDisplaySubBox();

    const content: ContentType = {
    output: null,
    solution: solution?.[0]?.solution ?? null,
  };

    useEffect(() => {
        console.log(clicked);
    }, [clicked]);


    if (isLoading)
        return <div> Loading... </div>;

    if (isError)
        return <div> {error?.message} </div>;


    const handleClick = ((val: keyof ContentType) => {
        if (val == 'solution' && content[val] == null) refetch();
        setValue(val);
    })

    const value = clicked ? content[clicked] : null;
    // {clicked && content && content[clicked] && !isLoading ? <div> {content[clicked]} </div> : <div> Display answer here </div>}

    return (
        <>
            <Container classes="grid justify-center items-center bg-blue-500 rounded-md display">
                <ul className="flex w-full max-w-md mx-auto justify-center">
                    <li onClick={() => handleClick('output')} className={`rounded-md overflow-hidden ${clicked === "output" ? "active" : ""}`}>
                        Output
                    </li>
                    <li onClick={() => handleClick('solution')} className={`rounded-md overflow-hidden ${clicked === "solution" ? "active" : ""}`}>
                        Solution
                    </li>
                </ul>
                {clicked === 'solution' && isFetching && <div>Loading...</div>}
                {value && !isFetching ? <div className="p-6">{value}</div> : <div> "Display Solution Here "</div>}
            </Container>
        </>
    )
}

export default DisplaySubBox