import { Request, Response } from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

/**
 * The data that arduino devices generate
 */
interface Data {
  id: string;
  timestamp: admin.firestore.Timestamp;
  value: number;
}

/**
 * ### Reuest handler: [POST] /api/data
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
export const handler = async (req: Request, res: Response): Promise<void> => {
  console.debug({
    headers: {
      'Content-Type': req.headers['content-type'],
      Authorization: req.headers.authorization ? '***' : ''
    },
    body: req.body
  });
  if (req.method !== 'POST') {
    res.sendStatus(405);
    return;
  }
  if (
    !req.body.id ||
    !req.body.timestamp ||
    !req.body.value ||
    isNaN(req.body.timestamp) ||
    isNaN(req.body.value)
  ) {
    res.sendStatus(400);
    return;
  }
  const data: Data = {
    id: req.body.id,
    timestamp: admin.firestore.Timestamp.fromMillis(
      parseInt(req.body.timestamp)
    ),
    value: parseInt(req.body.value)
  };
  await admin
    .firestore()
    .collection('data')
    .add(data)
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
};
