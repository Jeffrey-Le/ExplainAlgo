import {ReactNode} from "react"

import Container from "./Container";

import "../styles/card.css"

interface CardProps {
    children?: ReactNode;
    classes?: string;
}

export default function Card({children, classes}: CardProps) {
    return (
        <>
            <Container classes={`cardCont rounded-md bg-opacity-80 flex flex-col justify-center items-center ${classes}`}>
                {children}
            </Container>
        </>
    )
}