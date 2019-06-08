import { EventContext } from 'firebase-functions';

export const handler = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: EventContext
): Promise<string> => {
  const report = snapshot.data();
  console.log(`Sending report to ${report!.to}`);
  // throw Error('Some Error');
  return 'Done';
};
