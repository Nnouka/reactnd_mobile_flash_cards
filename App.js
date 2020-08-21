import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { createStore } from 'redux';
import { Provider} from 'react-redux';
import reducer from './reducers';
import middleware from './middleware'


import NavigationGraph from './components/NavigationGraph';
import {setWelcomeNotification} from "./utils/helpers";


class App extends Component {

    componentDidMount() {
        setWelcomeNotification();
    }

    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={styles.container}>
                    <NavigationGraph />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
