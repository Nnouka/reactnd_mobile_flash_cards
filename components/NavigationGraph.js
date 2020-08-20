import React, {Component} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Decks from './Decks';
import {NavigationContainer} from '@react-navigation/native';
import DeckItem from './DeckItem';
import Quiz from './Quiz';
import NewDeck from './NewDeck';
import NewCard from './NewCard';

import {connect} from 'react-redux';
import {receiveDecks} from "../actions";
import {getDecksData} from "../utils/helpers";
import {underscoreToSpace} from "../utils/strings";

const Tab = createMaterialTopTabNavigator();
function Tabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Decks' component={Decks}/>
            <Tab.Screen name='NewDeck' options={{ title: 'New Deck' }} component={NewDeck} />
        </Tab.Navigator>
    );
}

const MainStack = createStackNavigator();

class NavigationGraph extends Component {
    componentDidMount() {
        const {dispatch} = this.props;
        getDecksData().then((data) => {
            dispatch(receiveDecks(data))
        })
    }
    render() {
        const {deckTitle} = this.props
        const getTitle = () => `${deckTitle != null ? underscoreToSpace(deckTitle) + ' Cards' : 'Decks'}`
        return (
            <NavigationContainer>
                <MainStack.Navigator>
                    <MainStack.Screen
                        name="MobileFlashCards"
                        options={{ title: 'Mobile FlashCards' }}
                        component={Tabs} />
                    <MainStack.Screen
                        name="Deck"
                        options={{ title: getTitle() }}
                        component={DeckItem}/>
                    <MainStack.Screen
                        name="Quiz"
                        options={{ title: getTitle() }}
                        component={Quiz}/>
                    <MainStack.Screen
                        name="NewCard"
                        options={{ title: getTitle() }}
                        component={NewCard}/>
                </MainStack.Navigator>
            </NavigationContainer>
        );
    }
}
function mapStatToProps({title}) {
    return {
        deckTitle: title
    }
}
export default connect(mapStatToProps)(NavigationGraph);