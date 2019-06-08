import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

import { handler as dataHandler } from './listener';
import { handler as generatorHandler } from './generator';
import { handler as mailerHandler } from './mailer';

/**
 * Request handler: [POST] /api/data
 * Save device-generated data to firestore.
 *
 * Expected headers:
 * - Content-Type: application/json // So that the body got picked up & parsed.
 * - Authorization: [ApiKey] // The api key generated from the web console.
 *
 * Expected json body format: See the {@link Data} interface.
 *
 * Can also accept the same data submitted using url-encoded form data with key/value pairs
 */
export const listener = functions.https.onRequest(dataHandler);

/**
 * Generate a daily report and save it to firestore
 */
export const generator = functions.pubsub
  .schedule('0 0 * * *')
  .timeZone('UTC')
  .onRun(generatorHandler);

/**
 * Send generated reports through email
 */
export const mailer = functions.firestore
  .document('reports/{id}')
  .onCreate(mailerHandler);
