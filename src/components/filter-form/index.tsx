import React, { useState, FC, ChangeEvent } from "react";
import styles from "./FilterForm.module.css";
import { CountButton } from "../../shared/ui/count-button";
import { validateInput } from "../../utils/validation";

interface FilterFormProps {
  onSubmit: (filters: {
    year: string;
    country: string;
    ageRatingFrom: string;
    ageRatingTo: string;
    displayedMovies: number;
  }) => void;
}

export const FilterForm: FC<FilterFormProps> = ({ onSubmit }) => {
  const [filters, setFilters] = useState({
    year: "",
    country: "",
    ageRatingFrom: "",
    ageRatingTo: "",
  });
  const [displayedMovies, setDisplayedMovies] = useState(10);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (validateInput(name, value, filters)) {
      setFilters({ ...filters, [name]: value });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ ...filters, displayedMovies });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.FilterForm}>
      <div className={styles.FilterFormCounter}>
        <p>Выберите количество отображаемых фильмов:</p>
        <CountButton
          displayedMovies={displayedMovies}
          value={10}
          onClick={() => {
            setDisplayedMovies(10);
          }}
        />
        <CountButton
          displayedMovies={displayedMovies}
          value={20}
          onClick={() => {
            setDisplayedMovies(20);
          }}
        />
        <CountButton
          displayedMovies={displayedMovies}
          value={50}
          onClick={() => {
            setDisplayedMovies(50);
          }}
        />
        <CountButton
          displayedMovies={displayedMovies}
          value={100}
          onClick={() => {
            setDisplayedMovies(100);
          }}
        />
      </div>
      <h4>Фильтры</h4>
      <div className={styles.FilterInput}>
        <label>Год:</label>
        <input
          type="text"
          name="year"
          value={filters.year}
          onChange={handleChange}
        />
      </div>
      <div className={styles.FilterInput}>
        <label>Страна:</label>
        <input
          type="text"
          name="country"
          value={filters.country}
          onChange={handleChange}
        />
      </div>
      <div className={styles.FilterInput}>
        <span>Возрастной рейтинг:</span>
        <label className={styles.FilterInputLabel}>от</label>
        <input
          className={styles.FilterInputSmall}
          type="text"
          name="ageRatingFrom"
          value={filters.ageRatingFrom}
          onChange={handleChange}
        />
        <label className={styles.FilterInputLabel}>до</label>
        <input
          className={styles.FilterInputSmall}
          type="text"
          name="ageRatingTo"
          value={filters.ageRatingTo}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className={styles.FilterSubmitButton}>
        Применить
      </button>
    </form>
  );
};
