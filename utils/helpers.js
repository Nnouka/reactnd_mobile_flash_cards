import {DATA} from "./DATA";
import {AsyncStorage} from "react-native";
import {request,
    PERMISSIONS,
    checkNotifications,
    requestNotifications,
    PermissionStatus} from "react-native-permissions";

import NotificationService from "./NotificationService";
const NOTIFICATION_KEY = 'UdaciCards:notifications';
const DECKS_KEY = 'UdaciCards:decks';
const GRANTED = 'granted';
const DENIED = 'denied';
const UNDETERMINED = 'undetermined';
const notification = new NotificationService(() => console.log("Notified"));
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

function createNotification(date) {
    return {
        title: 'Take a Quiz',
        message: "👋 don't forget to take one quize for today!",
        playSound: true,
        soundName: 'default',
        date: date
    }
}
function notifyAndSetLocation() {
    console.log("Notifications", "Granted")
    let tomorrow = new Date(Date.now());
    // tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setSeconds(tomorrow.getSeconds() + 10);
    /*tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(20);
    tomorrow.setMinutes(0);*/
    /*Notifications.postLocalNotification(
        createNotification({
            time: tomorrow,
            repeat: 'day'
        }),
        NOTIFICATION_KEY
    );*/


    notification.scheduleNotification(createNotification(tomorrow));
    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
}
export function setLocalNotification() {
    console.log("Notifications", "Set Local Notifications called")
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if(data === null) {
                checkNotifications()
                    .then(({status, settings}) => {
                        console.log("Notifications Status", status)
                        if(status === GRANTED) {
                            notifyAndSetLocation()
                        }
                        else if(status === UNDETERMINED) {
                            // request for permission
                            requestNotifications(['alert', 'sound']).then(({status, settings}) => {
                                if(status === GRANTED) {
                                    notifyAndSetLocation()
                                }
                            })
                        }
                    })
            }
        })
}