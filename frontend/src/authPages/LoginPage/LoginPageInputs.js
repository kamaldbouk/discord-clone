import InputWithLabel from "../../shared/components/InputWithLabel";

const LoginPageInputs = ({ mail, setMail, password, setPassword}) => {
    return ( 
        <div>
            <InputWithLabel 
                value={mail}
                setValue={setMail}
                label='E-mail'
                type='text'
                placeholder='Enter E-mail address...'
            />
            <InputWithLabel 
                value={password}
                setValue={setPassword}
                label='Password'
                type='password'
                placeholder='Enter password...'
            />
        </div>
     );
}
 
export default LoginPageInputs;