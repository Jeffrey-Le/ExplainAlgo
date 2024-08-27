import {ReactNode} from'react';

import Container from './Container';

import "../styles/input.css";

import { forwardRef } from 'react';

interface InputBoxProps {
    inputEvent?: React.FormEventHandler<HTMLInputElement>;
    label?: string;
    type?: string;
}

function InputBox({inputEvent, label, type = "text"}: InputBoxProps, ref: React.Ref<HTMLInputElement>) {
    return (
        <>
        <Container classes='inBoxCont'>
            <input type={type} placeholder='' maxLength={256} required className='inBox' style={{maxWidth: "100%"}} ref={ref} onInput={inputEvent}/>
            <div className='labelHolder'>{label}</div>
        </Container>
        </>
    )
}

export default forwardRef(InputBox);