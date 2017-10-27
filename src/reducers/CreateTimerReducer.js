import {
    NAME_CHANGE,
    WARMUP_CHANGE,
    INTERVAL_CHANGE,
    REST_CHANGE,
    COOLDOWN_CHANGE,
    ROUNDS_CHANGE,
    WORKOUT_CREATE,
    WORKOUT_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    interval: '',
    rest: '',
    rounds: '',
    countdown: '',
    cooldown: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NAME_CHANGE:
            return { ...state, name: action.payload };
        case WARMUP_CHANGE:
            return { ...state, countdown: action.payload };
        case INTERVAL_CHANGE:
            return { ...state, interval: action.payload };
        case REST_CHANGE:
            return { ...state, rest: action.payload };
        case COOLDOWN_CHANGE:
            return { ...state, cooldown: action.payload };
        case ROUNDS_CHANGE:
            return { ...state, rounds: action.payload };
        case WORKOUT_CREATE:
            return INITIAL_STATE;
        case WORKOUT_UPDATE:
            return INITIAL_STATE;
        default:
            return state;
    }
};
