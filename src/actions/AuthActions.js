import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {
    PASSWORD_CHANGE,
    EMAIL_CHANGE,
    LOGIN_USER,
    AUTH_USER_SUCCESS,
    AUTH_USER_FAIL,
    SIGNUP_USER
} from './types';

export const passwordChanged = (password) => {
    return {
        type: PASSWORD_CHANGE,
        payload: password
    }
};

export const emailChanged = (email) => {
    return {
        type: EMAIL_CHANGE,
        payload: email
    }
};

export const loginUser = ({email, password}) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => authUserSuccess(dispatch, user))
            .catch((error) => {
                authUserFail(dispatch);
            });
    }
};

export const signupUser = ({email, password}) => {
    return (dispatch) => {
        dispatch({ type: SIGNUP_USER });

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => authUserSuccess(dispatch, user, 'signup'))
            .catch((error) => {
                authUserFail(dispatch);
            });
    }
};

const authUserFail = (dispatch) => {
    dispatch({type: AUTH_USER_FAIL});
};

const authUserSuccess = (dispatch, user, action) => {
    dispatch({type: AUTH_USER_SUCCESS, payload: user});

    Actions.timers({type: 'reset'});

};
