import PushNotification from 'react-native-push-notification';
import {Platform} from "react-native";

export default class NotificationService {
	
	//onNotificaitn is a function passed in that is to be called when a
	//notification is to be emitted.
  constructor(onNotification) {
    this.configure(onNotification);
    this.lastId = 0;
    PushNotification.getChannels(
    )
  }

  configure(onNotification) {
    PushNotification.configure({
      onNotification: onNotification,
      requestPermissions: false,

      popInitialNotification: true,
    });
  }

	//Appears right away 
  localNotification(details) {
    this.lastId++;
    PushNotification.localNotification(details);
  }

	//Appears after a specified time. App does not have to be open.
  scheduleNotification(details) {
    this.lastId++;
    PushNotification.localNotificationSchedule(details);
  }

  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk);
  }

  cancelNotification(id) {
    PushNotification.cancelLocalNotifications({id: id});
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }
}