import _ from 'lodash';
import firebase from 'firebase';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { workoutsFetch } from '../actions';
import { connect } from 'react-redux';
import { ListView, View, Text } from 'react-native';
import ListItem from './ListItem';
import { CardSection, Button } from './common';

class Timers extends Component {
    state = { loggedIn: true };

    componentWillMount() {
        this.checkIfLoggedIn();

        this.createDataSource(this.props);
    }

    checkIfLoggedIn() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.workoutsFetch();
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        // nextProps are the next set of props that this component will be renderd with
        // this.props is still the old set of props
        this.createDataSource(nextProps);
    }

    createDataSource({ workouts }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(workouts);
    }

    renderRow(workout) {
        return <ListItem workout={workout} />;
    }

    onLogoutPressed() {
        firebase.auth().signOut();
    }

    onSignUpPressed() {
        Actions.login();
    }

    showLoginMessage() {
        if (!this.state.loggedIn) {
            return (
                <View>
                    <CardSection style={styles.loginMessageContainer}>
                        <Text style={styles.loginMessageText}>Notice: sign in to view and create your own workouts!</Text>
                    </CardSection>
                    <CardSection>
                        <Button onPress={this.onSignUpPressed.bind(this)}>
                            Log In
                        </Button>
                    </CardSection>
                </View>
            );
        }

        return (
            <CardSection>
                <Button onPress={this.onLogoutPressed}>
                    Logout
                </Button>
            </CardSection>
        )
    }

    shouldComponentUpdate() {
        const { currentUser } = firebase.auth();

        if (currentUser) {
            this.setState({ loggedIn: true });
        }
        return true;
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
                {this.showLoginMessage()}
            </View>
        );
    }
}

const styles = {
    loginMessageContainer: {
        padding: 10,
        backgroundColor: '#D9EDF7',
        justifyContent: 'center'
    },
    loginMessageText: {
        color: '#31708F',
        textAlign: 'center',
        fontWeight: 'bold'
    }
};

const mapStateToProps = state => {
    const workouts = _.map(state.timers, (val, uid) => {
        return { ...val, uid };
    });

    return { workouts };
};

export default connect(mapStateToProps, {workoutsFetch})(Timers);
