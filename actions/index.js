export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK_TITLE = 'ADD_DECK_TITLE';

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