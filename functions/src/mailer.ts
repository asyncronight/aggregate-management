import { EventContext } from 'firebase-functions';

export const handler = (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: EventContext
) => {
  const report = snapshot.data();
  console.debug(`Sending report to ${report!.to}`);
};
