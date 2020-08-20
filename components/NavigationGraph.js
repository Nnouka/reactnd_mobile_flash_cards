import React, {Component} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {Icon} from 'react-native-elements';
import Decks from './Decks';
import {NavigationContainer} from '@react-navigation/native';
import DeckItem from './DeckItem';
import Quiz from './Quiz';
import {white, purple} from "../utils/colors";

import {connect} from 'react-redux';
import {receiveDecks} from "../actions";
import {getDemoDecks} from "../utils/helpers";

const Tab = createMaterialTopTabNavigator();
function Tabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Decks' component={Decks}/>
            <Tab.Screen name='New Deck' component={Decks} />
        </Tab.Navigator>
    );
}

const MainStack = createStackNavigator();

class NavigationGraph extends Component {
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(receiveDecks(getDemoDecks()))
    }
    render() {
        const {deckTitle} = this.props
        const getTitle = () => `${deckTitle != null ? deckTitle + ' Cards' : 'Decks'}`
        return (
            <NavigationContainer>
                <MainStack.Navigator>
                    <MainStack.Screen name="Mobile FlashCards" component={Tabs} />
                    <MainStack.Screen name="Deck" options={{ title: getTitle() }} component={DeckItem}/>
                    <MainStack.Screen name="Quiz" options={{ title: getTitle() }} component={Quiz}/>
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