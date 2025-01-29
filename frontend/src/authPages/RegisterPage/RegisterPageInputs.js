import InputWithLabel from "../../shared/components/InputWithLabel";

const RegisterPageInputs = (props) => {
    const { mail, setMail, username, setUsername, password, setPassword } = props

    return <>
        <InputWithLabel 
            value={mail}
            setValue={setMail}
            label='Email address'
            type='text'
            placeholder='Enter Email Address...'
        />

        <InputWithLabel 
            value={username}
            setValue={setUsername}
            label='Username'
            type='text'
            placeholder='Enter Username...'
        />

        <InputWithLabel 
            value={password}
            setValue={setPassword}
            label='Password'
            type='password'
            placeholder='Enter Password...'
        />
    
    </>
}
 
export default RegisterPageInputs;