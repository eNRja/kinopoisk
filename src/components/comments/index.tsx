import React from "react";
import styles from "./Comments.module.css";
import { fetchReview } from "../../services/api/movieAPI";
import { RootState, useDispatch, useSelector } from "../../services/store";

export const Comments = ({ comments }: any) => {
  const { film, loaderReview } = useSelector((state: RootState) => state.movie);
  const dispatch = useDispatch();
  const loadMoreComments = () => {
    dispatch(fetchReview({ id: film.id, page: comments.page + 1 }));
  };

  if (!comments) return null;
  return (
    <>
      <h3 className={styles.CommentsHeader}>Отзывы зрителей:</h3>
      <div className={styles.CommentsContainer}>
        <div className={styles.Author}>
          {comments.docs.map((author: any, index: number) => (
            <div key={index} className={styles.Author}>
              <h3>{author.author}</h3>
              <p>{author.title}</p>
              <p>{author.review}</p>
            </div>
          ))}
          {comments.pages !== comments.page && (
            <button
              className={styles.CommentsButton}
              onClick={loadMoreComments}
            >
              {loaderReview ? "Загрузка..." : "ещё"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};
