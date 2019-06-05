import { https } from 'firebase-functions';
import { handler } from './listener';

export const listener = https.onRequest(handler);
