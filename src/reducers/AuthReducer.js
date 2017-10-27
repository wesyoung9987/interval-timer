import {
    PASSWORD_CHANGE,
    EMAIL_CHANGE,
    LOGIN_USER,
    AUTH_USER_SUCCESS,
    AUTH_USER_FAIL,
    SIGNUP_USER
} from '../actions/types';

const INITIAL_STATE = {
    password: '',
    email: '',
    user: null,
    errorMessage: '',
    showSpinner: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PASSWORD_CHANGE:
            return { ...state, password: action.payload };
        case EMAIL_CHANGE:
            return { ...state, email: action.payload };
        case LOGIN_USER:
            return { ...state, showSpinner: true, errorMessage: '' };
        case AUTH_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                errorMessage: '',
                showSpinner: false,
                email: '',
                password: ''
            };
        case AUTH_USER_FAIL:
            return {
                ...state,
                errorMessage: 'Authentication Failed.',
                password: '',
                showSpinner: false
            };
        case SIGNUP_USER:
            return { ...state, showSpinner: true, errorMessage: '' };
        default:
            return state;
    }
};
