import { FormInputLabel, Input, Group } from './styles';

const FormInput = ({ label, inputOptions }) => {
    return (
        <Group>        
            <Input {...inputOptions} />            
            {label &&  (
                <FormInputLabel shrink={inputOptions.value.length}>
                    {label}
                </FormInputLabel>
            )}          
        </Group>
    )
};

export default FormInput;