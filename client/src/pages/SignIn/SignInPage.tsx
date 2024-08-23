import { ReactNode, useEffect } from "react";
import Container from "../../components/Container";
import SignInForm from "../../components/SignInForm";

import { useSignInPage } from "./SignInPage.hooks";

function SignInPage() {
    useSignInPage();

    return (
        <>
        <Container classes="justify-center items-center">
            <SignInForm classes="bg-green-200" />
        </Container>
        </>
    )
}

export default SignInPage;