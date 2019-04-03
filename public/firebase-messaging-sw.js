// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
// importScripts('/__/firebase/init.js');

const config = {
  messagingSenderId: "145084180701"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log('firebase-messaging-sw payload:', payload)
  const title = 'de title';
  const options = {
    body: payload.data.status
  }
  console.log(self)
  return self.registration.showNotification(title, options);
})
