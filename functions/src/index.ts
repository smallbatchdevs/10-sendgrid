// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

import { helloWorld }       from './http';
import { sendEmail } from './email';
export { helloWorld, sendEmail };
