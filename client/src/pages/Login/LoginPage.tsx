import { ReactNode, useEffect } from "react";
import Container from "../../components/Container";
import LoginForm from "./LoginForm";

import { useLoginPage } from "./LoginPage.hooks";

function LoginPage() {
    useLoginPage();

    return (
        <>
        <Container classes="justify-center items-center">
            <LoginForm classes="bg-green-200" />
        </Container>
        </>
    )
}

export default LoginPage;