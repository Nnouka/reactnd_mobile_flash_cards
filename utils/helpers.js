import {DATA} from "./DATA";

export function getDemoDecks() {
    const data = getDecksData();
    const keys = Object.keys(data);
    return keys.map(key => data[key]);
}

function getDecksData() {
    return DATA;
}