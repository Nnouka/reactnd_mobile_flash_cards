import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet} from "react-native";
import {ListItem} from "react-native-elements";
import {blue, green, white} from "../utils/colors";

import {connect} from 'react-redux';
import {addDeckTitle} from "../actions";

class Decks extends Component {
    handleDeckSelect(navigation, title) {
        const {dispatch} = this.props;
        dispatch(addDeckTitle(title));
        navigation.navigate('Deck');
    }
    render() {
        const containsQuestion = (item) => item.questions !== undefined && item.questions.length > 0;
        const {decks, navigation} = this.props;
        console.log(this.props);
        return (
            <FlatList
                data={decks}
                renderItem={({item}) =>
                    <ListItem
                        title={item.title}
                        subtitle={containsQuestion(item) ? `${item.questions[0].question}` : '' }
                        chevron
                        titleStyle={{fontSize: 20, color: blue}}
                        subtitleStyle={{fontStyle: 'italic'}}
                        onPress={() => this.handleDeckSelect(navigation, item.title)}
                        leftElement={() =>
                            <View style={[
                                styles.avatar, {backgroundColor: containsQuestion(item) ? green : blue}]}>
                                <Text style={styles.avatarText}>{item.title.substr(0, 1)}</Text>
                            </View>}
                        badge={
                            {
                                value: containsQuestion(item) ? item.questions.length : 0,
                                textStyle: {color: white },
                                containerStyle: {marginTop: -50},
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

const styles = StyleSheet.create({
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        padding: 10
    },
    avatarText: {
        fontSize: 20,
        color: white,
        textAlign: 'center'
    }
})

function mapStateToProps({decks}) {
    const data = decks;
    const keys = Object.keys(data);
    return {
        loading: decks === undefined,
        decks: keys.map(key => data[key])
    }
}
export default connect(mapStateToProps)(Decks);
