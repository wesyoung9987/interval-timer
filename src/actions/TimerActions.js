import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    WORKOUT_FETCH_SUCCESS,
    NAME_CHANGE,
    WARMUP_CHANGE,
    INTERVAL_CHANGE,
    REST_CHANGE,
    COOLDOWN_CHANGE,
    ROUNDS_CHANGE,
    WORKOUT_CREATE,
    WORKOUT_DELETE,
    WORKOUT_UPDATE
} from './types';

export const workoutsFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/workouts`)
            .on('value', snapshot => {
                dispatch({ type: WORKOUT_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};

export const workoutCreate = ({ name, interval, rest, rounds, countdown, cooldown }) => {
    const { currentUser } = firebase.auth();

    var data = {
        name,
        interval: +interval * 1000,
        rest: +rest * 1000,
        rounds: +rounds,
        countdown: +countdown * 1000,
        cooldown: +cooldown * 1000
    };

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/workouts`)
            .push(data)
            .then(() => {
                dispatch({ type: WORKOUT_CREATE });

                Actions.pop();
            });
    }
};

export const updateWorkout = ({ name, interval, rest, rounds, countdown, cooldown, uid }) => {
    const { currentUser } = firebase.auth();

    var data = {
        name,
        interval: +interval * 1000,
        rest: +rest * 1000,
        rounds: +rounds,
        countdown: +countdown * 1000,
        cooldown: +cooldown * 1000
    };

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/workouts/${uid}`)
            .set(data)
            .then(() => {
                dispatch({ type: WORKOUT_UPDATE });

                Actions.pop();
                Actions.pop();
            });
    }
};

export const deleteWorkout = ({ uid }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/workouts/${uid}`)
            .remove()
            .then(() => {
                dispatch({ type: WORKOUT_DELETE, payload: uid });

                // Weird workaround that got the timers list to reload. Find better way
                Actions.timers({type: 'reset'});
                Actions.pop();
                Actions.pop();
            });
    }
};

export const nameChange = (text) => {
    return {
        type: NAME_CHANGE,
        payload: text
    }
};

export const warmupChange = (text) => {
    return {
        type: WARMUP_CHANGE,
        payload: text
    }
};

export const intervalChange = (text) => {
    return {
        type: INTERVAL_CHANGE,
        payload: text
    }
};

export const restChange = (text) => {
    return {
        type: REST_CHANGE,
        payload: text
    }
};

export const cooldownChange = (text) => {
    return {
        type: COOLDOWN_CHANGE,
        payload: text
    }
};

export const roundsChange = (text) => {
    return {
        type: ROUNDS_CHANGE,
        payload: text
    }
};
