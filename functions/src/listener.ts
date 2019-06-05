import { Request, Response } from 'firebase-functions';
import { firestore } from 'firebase-admin';

/**
 * The data that arduino devices generate
 */
interface Data {
  id: string;
  timestamp: number;
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
  if (!req.body.id || !req.body.timestamp || !req.body.value) {
    res.sendStatus(400);
    return;
  }
  const data: Data = {
    id: req.body.id,
    timestamp: req.body.timestamp,
    value: req.body.value
  };
  await firestore()
    .collection('data')
    .add(data)
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
};
