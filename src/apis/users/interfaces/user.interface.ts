export interface ICreateUser {
  name: string;
  password: string;
  age: number;
  email: string;
}

export interface IUserServicefindOneByEmail {
  email: string;
}
