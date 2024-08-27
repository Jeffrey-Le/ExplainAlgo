import React from 'react';

import Button from './Button';

import Card from './Card';

interface FormProps {
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    children?: React.ReactNode;
    classes?: string;
    submitButtonText?: string;
}

function Form({ onSubmit, onClick, children, classes, submitButtonText}: FormProps) {
    return (
        <form onSubmit={onSubmit}>
            <Card classes={`flex flex-col gap-10 ${classes}`}>
                {children}
                <Button type='submit' title={submitButtonText} clickEvent={onClick}/>
            </Card>
        </form>
    );
};

export default Form;