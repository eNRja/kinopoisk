import React, { useState, MouseEvent } from "react";
import Logo from "../../../public/img/logo.svg";
import Bars from "../../../public/img/threebars.svg";
import LoginIcon from "../../../public/img/login.svg";
import LogoutIcon from "../../../public/img/logout.svg";
import ChanceIcon from "../../../public/img/lottery.svg";
import { Backdrop } from "@mui/material";
import styles from "./Header.module.css";
import { saveSettings } from "../../services/reducers/movieReducer";
import { FilterForm } from "../filter-form";
import { fetchMovie } from "../../services/api/movieAPI";
import { Searcher } from "../searcher";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch } from "../../services/store";

export const Header = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const dispatch = useDispatch();

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmit = (formData: {
    year: string;
    country: string;
    ageRatingFrom: string;
    ageRatingTo: string;
    displayedMovies: number;
  }) => {
    dispatch(fetchMovie({ formData }));
    dispatch(saveSettings(formData));
    setIsPopupOpen(!isPopupOpen);
  };

  const handlePopupClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className={styles.Header}>
        <Link to={"/"}>
          <img src={Logo} alt="logo" className={styles.HeaderLogo} />
        </Link>
        <h1 className={styles.HeaderDesktop}>
          Добро пожаловать на ненастоящий Кинопоиск
        </h1>
        <h1 className={styles.HeaderMobile}>Кинопоиск</h1>
        <div className={styles.HeaderHelper}>
          {isLoggedIn ? (
            <>
              <Link to={"/chance"} className={styles.LinkLoginLogout}>
                <img
                  src={ChanceIcon}
                  alt="login"
                  className={styles.LoginLogout}
                />
              </Link>
              <img
                src={LogoutIcon}
                alt="logout"
                className={styles.LoginLogout}
                onClick={logout}
              />
            </>
          ) : (
            <Link to={"/login"} className={styles.LinkLoginLogout}>
              <img src={LoginIcon} alt="login" className={styles.LoginLogout} />
            </Link>
          )}
          <img
            src={Bars}
            alt="logo"
            className={styles.HeaderBars}
            onClick={togglePopup}
          />
        </div>
        <Backdrop open={isPopupOpen} onClick={handleClosePopup}>
          <div className={styles.Popup} onClick={handlePopupClick}>
            <h2>Настройки</h2>
            <FilterForm onSubmit={handleSubmit} />
          </div>
        </Backdrop>
      </div>
      <Searcher />
    </>
  );
};
