export type Nullable<T> = null | T;

export enum RESPONSE_STATUS {
  SUCCESS = "success",
  FAILURE = "fail",
}

export interface User {
  name: string;
  id: number;
  photos: {
    small: Nullable<string>;
    large: Nullable<string>;
  };
  location?: {
    country: Nullable<string>;
    city: Nullable<string>;
  };
  status: Nullable<string>;
  followed: boolean;
}

export interface UsersResponse {
  items: User[];
  totalCount: number;
  error: Nullable<string>;
}
