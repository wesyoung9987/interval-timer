import { combineReducers } from 'redux';
import TimerReducer from './TimerReducer';
import AuthReducer from './AuthReducer';
import CreateTimerReducer from './CreateTimerReducer';

export default combineReducers({
    timers: TimerReducer,
    auth: AuthReducer,
    createTimer: CreateTimerReducer
});
