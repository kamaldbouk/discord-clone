import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import RedirectInfo from "../../shared/components/RedirectInfo";
import { useNavigate } from 'react-router-dom';

const LoginPageFooter = ({ handleLogin, isFormValid }) => {
    const navigate = useNavigate();
    
    const handlePushToRegisterPage = () => {
        navigate('/register'); 
    }
    
    return ( 
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
        
        

     );
}
 
export default LoginPageFooter;