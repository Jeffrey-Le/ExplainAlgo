import { useEffect, useRef, useState } from "react";
import Container from "../../components/Container";

import "../../styles/screen.css"

function AnswerSubBox() {
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    const [val, setVal] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setVal(e.target.value);
    }

    useEffect(() => {
        console.log(val);
        if (textAreaRef.current)
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }, [val]);

    return (
        <>
            <textarea className="flex justify-center items-center bg-red-100 rounded-md overflow-y-scroll answer"
            placeholder="Type Response Here" value={val} onChange={handleChange} ref={textAreaRef}></textarea>
        </>
    )
}

export default AnswerSubBox;