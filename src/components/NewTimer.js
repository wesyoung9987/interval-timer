import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import firebase from 'firebase';
import { Confirm, Card, CardSection, Input, Button } from './common';
import {
    nameChange,
    warmupChange,
    intervalChange,
    restChange,
    cooldownChange,
    roundsChange,
    workoutCreate,
    updateWorkout
} from '../actions';

class NewTimer extends Component {
    state = { showModal: false };

    componentWillMount() {
        const { currentUser } = firebase.auth();

        if (!currentUser) {
            this.setState({ showModal: true });
        }

        if (this.props.workout) {
            const { name, interval, rest, rounds, countdown, cooldown } = this.props.workout;
            this.props.nameChange(name);
            this.props.intervalChange(interval / 1000);
            this.props.restChange(rest / 1000);
            this.props.roundsChange(rounds);
            this.props.warmupChange(countdown / 1000);
            this.props.cooldownChange(cooldown / 1000);
        } else {
            this.props.nameChange('');
            this.props.intervalChange('');
            this.props.restChange('');
            this.props.roundsChange('');
            this.props.warmupChange('');
            this.props.cooldownChange('');
        }
    }

    onAccept() {
        Actions.pop();
        Actions.login();
        this.setState({ showModal: false });
    }

    onDecline() {
        Actions.pop();
        this.setState({ showModal: false });
    }

    onNameChange(text) {
        this.props.nameChange(text);
    }

    onWarmupChange(text) {
        var num = this.numHandler(text);

        this.props.warmupChange(num);
    }

    onIntervalChange(text) {
        var num = this.numHandler(text);

        this.props.intervalChange(num);
    }

    onRestChange(text) {
        var num = this.numHandler(text);

        this.props.restChange(num);
    }

    onCooldownChange(text) {
        var num = this.numHandler(text);

        this.props.cooldownChange(num);
    }

    onRoundsChange(text) {
        var num = this.numHandler(text);

        this.props.roundsChange(num);
    }

    numHandler(text) {
        let textArr = text.split('');
        let nums = '1234567890'.split('');

        let numbersOnly = '';

        textArr.forEach(char => {
            if (nums.indexOf(char) !== -1) {
                numbersOnly = numbersOnly + char;
            }
        });

        if (numbersOnly === '') {
            return '';
        }

        return +numbersOnly;
    }

    createWorkout() {
        const { name, interval, rest, rounds, countdown, cooldown } = this.props;

        this.props.workoutCreate({ name, interval, rest, rounds, countdown, cooldown });
    }

    updateWorkout() {
        const { name, interval, rest, rounds, countdown, cooldown } = this.props;

        this.props.updateWorkout({ name, interval, rest, rounds, countdown, cooldown, uid: this.props.workout.uid });
    }

    generateButton() {
        if (this.props.workout) {
            return (
                <Button onPress={this.updateWorkout.bind(this)}>
                    Save Workout
                </Button>
            );
        }

        return (
            <Button onPress={this.createWorkout.bind(this)}>
                Create Workout
            </Button>
        );
    }

    render() {
        return (
            <KeyboardAwareScrollView>
                <View>
                    <Card>
                        <CardSection>
                            <Input
                                label="Name"
                                placeholder="Enter workout name..."
                                onChangeText={this.onNameChange.bind(this)}
                                value={this.props.name}
                            />
                        </CardSection>

                        <CardSection>
                            <Input
                                label="Warm Up"
                                placeholder="Enter in seconds..."
                                onChangeText={this.onWarmupChange.bind(this)}
                                keyboardType="numeric"
                                value={'' + this.props.countdown}
                            />
                            <Text style={styles.hintPosition}>seconds</Text>
                        </CardSection>

                        <CardSection>
                            <Input
                                label="Interval"
                                placeholder="Enter in seconds..."
                                onChangeText={this.onIntervalChange.bind(this)}
                                keyboardType="numeric"
                                value={this.props.interval.toString()}
                            />
                            <Text style={styles.hintPosition}>seconds</Text>
                        </CardSection>

                        <CardSection>
                            <Input
                                label="Rest"
                                placeholder="Enter in seconds..."
                                onChangeText={this.onRestChange.bind(this)}
                                keyboardType="numeric"
                                value={this.props.rest.toString()}
                            />
                            <Text style={styles.hintPosition}>seconds</Text>
                        </CardSection>

                        <CardSection>
                            <Input
                                label="Cool Down"
                                placeholder="Enter in seconds..."
                                onChangeText={this.onCooldownChange.bind(this)}
                                keyboardType="numeric"
                                value={this.props.cooldown.toString()}
                            />
                            <Text style={styles.hintPosition}>seconds</Text>
                        </CardSection>

                        <CardSection>
                            <Input
                                label="Rounds"
                                placeholder="Enter number of rounds..."
                                onChangeText={this.onRoundsChange.bind(this)}
                                keyboardType="numeric"
                                value={this.props.rounds.toString()}
                            />
                        </CardSection>

                    </Card>

                    <Card>

                        <CardSection>
                            {this.generateButton()}
                        </CardSection>

                    </Card>

                    <Confirm
                        visible={this.state.showModal}
                        onAccept={this.onAccept.bind(this)}
                        onDecline={this.onDecline.bind(this)}
                    >
                        You need to be signed in to manage your workouts. Sign in now?
                    </Confirm>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = {
    hintPosition: {
        marginTop: 10,
        marginRight: 10,
        color: '#2962FF'
    }
};

const mapStateToProps = state => {
    return {
        name: state.createTimer.name,
        interval: state.createTimer.interval,
        rest: state.createTimer.rest,
        rounds: state.createTimer.rounds,
        countdown: state.createTimer.countdown,
        cooldown: state.createTimer.cooldown
    }
};

export default connect(mapStateToProps, {
    nameChange: nameChange,
    warmupChange: warmupChange,
    intervalChange: intervalChange,
    restChange: restChange,
    cooldownChange: cooldownChange,
    roundsChange: roundsChange,
    workoutCreate: workoutCreate,
    updateWorkout: updateWorkout
})(NewTimer);
