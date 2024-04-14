import React from "react";
import styles from "./MovieCard.module.css";
import { Link } from "react-router-dom";
import { RootState, useSelector } from "../../services/store";

export const MovieCard = ({ movie, index }: { movie: any; index: number }) => {
  const { currentPage } = useSelector((state: RootState) => state.movie);
  const currentPageForIndex = (currentPage - 1) * 10;

  return (
    <div className={styles.MovieCard}>
      <h3 className={styles.MovieCardIndex}>
        {currentPageForIndex + index + 1}
      </h3>
      <img src={movie.poster.url} className={styles.MovieImg} alt="logo" />

      <div>
        <h2 className={styles.MovieCardName}>{movie.name}</h2>
        <div className={styles.MovieCardDescription}>
          {movie.alternativeName && <p>{movie.alternativeName},</p>}
          <p>{movie.year},</p>
          <p>{movie.movieLength} мин.</p>
        </div>
        <div className={styles.MovieCardDescription}>
          {movie.countries.map((country: any, index: number) => (
            <p key={index}>{country.name}</p>
          ))}
          {movie.genres[0] && <p> &#183; {movie.genres[0].name}</p>}
          <p>{movie.ageRating}+</p>
        </div>
      </div>
      <div className={styles.MovieCardRaiting}>
        <p>Рейтинг:</p>
        <p>{movie.rating.imdb}</p>
      </div>
      <Link className={styles.MovieCardLink} to={`/movies/${movie.id}`}>
        Описание
      </Link>
    </div>
  );
};
