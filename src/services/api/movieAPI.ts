import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";
import {
  fetchMovieStart,
  fetchMovieSuccess,
  fetchMovieFailure,
  fetchDeepInfSuccess,
  fetchReviewSuccess,
  fetchPostersSuccess,
  fetchRandomMovieSuccess,
  loadingReview,
} from "../reducers/movieReducer";

const API_TOKEN = process.env.API_TOKEN;
const API_BASE_URL = "https://api.kinopoisk.dev";

export const fetchMovie = createAsyncThunk(
  "movie/fetchMovie",
  async (
    { page = 1, formData = {} }: { page?: number; formData: any },
    thunkAPI
  ) => {
    try {
      if (!API_BASE_URL) {
        throw new Error("API base URL is not defined");
      }

      // Диспатчим экшен fetchMovieStart перед началом загрузки данных
      thunkAPI.dispatch(fetchMovieStart());

      const config: AxiosRequestConfig = {
        headers: {
          "X-API-KEY": API_TOKEN,
        },
      };

      const APIRatingFrom = formData.ageRatingFrom ? formData.ageRatingFrom : 0;
      const APIRatingTo = formData.ageRatingTo ? formData.ageRatingTo : 18;
      const APIRating = `&ageRating=${APIRatingFrom}-${APIRatingTo}`;

      const APIYear = formData.year ? `&year=${formData.year}` : "";
      const APICountries = formData.country
        ? `&countries.name=${formData.country}`
        : "";
      const APILimit = formData.displayedMovies
        ? `&limit=${formData.displayedMovies}`
        : "";

      const response = await axios.get(
        `${API_BASE_URL}/v1.4/movie?page=${page}${APIYear}${APIRating}${APICountries}${APILimit}`,
        config
      );
      // Диспатчим экшен fetchMovieSuccess с данными в случае успеха
      thunkAPI.dispatch(fetchMovieSuccess(response.data));
    } catch (error: any) {
      // Диспатчим экшен fetchMovieFailure в случае ошибки
      thunkAPI.dispatch(fetchMovieFailure(error.message));
    }
  }
);

export const fetchSearchMovie = createAsyncThunk(
  "movie/fetchMovie",
  async (
    {
      page = 1,
      formData = {},
      query = "",
    }: { page?: number; formData: any; query: string },
    thunkAPI
  ) => {
    try {
      if (!API_BASE_URL) {
        throw new Error("API base URL is not defined");
      }

      // Диспатчим экшен fetchMovieStart перед началом загрузки данных
      thunkAPI.dispatch(fetchMovieStart());

      const config: AxiosRequestConfig = {
        headers: {
          "X-API-KEY": API_TOKEN,
        },
      };

      const APILimit = formData.displayedMovies
        ? `&limit=${formData.displayedMovies}`
        : "";

      const response = await axios.get(
        `${API_BASE_URL}/v1.4/movie/search?page=${page}${APILimit}&query=${query}`,
        config
      );
      // Диспатчим экшен fetchMovieSuccess с данными в случае успеха
      thunkAPI.dispatch(fetchMovieSuccess(response.data));
    } catch (error: any) {
      // Диспатчим экшен fetchMovieFailure в случае ошибки
      thunkAPI.dispatch(fetchMovieFailure(error.message));
    }
  }
);

export const fetchDeepInf = createAsyncThunk(
  "movie/fetchMovie",
  async (id: string | undefined, thunkAPI) => {
    try {
      if (!API_BASE_URL) {
        throw new Error("API base URL is not defined");
      }

      // Диспатчим экшен fetchMovieStart перед началом загрузки данных
      thunkAPI.dispatch(fetchMovieStart());

      const config: AxiosRequestConfig = {
        headers: {
          "X-API-KEY": API_TOKEN,
        },
      };

      const response = await axios.get(
        `${API_BASE_URL}/v1.4/movie/${id}`,
        config
      );
      // Диспатчим экшен fetchDeepInfSuccess с данными в случае успеха
      thunkAPI.dispatch(fetchDeepInfSuccess(response.data));
    } catch (error: any) {
      // Диспатчим экшен fetchMovieFailure в случае ошибки
      thunkAPI.dispatch(fetchMovieFailure(error.message));
    }
  }
);

export const fetchReview = createAsyncThunk(
  "movie/fetchMovie",
  async (
    { id, page = 1 }: { id: string | undefined; page?: number },
    thunkAPI
  ) => {
    try {
      if (!API_BASE_URL) {
        throw new Error("API base URL is not defined");
      }

      // Начало загрузки
      thunkAPI.dispatch(loadingReview(true));

      const config: AxiosRequestConfig = {
        headers: {
          "X-API-KEY": API_TOKEN,
        },
      };

      const response = await axios.get(
        `${API_BASE_URL}/v1.4/review?movieId=${id}&page=${page}`,
        config
      );
      // Диспатчим экшен fetchReviewSuccess с данными в случае успеха
      thunkAPI.dispatch(fetchReviewSuccess(response.data));
      thunkAPI.dispatch(loadingReview(false));
    } catch (error: any) {
      // Диспатчим экшен fetchMovieFailure в случае ошибки
      thunkAPI.dispatch(fetchMovieFailure(error.message));
      thunkAPI.dispatch(loadingReview(false));
    }
  }
);

export const fetchPosters = createAsyncThunk(
  "movie/fetchMovie",
  async (
    { id, page = 1 }: { id: string | undefined; page?: number },
    thunkAPI
  ) => {
    try {
      if (!API_BASE_URL) {
        throw new Error("API base URL is not defined");
      }

      const config: AxiosRequestConfig = {
        headers: {
          "X-API-KEY": API_TOKEN,
        },
      };

      const response = await axios.get(
        `${API_BASE_URL}/v1.4/image?movieId=${id}&page=${page}`,
        config
      );
      // Диспатчим экшен fetchPostersSuccess с данными в случае успеха
      thunkAPI.dispatch(fetchPostersSuccess(response.data));
    } catch (error: any) {
      // Диспатчим экшен fetchMovieFailure в случае ошибки
      thunkAPI.dispatch(fetchMovieFailure(error.message));
    }
  }
);

export const fetchRandomMovie = createAsyncThunk(
  "movie/fetchMovie",
  async (searchData: any, thunkAPI) => {
    try {
      if (!API_BASE_URL) {
        throw new Error("API base URL is not defined");
      }

      const config: AxiosRequestConfig = {
        headers: {
          "X-API-KEY": API_TOKEN,
        },
      };

      const APICountry = searchData.country
        ? `&genres.name=${searchData.country.toLowerCase()}`
        : "";
      const APIGenre = searchData.genre
        ? `&genres.name=${searchData.genre.toLowerCase()}`
        : "";
      const APIRating = searchData.rating
        ? `&rating.kp=${searchData.rating}`
        : "";
      const APIType = searchData.contentType
        ? `&type=${searchData.contentType}`
        : "";

      const response = await axios.get(
        `${API_BASE_URL}/v1.4/movie/random?year=${searchData.yearRange[0]}-${searchData.yearRange[1]}${APIRating}${APIType}${APIGenre}${APICountry}`,
        config
      );
      // Диспатчим экшен fetchRandomMovieSuccess с данными в случае успеха
      thunkAPI.dispatch(fetchRandomMovieSuccess(response.data));
    } catch (error: any) {
      // Диспатчим экшен fetchMovieFailure в случае ошибки
      thunkAPI.dispatch(fetchMovieFailure(error.message));
    }
  }
);
