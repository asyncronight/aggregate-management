import { EventContext } from 'firebase-functions';
// import * as admin from 'firebase-admin';
import { Report } from './models';

export const handler = (context: EventContext) => {
  const reports: Report[] = [];
  console.debug(
    `${reports.length} report${reports.length === 1 ? '' : 's'} genarated.`
  );
};
