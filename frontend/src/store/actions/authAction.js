import * as api from '../../api';

export const AuthActions = {
    SET_USER_DETAILS: 'AUTH.SET_USER_DETAILS'
};

export const getActions = (dispatch) => {
    return {
        login: (userDetails, navigate) => dispatch(login(userDetails, navigate)),  // Updated
        register: (userDetails, navigate) => dispatch(register(userDetails, navigate)),  // Updated
    }
};

const setUserDetails = (userDetails) => {
    return {
        type: AuthActions.SET_USER_DETAILS,
        userDetails
    }
}

const login = (userDetails, navigate) => {
    return async (dispatch) => {
        const response = await api.login(userDetails);
        console.log(response);
        if (response.error) {

        }
        else {
            const {userDetails} = response?.data;
            localStorage.setItem('user', JSON.stringify(userDetails))

            dispatch(setUserDetails(userDetails));
            navigate('/dashboard');
        }
    }
}

const register = (userDetails, navigate) => {
    return async (dispatch) => {
        const response = await api.register(userDetails);
        if (response.error) {
            console.error("Registration failed", response.exception);
        }
        else {
            const {userDetails} = response?.data;
            localStorage.setItem('user', JSON.stringify(userDetails))

            dispatch(setUserDetails(userDetails));
            navigate('/dashboard');
        }
    }
}