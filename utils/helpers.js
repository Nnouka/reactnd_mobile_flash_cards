import {DATA} from "./DATA";
import {AsyncStorage} from "react-native";
const NOTIFICATION_KEY = 'UdaciCards:notifications';
const DECKS_KEY = 'UdaciCards:decks';
export function getDemoDecks() {
    return getDecksData();
}

export function getDecksData() {
    return AsyncStorage.getItem(DECKS_KEY)
        .then(JSON.parse)
}

export function getDeck(title) {
    return getDecksData()[title];
}

export function initDecks() {
    AsyncStorage.getItem(DECKS_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data == null) {
                AsyncStorage.setItem(DECKS_KEY, JSON.stringify(DATA))
            }
        })
}