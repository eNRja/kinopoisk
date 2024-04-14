import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MovieState {
  data: any;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalMovies: number;
  displayedMoviesCount: number;
  formData: any;
  film: any;
  filmReview: any;
  posters: any;
  randomMovie: any;
  searchTerm: string | null;
}

const initialState: MovieState = {
  data: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalMovies: 0,
  displayedMoviesCount: 10,
  formData: {},
  film: null,
  filmReview: null,
  posters: null,
  randomMovie: false,
  searchTerm: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    fetchMovieStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMovieSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.data = action.payload.docs;
      state.currentPage = action.payload.page;
      state.totalPages = action.payload.pages;
      state.totalMovies = action.payload.total;
      state.error = null;
    },
    fetchMovieFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setDisplayedMoviesCount(state, action: PayloadAction<number>) {
      state.displayedMoviesCount = action.payload;
    },
    saveSettings(state, action: PayloadAction<any>) {
      state.formData = action.payload;
    },
    fetchDeepInfSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = null;
      state.film = action.payload;
    },
    fetchReviewSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = null;
      state.filmReview = action.payload;
    },
    fetchPostersSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = null;
      state.posters = action.payload;
    },
    fetchRandomMovieSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = null;
      state.film = action.payload;
      state.randomMovie = true;
    },
    falseRandomMovie(state) {
      state.randomMovie = false;
    },
    updateSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  fetchMovieStart,
  fetchMovieSuccess,
  fetchMovieFailure,
  setDisplayedMoviesCount,
  saveSettings,
  fetchDeepInfSuccess,
  fetchReviewSuccess,
  fetchPostersSuccess,
  fetchRandomMovieSuccess,
  falseRandomMovie,
  updateSearchTerm,
} = movieSlice.actions;

export default movieSlice.reducer;
