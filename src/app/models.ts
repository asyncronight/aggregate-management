export interface Client {
  id?: string;
  name: string;
  description: string;
}

export interface Group {
  id?: string;
  clientId: string;
  name: string;
}