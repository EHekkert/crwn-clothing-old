import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { googleSignInStart, tauwSignInStart, eMailSignInStart } from '../../store/user/userAction';

import FormInput from '../FormInput';
import Button, { BUTTON_TYPE_CLASSES } from '../Button';

import { SignInContainer, ButtonsContainer } from './styles'; 

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    };

    const signInWithMicrosoft = async () => {
        dispatch(tauwSignInStart());
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
         try{
            dispatch(eMailSignInStart(email, password));
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