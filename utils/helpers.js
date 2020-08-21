import {DATA} from "./DATA";
import {AsyncStorage} from "react-native";
import {request,
    PERMISSIONS,
    checkNotifications,
    requestNotifications,
    PermissionStatus} from "react-native-permissions";

import NotificationService from "./NotificationService";
const NOTIFICATION_KEY = 'UdaciCards:notifications';
const WELCOME_NOTIFICATION_KEY = 'UdaciCards:notifications.welcome'
const DECKS_KEY = 'UdaciCards:decks';
const GRANTED = 'granted';
const DENIED = 'denied';
const UNDETERMINED = 'undetermined';
const notification = new NotificationService(() => console.log("Notified"));

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

export function saveDeckTitle(title) {
    AsyncStorage.getItem(DECKS_KEY)
        .then(JSON.parse)
        .then((state) => {
            AsyncStorage.setItem(DECKS_KEY, JSON.stringify(
                {
                    ...state,
                    [title]: {
                        title,
                        questions: []
                    }
                }
            ))
        })
}

export function addCardToDeck(title, card) {
    AsyncStorage.getItem(DECKS_KEY)
        .then(JSON.parse)
        .then((state) => {
            AsyncStorage.setItem(DECKS_KEY, JSON.stringify(
                {
                    ...state,
                    [title]: {
                        ...state[title],
                        questions: state[title].questions.concat([{
                            question: card.question,
                            answer: card.answer
                        }])
                    }
                }
            ))
        })
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(notification.cancelAll)
}

function createQuizNotification(date) {
    return {
        title: 'Take a Quiz',
        message: "👋 don't forget to take one quiz for today!",
        playSound: true,
        soundName: 'default',
        date: date
    }
}
function createWelcomeNotification() {
    return {
        title: '😍 Welcome On Board',
        message: "👋 don't forget to take one quiz for today! We Plan to notify you daily, starting tomorrow.",
        playSound: true,
        soundName: 'default',
        id: '-1'
    }
}
function notifyAndSetLocation() {
    let tomorrow = new Date(Date.now()); // change this time to see notifications
    // in action when a quiz is finished
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(20); // set to 8pm
    tomorrow.setMinutes(0);

    notification.scheduleNotification(createQuizNotification(tomorrow));
    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
}
export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if(data === null) {
                checkNotifications()
                    .then(({status, settings}) => {
                        if(status === GRANTED) {
                            notifyAndSetLocation();
                        }
                        else if(status === UNDETERMINED) {
                            // request for permission
                            requestNotifications(['alert', 'sound']).then(({status, settings}) => {
                                if(status === GRANTED) {
                                    notifyAndSetLocation();
                                }
                            })
                        }
                    })
            }
        })
}

export function setWelcomeNotification() {
    AsyncStorage.getItem(WELCOME_NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if(data === null) {
                checkNotifications()
                    .then(({status, settings}) => {
                        if(status === GRANTED) {
                            notification.localNotification(createWelcomeNotification());
                            AsyncStorage.setItem(WELCOME_NOTIFICATION_KEY, JSON.stringify(true))
                        }
                        else if(status === UNDETERMINED) {
                            // request for permission
                            requestNotifications(['alert', 'sound']).then(({status, settings}) => {
                                if(status === GRANTED) {
                                    notification.localNotification(createWelcomeNotification());
                                    AsyncStorage.setItem(WELCOME_NOTIFICATION_KEY, JSON.stringify(true));
                                }
                            })
                        }
                    })
            }
        })
}