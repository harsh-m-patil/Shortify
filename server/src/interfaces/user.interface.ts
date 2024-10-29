export interface IUser {
  _id?: string;
  email: string;
  username: string;
  password: string;
  passwordConfirm: string | undefined;
}
