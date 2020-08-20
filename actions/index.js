export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK_TITLE = 'ADD_DECK_TITLE';
export const NEW_DECK = 'NEW_DECK';
export const NEW_CARD = 'NEW_CARD';

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function addDeckTitle(title) {
    return {
        type: ADD_DECK_TITLE,
        title
    }
}

export function newDeck(title) {
    return {
        type: NEW_DECK,
        title
    }
}

export function newCard(title, {question, answer}) {
    return {
        type: NEW_CARD,
        title,
        question,
        answer
    }
}