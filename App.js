import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { createStore } from 'redux';
import { Provider} from 'react-redux';
import reducer from './reducers';
import middleware from './middleware'


import NavigationGraph from './components/NavigationGraph';
import {initDecks} from "./utils/helpers";


class App extends Component {

    componentDidMount() {
        initDecks();
    }

    render() {
        return (
            <Provider store={createStore(reducer, middleware)}>
                <View style={styles.container}>
                    <NavigationGraph />
                </View>
            </Provider>
        );
    }

    /* state = {
         questionIndex: 1,
         deckIndex: 0,
         decks: getDemoDecks(),
         mounted: false,
     };
     generateQuestionFromDeck = () => {
         let start = 0;
         const deck = this.state.decks.length > 0 ? this.state.decks[this.state.deckIndex] : {};
         return () => {
             const next = start;
             if (deck.questions !== undefined && next < deck.questions.length) {
                 start++;
                 console.log(next)
                 return {index: next, question: deck.questions[next]};
             }
             return undefined;
         }
     }
     questionGenerator = null;
     componentDidMount() {
         this.setState((prevState) => ({...prevState, mounted: true}));
         this.questionGenerator = this.generateQuestionFromDeck();
     }

     render() {
         const {deckIndex, decks, mounted} = this.state;
         const countCards = (deck) => deck.questions !== undefined ? deck.questions.length : 0;
         const questionStem = mounted ? this.questionGenerator() : {};
         const onAnswered = () => {
             this.setState((prevState) => ({
                 ...prevState, questionIndex: prevState.questionIndex + 1
             }))
         }
         return (
             <View style={styles.container}>
                 <StatusBar translucent backgroundColor={gray} style="auto" />
                 {/!*<Decks />*!/}
                 {/!*<DeckItem title={decks[2].title} cardCount={countCards(decks[2])}/>*!/}
                 {
                     mounted &&
                     (
                         questionStem === undefined ?
                         <View >
                             <Text >
                                 Finished
                             </Text>
                         </View> : <Quiz
                         title={decks[deckIndex].title}
                         cardCount={countCards(decks[deckIndex])}
                         cardNum={questionStem.index + 1}
                         questionStem={questionStem.question}
                         onAnswered={() => onAnswered()}
                     />)
                 }
             </View>
         );
     }*/
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
