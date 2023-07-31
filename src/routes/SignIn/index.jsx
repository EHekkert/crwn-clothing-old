import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import {
        auth,
        signInWithGoogleRedirect,
        signInWithMicrosoftRedirect,     
        createUserDocumentFromAuth
    } from '../../utils/Firebase';

import SignUpForm from '../../components/SignUpForm'; 
import Button from '../../components/Button';

const SignIn = () => {
    useEffect(() => {
            const redirectResult = async () => {
                const response = await getRedirectResult(auth);
                if (response)
                {
                    console.log(response);
                    const userDocRef = await createUserDocumentFromAuth(response.user);
                }
            }
            redirectResult().catch(console.error);
    }, []);

    return (
        <div>
            <h1>Sign In Page</h1>
            <Button buttonType='google' onClick={signInWithGoogleRedirect}>
                Sign in with Google redirect
            </Button>
            <Button buttonType='microsoft' onClick={signInWithMicrosoftRedirect}>
                Sign in with TAUW Redirect
            </Button>
            <SignUpForm />
        </div>
    )
}

export default SignIn;