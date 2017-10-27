import React, {Component} from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import {Actions} from 'react-native-router-flux';
import { CardSection } from './common';

class ListItem extends Component {

    onRowPress() {
        Actions.timer({ title: this.props.workout.name, workout: this.props.workout, backTitle: "Back" });
    }

    render() {
        const { name, rounds, interval, rest } = this.props.workout;

        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View>
                    <CardSection style={styles.sectionContainer}>
                        <View style={styles.leftContainer}>
                            <Text style={styles.titleStyle}>
                                {name}
                            </Text>
                            <Text style={styles.roundsStyle}>
                                <Text style={styles.descriptionTitle}>Rounds:</Text> {rounds}
                            </Text>
                        </View>
                        <View style={styles.rightContainer}>
                            <Text>
                                <Text style={styles.descriptionTitle}>Interval:</Text> {interval / 1000} seconds
                            </Text>
                            <Text>
                                <Text style={styles.descriptionTitle}>Rest:</Text> {rest / 1000} seconds
                            </Text>
                        </View>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    sectionContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    leftContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    rightContainer: {
        marginTop: 10,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15,
        fontWeight: 'bold'
    },
    roundsStyle: {
        paddingLeft: 15,
        marginTop: 10
    },
    descriptionTitle: {
        fontWeight: 'bold'
    }
};

export default ListItem;