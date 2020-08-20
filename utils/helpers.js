import {DATA} from "./DATA";

export function getDemoDecks() {
    return getDecksData();
}

function getDecksData() {
    return DATA;
}

export function getDeck(title) {
    return getDecksData()[title];
}