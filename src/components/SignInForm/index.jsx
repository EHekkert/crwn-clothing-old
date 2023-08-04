import { useState } from 'react';
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import {
        auth,
        signInWithGoogleRedirect,
        signInWithMicrosoftRedirect,     
        createUserDocumentFromAuth,
        signInAuthUserWithEmailAndPassword
    } from '../../utils/Firebase';

import FormInput from '../FormInput';
import Button from '../Button';

import './index.scss';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
         try{
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);

            resetFormFields();
         } catch (error) {
            switch(error.code)
            {
                case 'auth/wrong-password':
                case 'auth/wrong-password':
                    alert('E-mail unknown or password is incorrect.')
                    break;
                default:
                    console.log(error);
            }            
         }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    };

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
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='E-Mail'
                    inputOptions = {{
                        type: 'email',
                        required: true,
                        onChange: handleChange,
                        name: 'email',
                        value: email
                    }}
                />
                <FormInput
                    label='Password'
                    inputOptions = {{
                        type: 'password',
                        required: true,
                        onChange: handleChange,
                        name: 'password',
                        value: password
                    }}
                />
                <div className='buttons-container'>
                <Button type='submit'>Sign In</Button>                
                <Button type='button' buttonType='google' onClick={signInWithGoogleRedirect}>
                    Google Sign In
                </Button>
                <Button type='button' buttonType='microsoft' onClick={signInWithMicrosoftRedirect}>
                    TAUW Sign In
                </Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;