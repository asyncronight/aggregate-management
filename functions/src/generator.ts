import { EventContext } from 'firebase-functions';
// import * as admin from 'firebase-admin';
import { Report } from './models';

export const handler = async (context: EventContext): Promise<string> => {
  const reports: Report[] = [];
  console.log(
    `${reports.length} report${reports.length === 1 ? '' : 's'} genarated.`
  );
  // throw Error('Some Error');
  return 'Done';
};
