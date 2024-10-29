import type { IUser } from "./user.interface";

export interface IUrl {
  _id?: string;
  orignalURL: string;
  shortenedURL: string;
  visits: visit[];
  user: IUser;
}

export interface visit {
  timestamp: number;
}
