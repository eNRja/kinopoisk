import React from "react";
import { fetchMovie } from "../../services/api/movieAPI";
import { RootState, useDispatch, useSelector } from "../../services/store";
import styles from "./Pagination.module.css";

export const Pagination = () => {
  const dispatch = useDispatch();
  const { currentPage, totalPages, formData } = useSelector(
    (state: RootState) => state.movie
  );

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      dispatch(
        fetchMovie({
          page: currentPage - 1,
          formData: formData,
        })
      );
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(
        fetchMovie({
          page: currentPage + 1,
          formData: formData,
        })
      );
    }
  };

  return (
    <div className={styles.Pagination}>
      <button
        className={styles.PaginationButton}
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
      >
        Назад
      </button>
      <span>
        Страница {currentPage} из {totalPages}
      </span>
      <button
        className={styles.PaginationButton}
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
      >
        Вперёд
      </button>
    </div>
  );
};
