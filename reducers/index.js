import {combineReducers} from 'redux';
import {ADD_DECK_TITLE, NEW_CARD, NEW_DECK, RECEIVE_DECKS} from '../actions';

function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS :
            return {
                ...state,
                ...action.decks
            };
        case NEW_DECK :
            return {
                ...state,
                [action.title]: {
                    title: action.title,
                    questions: []
                }
            };
        case NEW_CARD :
            return {
                ...state,
                [action.title]: {
                   ...state[action.title],
                    questions: state[action.title].questions.concat([{
                        question: action.question,
                        answer: action.answer
                    }])
                }
            }
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