import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';
import {Actions} from 'react-native-router-flux';

class Login extends Component {

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onChangePassword(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const { email, password } = this.props;

        this.props.loginUser({ email, password });
    }

    renderButton() {
        if (this.props.showSpinner) {
            return <Spinner size="large"/>
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Sign In
            </Button>
        );
    }

    signUp() {
        Actions.signup();
    }

    render() {
        return (
            <View>
                <Card>
                    <CardSection>
                        <Input
                            onChangeText={this.onEmailChange.bind(this)}
                            label="Email"
                            placeholder="Enter you email"
                            value={this.props.email}
                        />
                    </CardSection>

                    <CardSection>
                        <Input
                            secureTextEntry
                            label="Password"
                            placeholder="Enter your password"
                            onChangeText={this.onChangePassword.bind(this)}
                            value={this.props.password}
                        />
                    </CardSection>

                    <Text style={styles.errorMessage}>
                        {this.props.errorMessage}
                    </Text>

                    <CardSection>
                        {this.renderButton()}
                    </CardSection>

                </Card>

                <Card>
                    <CardSection>
                        <Text>Don't have an account? <Text style={styles.signUp} onPress={this.signUp.bind(this)}>Sign Up.</Text></Text>
                    </CardSection>
                </Card>
            </View>
        );
    }
}

const styles = {
    errorMessage: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    signUp: {
        color: '#007aaf'
    }
};

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        errorMessage: state.auth.errorMessage,
        showSpinner: state.auth.showSpinner
    }
};

export default connect(mapStateToProps, {
    emailChanged: emailChanged,
    passwordChanged: passwordChanged,
    loginUser: loginUser
})(Login);
