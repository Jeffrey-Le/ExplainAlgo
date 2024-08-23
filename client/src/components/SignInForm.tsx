import {ReactNode} from 'react';

import Container from "./Container"
import Card from "./Card"
import InputBox from "./InputBox"
import Button from "./Button"

interface SignInFormProps {
    classes?: string;
}

export default function SignInForm({classes}: SignInFormProps) {
    const validation = () => {
        // Validation
        // Sensd a message to Flask Backend
    };

    const handleSubmit = () => {
        // Handle Submition
        // Sends a Message to Flask Backend
    };

    return (
        <>
        <Card classes={`flex flex-col gap-10 ${classes}`}>
            <label style={{fontSize: "5vh"}}>Login</label>
            <InputBox label="Name"/>
            <InputBox label="Password"/>
            <Button title="Login"/>
        </Card>
        </>
    )
}