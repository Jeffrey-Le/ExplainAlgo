import {ReactNode} from "react"

import Cont from "./Container";

import "../styles/card.css"

interface CardProps {
    children?: ReactNode;
    classes?: string;
}

export default function Card({children, classes}: CardProps) {
    return (
        <>
            <Cont classes={`cardCont rounded-md bg-opacity-80 flex flex-col justify-center items-center ${classes}`}>
                {children}
            </Cont>
        </>
    )
}