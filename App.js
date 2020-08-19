import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Decks from "./components/Decks";
import {gray} from "./utils/colors";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={gray} style="auto" />
      <Decks />
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
