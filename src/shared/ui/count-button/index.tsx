import React, { FC } from "react";
import styles from "./CountButton.module.css";

interface CountButtonProps {
  displayedMovies: number;
  value: number;
  onClick: () => void;
}

export const CountButton: FC<CountButtonProps> = ({
  displayedMovies,
  value,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={`${styles.CountButton} ${
        displayedMovies === value ? styles.CountButtonActive : ""
      }`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};
