import {combineReducers} from 'redux';
import {ADD_DECK_TITLE, RECEIVE_DECKS} from '../actions';

function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS :
            return {
                ...state,
                ...action.decks
            };
        default :
            return state;
    }
}

function title(state = null, action) {
    switch (action.type) {
        case ADD_DECK_TITLE :
            return action.title;
        default :
            return state;
    }
}

export default combineReducers({
    decks,
    title
});