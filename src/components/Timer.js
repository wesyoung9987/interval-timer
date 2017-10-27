import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Confirm } from './common';
import { Actions } from 'react-native-router-flux';
import { deleteWorkout } from '../actions';

class Timer extends Component {

    state = { showModal: false };

    doWorkout() {
        Actions.startTimer({ title: this.props.workout.name, workout: this.props.workout, hideNavBar: true });
    }

    onDeletePress() {
        this.setState({ showModal: true })
    }

    onAccept() {
        const { uid } = this.props.workout;

        this.props.deleteWorkout({ uid });
    }

    onDecline() {
        this.setState({ showModal: false });
    }

    onEditTimer() {
        Actions.newTimer({ workout: this.props.workout, title: 'Edit ' + this.props.workout.name });
    }

    extraButtons() {
        if (this.props.workout.uid.length > 2) {
            return (
                <View>
                    <CardSection>
                        <Button onPress={this.onEditTimer.bind(this)}>Edit Workout</Button>
                    </CardSection>
                    <CardSection>
                        <Button onPress={this.onDeletePress.bind(this)}>Delete Workout</Button>
                    </CardSection>
                </View>
            );
        }
    }

    render() {
        const { rounds, interval, rest, cooldown, countdown } = this.props.workout;

        return (
            <View>
                <Card>
                    <CardSection style={styles.sectionStyle}>
                        <Text style={styles.titleStyle}>Details</Text>
                    </CardSection>
                    <CardSection style={styles.sectionStyle}>
                        <Text>
                            <Text style={styles.descriptionStyle}>Number of Rounds: </Text>{rounds}
                        </Text>
                    </CardSection>
                    <CardSection style={styles.sectionStyle}>
                        <Text>
                            <Text style={styles.descriptionStyle}>Work Intervals: </Text>{interval / 1000} seconds
                        </Text>
                    </CardSection>
                    <CardSection style={styles.sectionStyle}>
                        <Text>
                            <Text style={styles.descriptionStyle}>Rest Intervals: </Text>{rest / 1000} seconds
                        </Text>
                    </CardSection>
                    <CardSection style={styles.sectionStyle}>
                        <Text>
                            <Text style={styles.descriptionStyle}>Warm Up: </Text>{countdown / 1000} seconds
                        </Text>
                    </CardSection>
                    <CardSection style={styles.sectionStyle}>
                        <Text>
                            <Text style={styles.descriptionStyle}>Cooldown: </Text>{cooldown / 1000} seconds
                        </Text>
                    </CardSection>
                </Card>
                <Card>
                    <CardSection>
                        <Button onPress={this.doWorkout.bind(this)}>Do Workout</Button>
                    </CardSection>
                    {this.extraButtons()}
                </Card>

                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to delete this workout?
                </Confirm>
            </View>
        );
    }
}

const styles = {
    sectionStyle: {
        justifyContent: 'center',
        padding: 10
    },
    titleStyle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    descriptionStyle: {
        fontWeight: 'bold'
    }
};

export default connect(null, { deleteWorkout })(Timer);
