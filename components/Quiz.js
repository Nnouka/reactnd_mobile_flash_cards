import React, {Component} from 'react';
import {Card, Button, Icon} from 'react-native-elements';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {green, lightPurp, purple, red} from "../utils/colors";
import {connect} from 'react-redux';
import {underscoreToSpace} from "../utils/strings";

const ANSWER = 'Answer';
const QUESTION = 'Question';
const NO_QUESTION_GIST = '🔒 Sorry, You cannot take this quiz at the moment because there is no question';
const FINISHER_GIST = '🎓 Congratulations, You finished this quiz. See how well you did below. You can always try again'
class Quiz extends Component {
    state = {
        toggleTo: ANSWER,
        cardContent: '',
        cardNum: 0,
        score: 0,
        completed: false
    };
    generateQuestionFromDeck = () => {
        let start = 0;
        const {deck} = this.props;
        return () => {
            const next = start;
            if (deck.questions !== undefined && next < deck.questions.length) {
                start++;
                return {index: next, questionBody: deck.questions[next]};
            }
            return undefined;
        }
    }
    questionGenerator = this.generateQuestionFromDeck();
    questionStem = this.questionGenerator();
    componentDidMount() {
        this.setState((prevState) => {
            return {
                ...prevState,
                cardContent: this.questionStem === undefined
                ? NO_QUESTION_GIST
                : this.questionStem.questionBody.question,
                cardNum: this.questionStem === undefined ? 0 :this.questionStem.index + 1
            }
        })
    }

    handleToggleTo() {
        this.setState((prevState) => {
            if (prevState.toggleTo === ANSWER) {
                return {
                    toggleTo: QUESTION,
                    cardContent: this.questionStem === undefined
                        ? NO_QUESTION_GIST
                        : this.questionStem.questionBody.answer,
                    cardNum: this.questionStem === undefined ? 0 : this.questionStem.index + 1
                };
            } else if (prevState.toggleTo === QUESTION) {
                return {
                    toggleTo: ANSWER,
                    cardContent: this.questionStem === undefined
                        ? NO_QUESTION_GIST
                        : this.questionStem.questionBody.question,
                    cardNum: this.questionStem === undefined ? 0 : this.questionStem.index + 1
                };
            }
        });
    }
    onAnswered(correct) {
        this.questionStem = this.questionGenerator();
        this.setState((prevState) => {
            return {
                ...prevState,
                cardContent: this.questionStem === undefined
                    ? FINISHER_GIST
                    : this.questionStem.questionBody.question,
                cardNum: this.questionStem === undefined ? prevState.cardNum :this.questionStem.index + 1,
                score: correct ? prevState.score + 1 : prevState.score,
                completed: this.questionStem === undefined
            }
        })
    }

    onRestart() {
        this.questionGenerator = this.generateQuestionFromDeck();
        this.questionStem = this.questionGenerator();
        this.setState((prevState) => {
            return {
                ...prevState,
                cardContent: this.questionStem === undefined
                    ? NO_QUESTION_GIST
                    : this.questionStem.questionBody.question,
                cardNum: this.questionStem === undefined ? 0 :this.questionStem.index + 1,
                completed: false,
                score: 0
            }
        })
    }
    render() {
        const {cardCount, title, navigation} = this.props;
        const {toggleTo, cardContent, cardNum, completed, score} = this.state;
        return (
            <Card title={underscoreToSpace(title)}>
                <View>
                    {
                        !completed &&
                        <View>
                            <Text style={styles.pageNum}>
                                {`${cardNum} / ${cardCount}`}
                            </Text>
                        </View>
                    }
                </View>
                <Text style={styles.questionText}>
                    {cardContent}
                </Text>
                <View>
                    {
                        completed &&
                        <View>
                            <Text style={[styles.scoreContainer, {color: green}]}>
                                Correct answers: {`${score}`}
                            </Text>
                            <Text style={[styles.scoreContainer, {color: red}]}>
                                Wrong answers: {`${cardCount - score}`}
                            </Text>
                            <Text style={styles.scoreText}>
                                Score: {`${Math.round((score / cardCount) * 100)} %`}
                            </Text>
                            <Button
                                title='Restart Quiz'
                                buttonStyle={[styles.buttonStyle, {backgroundColor: green}]}
                                onPress={() => this.onRestart()}
                            />
                            <Button
                                title='Back to Deck'
                                buttonStyle={[styles.buttonStyle, {backgroundColor: lightPurp}]}
                                onPress={() => navigation.navigate('Deck')}
                            />
                        </View>
                    }
                </View>
                <View>
                    {
                        this.questionStem !== undefined &&
                        <View>
                            <Button
                                title={toggleTo}
                                titleStyle={styles.toggleBtnText}
                                type='clear'
                                onPress={() => this.handleToggleTo()}
                            />
                            <Button
                                title='Correct'
                                buttonStyle={[styles.buttonStyle, {backgroundColor: green}]}
                                onPress={() => this.onAnswered(true)}
                            />
                            <Button
                                title='Incorrect'
                                buttonStyle={[styles.buttonStyle, {backgroundColor: red}]}
                                onPress={() => this.onAnswered(false)}
                            />
                        </View>
                    }
                </View>
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
    scoreText: {
        textAlign: 'center',
        fontSize: 24,
        marginTop: 20,
        marginBottom: 20,
        color: purple
    },
    scoreContainer: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 14
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

function mapStateToProps({title, decks}, props) {
    const deck = decks[title];
    const countCards = () => deck.questions !== undefined ? deck.questions.length : 0;
    return {
        title,
        cardCount: countCards(),
        deck,
        ...props
    }
}
export default connect(mapStateToProps)(Quiz);