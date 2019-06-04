import * as functions from 'firebase-functions';
import * as dataReceiverApp from './data-receiver/app';

export const dataReceiver = functions.https.onRequest(dataReceiverApp.app);
