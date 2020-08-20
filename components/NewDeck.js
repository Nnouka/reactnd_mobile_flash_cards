import React, {Component} from 'react';
import {Card, Button, Icon, Input} from 'react-native-elements';
import {Text, View, StyleSheet} from 'react-native';
import {green, lightPurp, purple, red, white} from "../utils/colors";
import {connect} from 'react-redux';
import {newDeck} from "../actions";

class NewDeck extends Component {
    state = {
        newTitle: '',
        errorMessage: '',
        canSubmit: false
    }
    onInput(e) {
        const newTitle = e.nativeEvent.text;
        const {decks} = this.props;
        if (decks[newTitle] !== undefined) {
            this.setState((prevState) => ({
                ...prevState,
                errorMessage: 'Deck Already Exists',
                canSubmit: false
            }));
        } else {
            this.setState((prevState) => ({
                ...prevState,
                newTitle,
                canSubmit: true
            }));
        }
    }
    onCreate() {
        const {canSubmit, newTitle} = this.state;
        const {dispatch, navigation} = this.props;
        if (canSubmit) {
            // dispatch new title action
            dispatch(newDeck(newTitle));
            this.setState((prevState) => ({
                ...prevState,
                newTitle: '',
                canSubmit: false
            }));
            navigation.navigate('Decks');
        }
    }
    render() {
        const {errorMessage, canSubmit, newTitle} = this.state;
        return (
            <Card
                title='New Deck'
            >
                <Text style={styles.titleText}>
                    What is the title of your new Deck?
                </Text>
                <Input
                    placeholder='Deck Title'
                    errorStyle={{color: red}}
                    errorMessage={errorMessage}
                    onTextInput={(event) => this.onInput(event)}
                    value={newTitle}
                />
                <Button
                    title='Create'
                    buttonStyle={[styles.buttonStyle, {backgroundColor: green}]}
                    onPress={() => this.onCreate()}
                    disabled={!canSubmit}
                />
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    titleText: {
        textAlign: 'center',
        fontSize: 24,
        marginTop: 20,
        marginBottom: 20
    },
    buttonStyle: {
        borderRadius: 0,
        margin: 10,
    }
});

function mapStateToProps({decks}, props) {
 return {
     decks,
     deck: '',
     ...props
 }
}
export  default connect(mapStateToProps)(NewDeck);