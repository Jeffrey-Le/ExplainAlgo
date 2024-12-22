import { CSSProperties, ReactNode } from "react";

import Container from "./Container";

import '../styles/box.css'

interface BoxProps {
    type?: string;
    classes?: string;
    children?: ReactNode;
    style?: CSSProperties;
}

function Box({type = 'default', classes, children, style}: BoxProps) {
    return (
        <Container style={style} classes={`bg-gray-300 bg-opacity-60 ${classes}`}>
            {type === 'text' ? <div className="box" contentEditable="true"> {children} </div> : <div className="box"> {children} </div>}
        </Container>
    )
}

export default Box;