const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const db = admin.firestore();
const messaging = admin.messaging();

const livingTempRef = db.collection('livingTemp');
const bedroomTempRef = db.collection('bedroomTemp');

module.exports = {
  livingTempRef,
  bedroomTempRef,
  messaging
}