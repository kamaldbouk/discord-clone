import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import RedirectInfo from "../../shared/components/RedirectInfo";
import { useNavigate } from 'react-router-dom';
import { Tooltip } from "@mui/material";

const getFormNotValidMessage = () => {
    return 'Username should contain between 3-12 characters and password should contain between 6-12 characters. \nValid email address should be provided';
}

const getFormValidMessage = () => {
    return 'Press to register!';
}

const RegisterPageFooter = ({ handleRegister, isFormValid }) => {
    const navigate = useNavigate();
    
    const handlePushToLoginPage = () => {
        navigate('/login'); 
    }
    
    return ( 
        <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage() }
        >
            <div>
                <CustomPrimaryButton 
                    label='Register'
                    additionalStyles={{marginTop: '30px'}}
                    disabled={!isFormValid}
                    onClick={handleRegister}
                />
                <RedirectInfo
                    text='Already have an account?'
                    redirectText=' Log in here'
                    additionalStyles={{marginTop:'5px'}}
                    redirectHandler={handlePushToLoginPage}
                />
            </div>
        </Tooltip>
        
        

     );
}
 
export default RegisterPageFooter;