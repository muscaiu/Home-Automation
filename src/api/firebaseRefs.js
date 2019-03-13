const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const db = admin.firestore();

const livingTempRef = db.collection('livingTemp');

module.exports = {
  livingTempRef
}