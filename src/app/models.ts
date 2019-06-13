import { firestore } from 'firebase/app';

export interface Client {
  id?: string;
  name: string;
  description: string;
  emails: { email: string; active: boolean }[];
  apiKey: { prefix: string; time: firestore.Timestamp; hash: number };
}

export interface Group {
  id?: string;
  name: string;
}

export class Truck {
  id?: string;
  name: string;
  type: string;
}
