import { ReactNode, useEffect } from "react";
import Container from "../../components/Container";
import RegisterForm from "./RegisterForm";

import { useRegisterPage } from "./RegisterPage.hooks";

function RegisterPage() {
    useRegisterPage();

    return (
        <>
        <Container classes="justify-center items-center">
            <RegisterForm classes="bg-green-200" />
        </Container>
        </>
    )
}

export default RegisterPage;