import React from "react";
import { useEffect } from "react";
import { fetchMovie } from "../../services/api/movieAPI";
import { Stack } from "react-bootstrap";
import { RootState, useDispatch, useSelector } from "../../services/store";
import { MovieCard } from "../../components/MovieCard";
import { Pagination } from "../../components/pagination";
import styles from "./Movies.module.css";

export const Movies = () => {
  const dispatch = useDispatch();
  const { data, loading, error, currentPage, formData } = useSelector(
    (state: RootState) => state.movie
  );

  useEffect(() => {
    dispatch(
      fetchMovie({
        page: currentPage,
        formData: formData,
      })
    );
  }, [dispatch]);

  if (loading) return <div className={styles.Loader}>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (data && data.length === 0)
    return (
      <div className={styles.Movies}>
        По Вашему запросу не нашлось фильмов..
      </div>
    );

  return (
    <div className={styles.Movies}>
      {data && (
        <Stack gap={10}>
          {data.map((movie: any, index: number) => (
            <MovieCard movie={movie} index={index} key={movie.id} />
          ))}
        </Stack>
      )}
      <Pagination />
    </div>
  );
};
