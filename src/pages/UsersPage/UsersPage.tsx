import React, { useEffect } from "react";

import { ErrorAlert, Loader, Pagination } from "shared/ui";
import { useStoreDispatch, useStoreSelector } from "shared/lib/utils";
import {
  PAGE_SIZE,
  getTotalCount,
  getUsers,
  getUsersState,
  setCurrentPage,
} from "entities/users";
import { UserCard } from "widgets";

const UsersPage = () => {
  const dispatch = useStoreDispatch();
  const {
    users,
    currentPage,
    error: usersError,
  } = useStoreSelector(getUsersState);
  const totalCount = useStoreSelector(getTotalCount);

  useEffect(() => {
    dispatch(getUsers({ currentPage, pageSize: PAGE_SIZE }));
  }, [dispatch, currentPage]);

  return (
    <>
      {!users.length ? (
        <Loader />
      ) : (
        <>
          {usersError && <ErrorAlert message={usersError} />}
          <Pagination
            count={PAGE_SIZE}
            totalCount={totalCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          {users.map((user) => (
            <UserCard key={user.id} {...user} />
          ))}
        </>
      )}
    </>
  );
};

export default UsersPage;
