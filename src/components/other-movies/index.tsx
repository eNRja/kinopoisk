import React, { useRef } from "react";
import styles from "./OtherMovies.module.css";
import { Link } from "react-router-dom";

export const OtherMovies = ({ otherMovies }: any) => {
  const postersRef = useRef<HTMLDivElement>(null);

  const handleWheelScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    if (postersRef.current) {
      event.preventDefault();
      event.stopPropagation();
      postersRef.current.scrollLeft += event.deltaY;
    }
  };

  if (!otherMovies)
    return (
      <div className={styles.OtherMovies}>нет информации о похожих фильмах</div>
    );

  return (
    <>
      <h3 className={styles.OtherMoviesHead}>Может заинтересовать:</h3>
      <div
        className={styles.OtherMovies}
        ref={postersRef}
        onWheel={handleWheelScroll}
      >
        {otherMovies.map((movie: any, index: number) => (
          <Link
            key={index}
            className={styles.OtherMovie}
            to={`/movies/${movie.id}`}
          >
            <img
              src={movie.poster.previewUrl}
              alt={movie.name}
              className={styles.OtherMovieImg}
            />
            <p>{movie.name}</p>
          </Link>
        ))}
      </div>
    </>
  );
};
