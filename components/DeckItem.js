import React, {Component} from 'react';
import {Card, Button, Icon} from 'react-native-elements';
import {Text, View, StyleSheet} from 'react-native';
import {green, red, white} from "../utils/colors";

class DeckItem extends Component {
    render() {
        const {title, cardCount} = this.props;
        return (
            <Card title={title}>
                <Text style={styles.textStyle}>
                    {`${cardCount} card${cardCount > 1 ? 's': ''}`}
                </Text>
                <Button
                    title='Add Card'
                    buttonStyle={styles.buttonStyle} />
                <Button
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
export default DeckItem;