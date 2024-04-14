// Searcher.tsx

import React, { FormEvent, useState, useEffect } from "react";
import styles from "./Searcher.module.css";
import { fetchSearchMovie } from "../../services/api/movieAPI";
import { RootState, useDispatch, useSelector } from "../../services/store";
import { useNavigate } from "react-router-dom"; // Импортируем действие
import { updateSearchTerm } from "../../services/reducers/movieReducer";

export const Searcher = () => {
  const [film, setFilm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formData } = useSelector((state: RootState) => state.movie);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilm(e.target.value);
    dispatch(updateSearchTerm(e.target.value));
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(fetchSearchMovie({ formData, query: film.trim() }));
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [film, dispatch, formData, navigate]);

  return (
    <form className={styles.Searcher}>
      <label>В поисках фильма?</label>
      <input
        type="text"
        name="film"
        value={film}
        onChange={handleInputChange}
      />
    </form>
  );
};
