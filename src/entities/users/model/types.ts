import { Nullable, User } from "shared/model/types";

export interface UsersState {
  users: User[];
  totalCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: number[];
  error?: Nullable<string>;
}
