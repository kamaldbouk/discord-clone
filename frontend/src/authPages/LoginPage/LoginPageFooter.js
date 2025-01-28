import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import RedirectInfo from "../../shared/components/RedirectInfo";
import { useNavigate } from 'react-router-dom';
import { Tooltip } from "@mui/material";

const getFormNotValidMessage = () => {
    return 'Enter correct email and password should contain between 6-12 characters';
}

const getFormValidMessage = () => {
    return 'Press to log in!';
}

const LoginPageFooter = ({ handleLogin, isFormValid }) => {
    const navigate = useNavigate();
    
    const handlePushToRegisterPage = () => {
        navigate('/register'); 
    }
    
    return ( 
        <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage() }
        >
            <div>
                <CustomPrimaryButton 
                    label='Log in'
                    additionalStyles={{marginTop: '30px'}}
                    disabled={!isFormValid}
                    onClick={handleLogin}
                />
                <RedirectInfo
                    text='Need an account?'
                    redirectText=' Create an Account'
                    additionalStyles={{marginTop:'5px'}}
                    redirectHandler={handlePushToRegisterPage}
                />
            </div>
        </Tooltip>
        
        

     );
}
 
export default LoginPageFooter;