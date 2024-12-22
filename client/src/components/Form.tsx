import React from 'react';

import Button from './Button';

import Card from './Card';

import Container from './Container';

import '../styles/card.css'

interface FormProps {
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    children?: React.ReactNode;
    classes?: string;
    submitButtonText?: string;
    type?: string;
}

function Form({ onSubmit, onClick, children, classes, submitButtonText, type = "card"}: FormProps) {
    return (
        <form onSubmit={onSubmit}>
            {
                type === 'card' ?
                <Card classes={`flex flex-col gap-10 ${classes}`}>
                    {children}
                    <Button type='submit' title={submitButtonText} clickEvent={onClick}/>
                </Card> :
                <Container classes={`flex flex-col gap-10 ${classes}`}>
                    {children}
                    <Button type='submit' title={submitButtonText} clickEvent={onClick}/>
                </Container>
            }
        </form>
    );
}

export default Form;