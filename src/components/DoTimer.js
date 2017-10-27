import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Card, CardSection } from './common';
import {Actions} from 'react-native-router-flux';
import KeepAwake from 'react-native-keep-awake';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

var bell = new Sound('bell.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        return false;
    }
});

var beep = new Sound('beep.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        return false;
    }
});

var buzzer = new Sound('buzzer.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        return false;
    }
});

class DoTimer extends Component {
    state = { rounds, countdown, interval, rest, cooldown } = this.props.workout;

    componentWillMount() {
        KeepAwake.activate();
        this.setState({ currentNumber: this.state.countdown, currentTask: 'Countdown', backgroundColor: '#343434', timerPaused: true, goBack: false });
    }

    manageTime(action) {
        var interval = setInterval(() => {
            var newNum = this.state.currentNumber - 1000;
            if (this.state.timerPaused) {
                clearInterval(interval);
                return;
            }
            if (this.state.goBack) {
                clearInterval(interval);
                Actions.pop();
            }
            if (newNum < 0) {
                switch (this.state.currentTask) {
                    case 'Countdown':
                        this.setState({
                            currentNumber: this.state.interval,
                            currentTask: 'Work',
                            backgroundColor: 'lawngreen'
                        });
                        this.playBell();
                        clearInterval(interval);
                        newNum = this.state.currentNumber;
                        this.startTimer();
                        break;
                    case 'Work':
                        if (this.state.rounds > 1) {
                            this.setState({
                                currentNumber: this.state.rest,
                                currentTask: 'Rest',
                                backgroundColor: 'red'
                            });
                            this.playBeep();
                        } else {
                            this.setState({
                                currentNumber: this.state.cooldown,
                                currentTask: 'Cooldown',
                                backgroundColor: 'royalblue'
                            });
                            this.playBuzzer();
                        }
                        clearInterval(interval);
                        newNum = this.state.currentNumber;
                        this.startTimer();
                        break;
                    case 'Rest':
                        this.setState({
                            currentNumber: this.state.interval,
                            currentTask: 'Work',
                            backgroundColor: 'lawngreen'
                        });
                        this.playBell();
                        clearInterval(interval);
                        newNum = this.state.currentNumber;
                        let round = this.state.rounds - 1;
                        this.setState({rounds: round});
                        this.startTimer();
                        break;
                    default:
                        this.setState({currentNumber: 0, timerPaused: true});
                        newNum = this.state.currentNumber;
                        clearInterval(interval);
                }
            }
            this.setState({currentNumber: newNum});
        }, 1000);
    }

    playBell() {
        bell.play((success) => {
            if (success) {
                return false;
            } else {
                return true;
            }
        });
    }

    playBuzzer() {
        buzzer.play((success) => {
            if (success) {
                return true;
            } else {
                return false;
            }
        });
    }

    playBeep() {
        beep.play((success) => {
            if (success) {
                beep.play((success) => {
                    if (success) {
                        return true;
                    } else {
                        return false;
                    }
                });
            } else {
                return false;
            }
        });
    }

    startTimer() {
        this.manageTime('start');
        this.setState({timerPaused: false});
    }

    pauseTimer() {
        this.setState({timerPaused: true});
    }

    goBack() {
        KeepAwake.deactivate();
        if (!this.state.timerPaused) {
            this.setState({goBack: true});
            return;
        }
        Actions.pop();
    }

    render() {
        const timerPaused = this.state.timerPaused;

        let button = null;
        if (timerPaused) {
            button = <CardSection><Button onPress={this.startTimer.bind(this)}>Start Workout</Button></CardSection>;
        } else {
            button = <CardSection><Button onPress={this.pauseTimer.bind(this)}>Pause Workout</Button></CardSection>;
        }
        return (
            <View style={{flex: 1, backgroundColor: this.state.backgroundColor, marginTop: -65 }}>
                <View style={styles.backButtonContainer}>
                    <Text
                        onPress={function() {this.goBack()}.bind(this)}
                        style={styles.backButton}>Back</Text>
                </View>

                <View>
                    <Text style={styles.currentTask}>{this.state.currentTask}</Text>
                </View>

                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={styles.number}>{this.state.currentNumber / 1000}</Text>
                </View>



                {button}
            </View>
        );
    }
}

const styles = {
    // TODO: finish styling back button
    backButtonContainer: {
        marginLeft: 5,
        marginTop: 25,
        backgroundColor: '#282828',
        padding: 5,
        width: 50,
        borderRadius: 4,
        opacity: .8
    },
    backButton: {
        fontSize: 18,
        color: 'white'
    },
    number: {
        textAlign: 'center',
        color: 'white',
        fontSize: 250
    },
    currentTask: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30
    }
};

export default DoTimer;
