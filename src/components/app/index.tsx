import React from "react";
import { Route, Routes } from "react-router-dom";
import { Movies } from "../../pages/movies";
import { Header } from "../header";
import { NotFound } from "../../pages/error";
import { MovieDetails } from "../../pages/movie-details";
import { Login } from "../../pages/login";
import { RandomMovie } from "../../pages/random-movie";
import { PrivateRoute } from "../../hooks/privateRoute";

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/chance"
          element={
            <PrivateRoute>
              <RandomMovie />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
