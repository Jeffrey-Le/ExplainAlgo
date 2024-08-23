import {ReactNode} from'react';

import Container from './Container';

import "../styles/input.css";

interface InputBoxProps {
    label?: string;
}

function InputBox({label}: InputBoxProps) {
    return (
        <>
        <Container classes='inBoxCont'>
            <input type="text" maxLength={256} required className='inBox' style={{maxWidth: "100%"}}/>
            <div className='labelHolder'>{label}</div>
        </Container>
        </>
    )
}

export default InputBox;