export interface Client {
  id?: string;
  name: string;
  description: string;
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
