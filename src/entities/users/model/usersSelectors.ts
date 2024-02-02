export const getTotalCount = (state: RootState) => state.usersPage.totalCount;

export const getCurrentPage = (state: RootState) => state.usersPage.currentPage;

export const getFollowingInProgress = (state: RootState) =>
  state.usersPage.followingInProgress;

export const getUsersState = (state: RootState) => state.usersPage;
