import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Decks from "./components/Decks";
import {gray} from "./utils/colors";
import DeckItem from "./components/DeckItem";
import {getDemoDecks} from "./utils/helpers";

export default function App() {
    const decks = getDemoDecks();
    const countCards = (deck) => deck.questions !== undefined ? deck.questions.length : 0;
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={gray} style="auto" />
      {/*<Decks />*/}
      <DeckItem title={decks[2].title} cardCount={countCards(decks[2])}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    justifyContent: 'center',
  },
});
