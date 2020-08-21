import React, {Component} from 'react';
import {Card, Button, Icon, Input} from 'react-native-elements';
import {Text, View, StyleSheet} from 'react-native';
import {green, lightPurp, purple, red, white} from "../utils/colors";
import {connect} from 'react-redux';
import {newCard, newDeck} from "../actions";
import {addCardToDeck, saveDeckTitle} from "../utils/helpers";

class NewCard extends Component {
    state = {
        newQuestion: '',
        newAnswer: '',
        canSubmit: false
    }
    onQuestionInput(e) {
        const newQuestion = e.nativeEvent.text;
        this.setState((prevState) => ({
            ...prevState,
            newQuestion,
            canSubmit: prevState.newAnswer.length > 0 && newQuestion.length > 0
        }));
    }
    onAnswerInput(e) {
        const newAnswer = e.nativeEvent.text;
        this.setState((prevState) => ({
            ...prevState,
            newAnswer,
            canSubmit: newAnswer.length > 0 && prevState.newQuestion.length > 0
        }));
    }
    onCreate() {
        const {canSubmit, newQuestion, newAnswer} = this.state;
        const {dispatch, navigation, title} = this.props;
        if (canSubmit) {
            // dispatch new card action
            dispatch(newCard(title, {question: newQuestion, answer: newAnswer}));
            addCardToDeck(title, {question: newQuestion, answer: newAnswer})
            this.setState((prevState) => ({
                ...prevState,
                newTitle: '',
                canSubmit: false
            }));
            navigation.navigate('Deck');
        }
    }
    render() {
        const {errorMessage, canSubmit} = this.state;
        return (
            <Card
                title='New Card'
            >
                <Input
                    placeholder='Enter a question'
                    errorStyle={{color: red}}
                    errorMessage={errorMessage}
                    onChange={(event) => this.onQuestionInput(event)}
                />
                <Input
                    placeholder='Enter an answer'
                    errorStyle={{color: red}}
                    errorMessage={errorMessage}
                    onChange={(event) => this.onAnswerInput(event)}
                />
                <Button
                    title='Submit'
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

function mapStateToProps({title, decks}, props) {
    const deck = decks[title];
    return {
        title,
        deck,
        ...props
    }
}
export  default connect(mapStateToProps)(NewCard);