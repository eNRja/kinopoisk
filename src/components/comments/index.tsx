import React from "react";
import styles from "./Comments.module.css";
import { fetchReview } from "../../services/api/movieAPI";
import { useDispatch } from "../../services/store";

export const Comments = ({ comments }: any) => {
  const dispatch = useDispatch();
  const loadMoreComments = () => {
    dispatch(
      fetchReview({ id: comments.docs[0].movieId, page: comments.page + 1 })
    );
  };
console.log(comments)
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
              ещё
            </button>
          )}
        </div>
      </div>
    </>
  );
};
