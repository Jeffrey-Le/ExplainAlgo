import {ReactNode} from'react';

import Cont from './Container';

import "../styles/input.css";

interface InputBoxProps {
    label?: string;
}

function InputBox({label}: InputBoxProps) {
    return (
        <>
        <Cont classes='inBoxCont'>
            <input type="text" maxLength={256} required className='inBox' style={{maxWidth: "100%"}}/>
            <div className='labelHolder'>{label}</div>
        </Cont>
        </>
    )
}

export default InputBox;