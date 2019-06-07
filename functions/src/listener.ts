import { Request, Response } from 'firebase-functions';
import * as admin from 'firebase-admin';

/**
 * The data that arduino devices generate
 */
interface Data {
  id: string;
  timestamp: admin.firestore.Timestamp;
  value: number;
}

export const handler = (req: Request, res: Response) => {
  console.debug({
    headers: {
      'Content-Type': req.headers['content-type'],
      Authorization: !!req.headers.authorization
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
  admin
    .firestore()
    .collection('data')
    .add(data)
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
};
