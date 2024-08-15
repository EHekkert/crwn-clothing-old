import { useState } from 'react';

import FormInput from '../FormInput';
import Button, { BUTTON_TYPE_CLASSES } from '../Button';

import {
        signInWithGooglePopup,
        signInWithMicrosoftPopup,
        signInAuthUserWithEmailAndPassword
    } from '../../utils/Firebase';

import { SignInContainer, ButtonsContainer } from './styles'; 

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

    const signInWithGoogle = async () => {
        try
        {
            await signInWithGooglePopup();
        } catch (error) {
            switch(error.code)
            {                
                case 'auth/cancelled-popup-request':
                case 'auth/popup-closed-by-user':
                    break;
                default:
                    console.log(error);
            }
        }
    };

    const signInWithMicrosoft = async () => {
        try
        {
            await signInWithMicrosoftPopup();
        } catch (error) {
            switch(error.code)
            {                
                case 'auth/cancelled-popup-request':
                case 'auth/popup-closed-by-user':
                    break;
                default:
                    console.log(error);
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
         try{
            await signInAuthUserWithEmailAndPassword(email, password);

            resetFormFields();
         } catch (error) {
            switch(error.code)
            {
                case 'auth/user-not-found':
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

    return (
        <SignInContainer>
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
                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>                
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
                        Google Sign In
                    </Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.tauw} onClick={signInWithMicrosoft}>
                        TAUW Sign In
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
};

export default SignInForm;