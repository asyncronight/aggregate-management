import { Request, Response } from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Data } from './models';

/**
 * Calculate the hash of the API key
 * @param key The api key
 */
const hash = (key: string): number => {
  return key
    .split('')
    .reduce(
      (prevHash, currVal) =>
        ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
      0
    );
};

/**
 * Validate the api key against the key associated with
 * the client to whom this truck belongs
 * @param key The api key
 * @param idTruck The truck/device id
 */
const isValide = async (key: string, idTruck: string): Promise<boolean> => {
  try {
    const trucks = await admin
      .firestore()
      .collectionGroup('trucks')
      .where('id', '==', idTruck)
      .get();
    if (trucks.size !== 1) {
      return false;
    }
    const client = (await trucks.docs[0].ref.parent.parent!.parent.parent!.get()).data();
    return client!.apiKey.hash === hash(key);
  } catch (_) {
    return false;
  }
};

export const handler = async (req: Request, res: Response) => {
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
  const auth = req.headers.authorization;
  if (!auth || !req.body.id || !(await isValide(auth, req.body.id))) {
    res.sendStatus(401);
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
