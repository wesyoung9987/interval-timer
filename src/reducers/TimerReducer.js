import {
    WORKOUT_FETCH_SUCCESS,
    WORKOUT_DELETE
} from '../actions/types';

const INITIAL_STATE = {
    1: {
        name: 'Tabata',
        interval: 20000,
        rest: 10000,
        rounds: 8,
        countdown: 10000,
        cooldown: 60000
    },
    2: {
        name: 'Stretching',
        interval: 45000,
        rest: 15000,
        rounds: 10,
        countdown: 10000,
        cooldown: 60000
    },
    3: {
        name: 'Tabata2',
        interval: 20000,
        rest: 10000,
        rounds: 2,
        countdown: 10000,
        cooldown: 5000
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case WORKOUT_FETCH_SUCCESS:
            return { ...state, ...action.payload };
        case WORKOUT_DELETE:
            delete state[action.payload];
            return state;
        default:
            return state;
    }
};
