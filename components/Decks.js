import React, {Component} from 'react';
import {View, Text, FlatList} from "react-native";
import {ListItem} from "react-native-elements";
import {getDemoDecks} from "../utils/helpers";
import {blue, lightPurp, red, white} from "../utils/colors";

class Decks extends Component {
    state = {
        loading: false,
        data: [
        ],
        refreshing: false
    }
    componentDidMount() {
        this.setState(() => ({data: getDemoDecks()}))
    }

    render() {
        const containsQuestion = (item) => item.questions !== undefined && item.questions.length > 0;
        return (
            <FlatList
                data={this.state.data}
                renderItem={({item}) =>
                    <ListItem
                        title={item.title}
                        subtitle={containsQuestion(item) ? `${item.questions[0].question}` : '' }
                        bottomDivider
                        chevron
                        titleStyle={{fontSize: 20, color: blue}}
                        subtitleStyle={{fontStyle: 'italic'}}
                        badge={
                            {
                                value: containsQuestion(item) ? item.questions.length : 0,
                                textStyle: {color: white },
                                containerStyle: {marginTop: -20},
                                status: containsQuestion(item) ? 'success' : 'primary'
                            }
                        }
                    />
                }
                keyExtractor={(item, index) => `${item.title}-${index}`}
            />
        );
    }
}

export default Decks;
