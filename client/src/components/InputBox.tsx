import {ReactNode} from'react';

import Container from './Container';

import "../styles/input.css";

import { forwardRef } from 'react';

interface InputBoxProps {
    label?: string;
}

function InputBox({label}: InputBoxProps, ref: React.Ref<HTMLInputElement>) {
    return (
        <>
        <Container classes='inBoxCont'>
            <input type="text" maxLength={256} required className='inBox' style={{maxWidth: "100%"}} ref={ref}/>
            <div className='labelHolder'>{label}</div>
        </Container>
        </>
    )
}

export default forwardRef(InputBox);