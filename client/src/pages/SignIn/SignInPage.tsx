import { ReactNode, useEffect } from "react";
import Cont from "../../components/Container";
import SignInForm from "../../components/SignInForm";

import { useSignInPage } from "./SignInPage.hooks";

function SignInPage() {
    useSignInPage();

    return (
        <>
        <Cont classes="justify-center items-center">
            <SignInForm classes="bg-green-200" />
        </Cont>
        </>
    )
}

export default SignInPage;