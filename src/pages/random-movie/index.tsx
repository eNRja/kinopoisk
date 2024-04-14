import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Typography,
} from "@mui/material";
import { contentType, countries, genres, ratings } from "../../utils/constants";
import styles from "./RandomMovie.module.css";
import { fetchRandomMovie } from "../../services/api/movieAPI";
import { RootState, useDispatch, useSelector } from "../../services/store";
import { falseRandomMovie } from "../../services/reducers/movieReducer";
import { useNavigate } from "react-router-dom";

export const RandomMovie = () => {
  const [genre, setGenre] = useState("");
  const [country, setCountry] = useState("");
  const [contentTypeValue, setContentTypeValue] = useState("");
  const [rating, setRating] = useState("");
  const [yearRange, setYearRange] = useState<number[]>([1920, 2024]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { randomMovie } = useSelector((state: RootState) => state.movie);
  const { film } = useSelector((state: RootState) => state.movie);

  const handleYearRangeChange = (event: Event, newValue: number | number[]) => {
    setYearRange(newValue as number[]);
  };

  const handleSearchRandomMovie = () => {
    const searchData = {
      genre,
      country,
      contentType: contentTypeValue,
      rating,
      yearRange,
    };
    dispatch(fetchRandomMovie(searchData));
  };

  const handleReset = () => {
    dispatch(falseRandomMovie());
  };

  useEffect(() => {
    if (randomMovie && film && film.id) {
      navigate(`/movies/${film.id}`);
      dispatch(falseRandomMovie());
    }
  }, [randomMovie]);

  if (randomMovie && !film)
    return (
      <button onClick={handleReset} className={styles.RandomMovieContainer}>
        неудачно, вернемся назад?
      </button>
    );
  return (
    <div className={styles.RandomMovieContainer}>
      <div className={styles.RandomMovie}>
        <FormControl className={styles.RandomMovieFormControl}>
          <InputLabel id="genre-label">Выберите жанр</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={genre}
            onChange={(e) => setGenre(e.target.value as string)}
          >
            {genres.map((genre: any) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={styles.RandomMovieFormControl}>
          <InputLabel id="country-label">Выберите страну</InputLabel>
          <Select
            labelId="country-label"
            id="country-select"
            value={country}
            onChange={(e) => setCountry(e.target.value as string)}
          >
            {countries.map((country: any) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={styles.RandomMovieFormControl}>
          <InputLabel id="content-label">Выберите тип контента</InputLabel>
          <Select
            labelId="content-label"
            id="content-select"
            value={contentTypeValue}
            onChange={(e) => setContentTypeValue(e.target.value as string)}
          >
            {contentType.map((type: any) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={styles.RandomMovieFormControl}>
          <InputLabel id="rating-label">Выберите рейтинг</InputLabel>
          <Select
            labelId="rating-label"
            id="rating-select"
            value={rating}
            onChange={(e) => setRating(e.target.value as string)}
          >
            {ratings.map((rating) => (
              <MenuItem key={rating} value={rating}>
                {rating}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <FormControl>
        <Typography id="year-range-label" gutterBottom>
          Выберите год
        </Typography>
        <Slider
          value={yearRange}
          onChange={handleYearRangeChange}
          valueLabelDisplay="auto"
          aria-labelledby="year-range-label"
          min={1920}
          max={2024}
          step={1}
        />
      </FormControl>
      <Button
        variant="contained"
        onClick={handleSearchRandomMovie}
        className={styles.RandomMovieButton}
      >
        Случайный фильм
      </Button>
    </div>
  );
};
