import React, {Component} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {Icon} from 'react-native-elements';
import Decks from './Decks';
import NavigationContainer from '@react-navigation/native';
import DeckItem from './DeckItem';

import {connect} from 'react-redux';
import {receiveDecks} from "../actions";
import {getDemoDecks} from "../utils/helpers";

const Tab = createMaterialTopTabNavigator();
const renderTabIcons = (name, focused, color, size) => {
    let iconName;
    switch(name) {
        case 'Decks':
            iconName = focused ? 'ios-bookmarks' : 'ios-bookmarks';
            return <Icon name='code' size={size} color={color}/>;
        default:
            iconName = focused ? 'ios-speedometer' : 'ios-speedometer';
            return <Icon name='code' size={size} color={color} />;
    }
}
function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({focused, color, size}) => renderTabIcons(
                    route.name, focused, color, size
                )
            })}
            tabBarOptions = {{
                activeTintColor: Platform.OS === 'ios' ? purple : white,
                style: {
                    height: 56,
                    backgroundColor: Platform.OS === 'ios' ? white : purple,
                    shadowColor: 'rgba(0, 0, 0, 0.24)',
                    shadowOffset: {
                        width: 0,
                        height: 3
                    },
                    shadowRadius: 6,
                    shadowOpacity: 1
                }
            }}
        >
            <Tab.Screen name='Decks' component={Decks}/>
        </Tab.Navigator>
    );
}

const MainStack = createStackNavigator();

const MainNavigator = () =>
    <NavigationContainer>
        <MainStack.Navigator>
            <MainStack.Screen name="Decks" component={Tabs} />
            <MainStack.Screen name="Deck Item" component={DeckItem}/>
        </MainStack.Navigator>
    </NavigationContainer>;

class NavigationTree extends Component {
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(receiveDecks(getDemoDecks()))
    }
    render() {
        return (
            <MainNavigator />
        );
    }
}

export default connect()(NavigationTree);