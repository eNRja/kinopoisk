import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RootState, useDispatch, useSelector } from "../../services/store";
import styles from "./MovieDetails.module.css";
import {
  fetchDeepInf,
  fetchPosters,
  fetchReview,
} from "../../services/api/movieAPI";
import { Actors } from "../../components/actors";
import { SeasonInfo } from "../../components/season-info";
import { Comments } from "../../components/comments";
import { Posters } from "../../components/posters";
import { OtherMovies } from "../../components/other-movies";

export const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, film, filmReview } = useSelector(
    (state: RootState) => state.movie
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDeepInf(id));
    dispatch(fetchReview({ id }));
    dispatch(fetchPosters({ id }));
  }, [id]);

  if (loading) return <div className={styles.Loader}>Loading...</div>;
  if (!film) return null;

  return (
    <>
      <div className={styles.MovieDetails}>
        <img
          className={styles.MovieDetailsImg}
          src={film.poster.url}
          alt="logo"
        />
        <div>
          <h2>{film.name}</h2>
          <p>Описание: {film.description}</p>
          <p>Рэйтинг: {film.rating.imdb}</p>
        </div>
      </div>
      <Actors actors={film.persons} />
      <SeasonInfo seasons={film.seasonsInfo} />
      <Comments comments={filmReview} />
      <Posters />
      <OtherMovies otherMovies={film.similarMovies} />
    </>
  );
};
