import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/messaging';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

console.log('ENV = ', process.env.NODE_ENV)

class Firebase {
  constructor() {
    app.initializeApp(config);

    /* Helper */
    this.serverValue = app.database.ServerValue;

    this.auth = app.auth();
    this.db = app.database();
    // this.messaging = app.messaging();
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = [];
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        console.log('fallback')
        fallback();
      }
    });

  // *** User API ***
  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Message API ***

  message = uid => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref('messages');

  // *** Push notifications ***
  // initializePushNotifications = () => {
  //   // const messaging = firebase.messaging();
  //   this.messaging
  //     .requestPermission()
  //     .then(() => {
  //       console.log("Have Permission");
  //       return this.messaging.getToken();
  //     })
  //     .then(token => {
  //       console.log("FCM Token:", token);
  //       //you probably want to send your new found FCM token to the
  //       //application server so that they can send any push
  //       //notification to you.
  //     })
  //     .catch(error => {
  //       if (error.code === "messaging/permission-blocked") {
  //         console.log("Please Unblock Notification Request Manually");
  //       } else {
  //         console.log("Error Occurred", error);
  //       }
  //     });

    // this.messaging.onMessage(function (payload) {
    //   console.log('onMessage', payload)
    // })

    // this.messaging.setBackgroundMessageHandler(function (payload) {
    //   const title = 'de title';
    //   const options = {
    //     body: payload.data.status
    //   }
    //   return self.registration.showNotification(title, options);
    // })
  // }
}

export default Firebase;
