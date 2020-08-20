import React, {Component} from 'react';
import {Card, Button, Icon} from 'react-native-elements';
import {Text, View, StyleSheet} from 'react-native';
import {green, red, white} from "../utils/colors";
import {connect} from 'react-redux';
import {underscoreToSpace} from "../utils/strings";

class DeckItem extends Component {
    render() {
        const {title, cardCount, navigation} = this.props;
        return (
            <Card title={underscoreToSpace(title)}>
                <Text style={styles.textStyle}>
                    {`${cardCount} card${cardCount > 1 ? 's': ''}`}
                </Text>
                <Button
                    title='Add Card'
                    onPress={() => navigation.navigate('NewCard')}
                    buttonStyle={styles.buttonStyle} />
                <Button
                    onPress={() => navigation.navigate('Quiz')}
                    title='Start Quiz'
                    buttonStyle={[styles.buttonStyle, {backgroundColor: cardCount > 0 ? green : red}]} />
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    textStyle: {
      textAlign: 'center',
      margin: 10
    },
    buttonStyle: {
        borderRadius: 0,
        margin: 10,
    }
});

function mapStateToProps({title, decks}, props) {
    const countCards = (deck) => deck.questions !== undefined ? deck.questions.length : 0;
    return {
        title,
        cardCount: countCards(decks[title]),
        ...props
    }
}
export default connect(mapStateToProps)(DeckItem);