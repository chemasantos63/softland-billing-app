export class User {
  id: number;
  email: string;
  username: string;
  costCenter: string;
  warehouse?: string;
  sequence?: string;
  roles: any[];
  iat: number;
  exp: number;
  token: string;
}
