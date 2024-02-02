import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

import { useStoreDispatch } from "shared/lib/utils";

import s from "./Pagination.module.scss";

interface PaginationProps {
  count: number;
  totalCount: number;
  currentPage: number;
  setCurrentPage: ActionCreatorWithPayload<number, string>;
  className?: string;
  maxPagesCount?: number;
}

const Pagination: FC<PaginationProps> = ({
  count,
  totalCount,
  currentPage,
  setCurrentPage,
  className,
  maxPagesCount: portionSize = 10,
}) => {
  const dispatch = useStoreDispatch();

  const pagesTotalCount = Math.ceil(totalCount / count);
  let pages = [];
  for (let i = 1; i <= pagesTotalCount; i++) {
    pages.push(i);
  }
  const pagesPortionCount = useMemo(
    () => Math.ceil(pagesTotalCount / portionSize),
    [pagesTotalCount, portionSize]
  );

  const [portionNumber, setPortionNumber] = useState<number>(1);

  const leftPortionPageNumber = useMemo(
    () => (portionNumber - 1) * portionSize + 1,
    [portionNumber, portionSize]
  );
  const rightPortionPageNumber = useMemo(
    () => portionNumber * portionSize,
    [portionNumber, portionSize]
  );

  const changeCurrentPage = useCallback(
    (newPage: number) => {
      dispatch(setCurrentPage(newPage));
    },
    [dispatch, setCurrentPage]
  );

  useEffect(() => {
    changeCurrentPage(leftPortionPageNumber);
  }, [leftPortionPageNumber, changeCurrentPage]);

  const onClickBack = useCallback(() => {
    setPortionNumber(portionNumber - 1);
  }, [portionNumber]);

  const onClickNext = useCallback(() => {
    setPortionNumber(portionNumber + 1);
  }, [portionNumber]);

  return (
    <div className={s.Pagination}>
      {portionNumber > 1 && (
        <button
          onClick={onClickBack}
          className={classNames(s.Pagination__Button, s.Pagination__ButtonBack)}
        />
      )}
      {pages
        .filter(
          (page) =>
            page >= leftPortionPageNumber && page <= rightPortionPageNumber
        )
        .map((pageItem) => (
          <span
            key={pageItem}
            className={classNames(s.Pagination__PageItem, className, {
              [s.Pagination__PageItemActive]: currentPage === pageItem,
            })}
            onClick={() => changeCurrentPage(pageItem)}
          >
            {pageItem}
          </span>
        ))}
      {portionNumber < pagesPortionCount && (
        <button
          onClick={onClickNext}
          className={classNames(s.Pagination__Button, s.Pagination__ButtonNext)}
        />
      )}
    </div>
  );
};

export default Pagination;
