import Container from './Container';

import "../styles/input.css";

import { CSSProperties, forwardRef, useRef } from 'react';

interface InputBoxProps {
    inputEvent?: React.FormEventHandler<HTMLInputElement>;
    label?: string;
    type?: string;
    autoComplete?: string;
    classes?: string;
    style?: CSSProperties;
}

function InputBox({inputEvent, label, type = "text", classes, style = {maxWidth: '100%'}, autoComplete}: InputBoxProps, ref: React.Ref<HTMLInputElement>) {
    const activeRef = useRef<HTMLInputElement>(null);

    // const handleFocus = () => {
    //     if (ref && ref.current)
    //         ref.current.placeholder = ' ';

    //     if (activeRef.current)
    //         activeRef.current.classList.remove('hidden');

    //     console.log('Input is Focused');
    // };

    // const handleBlur = () => {
    //     if (ref && ref.current)
    //         ref.current.placeholder = label;

    //     if (activeRef.current)
    //         activeRef.current.classList.add('hidden');

    //     console.log('Input is Blurred');
    // };

    return (
        <>
            <Container classes={`inBoxCont`}>
                <input name='myInput' type={type} placeholder=' ' maxLength={256} required className={`inBox ${classes}`} style={style} ref={ref} onInput={inputEvent} autoComplete={autoComplete}/>
                <div className='labelHolder' ref={activeRef}>{label}</div>
            </Container>
        </>
    )
}

export default forwardRef(InputBox);