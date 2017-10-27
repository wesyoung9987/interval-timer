import React from 'react';
import { View } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Signup from './components/Signup'
import Login from './components/Login';
import Timers from './components/Timers';
import NewTimer from './components/NewTimer';
import Timer from './components/Timer';
import DoTimer from './components/DoTimer';

const RouterComponent = () => {
    return (
        <Router sceneStyle={{paddingTop: 65}}>
            <Scene
                key="login"
                component={Login}
                title="Log In"
            />
            <Scene
                key="signup"
                component={Signup}
                title="Sign Up"
            />
            <Scene
                initial
                key="timers"
                component={Timers}
                title="All Workouts"
                rightTitle="Add"
                onRight={() => Actions.newTimer()}
            />
            <Scene
                key="newTimer"
                component={NewTimer}
                title="Add New Workout"
            />
            <Scene
                key="timer"
                component={Timer}
                title="Workout"
            />
            <Scene
                key="startTimer"
                component={DoTimer}
                title="Workout"
                hideNavBar={true}
            />
        </Router>
    );
};

export default RouterComponent;
