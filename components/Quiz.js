import React, {Component} from 'react';
import {Card, Button, Icon} from 'react-native-elements';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {green, lightPurp, purple, red} from "../utils/colors";

const ANSWER = 'Answer';
const QUESTION = 'Question';
class Quiz extends Component {
    state = {
      toggleTo: ANSWER,
      cardContent: this.props.questionStem === undefined
          ? 'Cannot take this quiz because there is no question'
          : this.props.questionStem.question
    };

    handleToggleTo() {
        this.setState((prevState) => {
            if (prevState.toggleTo === ANSWER) {
                return {
                    toggleTo: QUESTION,
                    cardContent: this.props.questionStem === undefined
                        ? 'Cannot take this quiz because there is no question'
                        : this.props.questionStem.answer
                };
            } else if (prevState.toggleTo === QUESTION) {
                return {
                    toggleTo: ANSWER,
                    cardContent: this.props.questionStem === undefined
                        ? 'Cannot take this quiz because there is no question'
                        : this.props.questionStem.question
                };
            }
        });
    }
    render() {
        const {cardCount, title, cardNum, questionStem, onAnswered} = this.props;
        const {toggleTo, cardContent} = this.state;
        return (
            <Card title={title}>
                <Text style={styles.pageNum}>
                    {`${cardNum} / ${cardCount}`}
                </Text>
                <Text style={styles.questionText}>
                    {cardContent}
                </Text>
                {questionStem !== undefined &&
                <View>
                    <TouchableOpacity
                        style={styles.answerToggleBtn}
                        onPress={() => this.handleToggleTo()}
                    >
                        <Text style={styles.toggleBtnText}>
                            {toggleTo}
                        </Text>
                    </TouchableOpacity>
                    <Button
                        title='Correct'
                        buttonStyle={[styles.buttonStyle, {backgroundColor: green}]}
                        onPress={onAnswered}
                    />
                    <Button
                        title='Incorrect'
                        buttonStyle={[styles.buttonStyle, {backgroundColor: red}]}
                        onPress={onAnswered}
                    />
                </View>
                }
            </Card>
        );
    }
}
const styles = StyleSheet.create({
    pageNum: {
        textAlign: 'left',
        margin: 5
    },
    questionText: {
      textAlign: 'center',
      fontSize: 24,
      marginTop: 20,
      marginBottom: 20
    },
    toggleBtnText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: lightPurp
    },
    answerToggleBtn: {
        backgroundColor: 'transparent',
        borderRadius: 0,
        margin: 20,
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: purple
    },
    buttonStyle: {
        borderRadius: 0,
        margin: 10,
    }
});

export default Quiz;