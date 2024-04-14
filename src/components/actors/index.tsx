import React, { useState } from "react";
import styles from "./Actors.module.css";
import Right from "../../../public/img/right.svg";
import Left from "../../../public/img/left.svg";

export const Actors = ({ actors }: any) => {
  const actorsPerPage = 10; // Количество актеров на странице
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(actors.length / actorsPerPage); // Общее количество страниц

  // Определяем индексы первого и последнего актеров для текущей страницы
  const indexOfLastActor = currentPage * actorsPerPage;
  const indexOfFirstActor = indexOfLastActor - actorsPerPage;
  const currentActors = actors.slice(indexOfFirstActor, indexOfLastActor);

  // Функции для переключения страниц с зацикленностью
  const goToNextPage = () => {
    setCurrentPage((prevPage) => (prevPage % totalPages) + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage(
      (prevPage) => ((prevPage - 2 + totalPages) % totalPages) + 1
    );
  };

  if (!actors)
    return (
      <div className={styles.ActorsContainer}>нет информации об актёрах</div>
    );

  return (
    <div className={styles.ActorsContainer}>
      <button onClick={goToPrevPage} className={styles.ActorsButton}>
        <img src={Left} alt="left" />
      </button>
      <div className={styles.Actors}>
        {currentActors.map((actor: any, index: number) => (
          <div key={index} className={styles.Actor}>
            <img
              src={actor.photo}
              alt={actor.name}
              className={styles.ActorImg}
            />
            <p>{actor.name}</p>
          </div>
        ))}
      </div>
      <button onClick={goToNextPage} className={styles.ActorsButton}>
        <img src={Right} alt="right" />
      </button>
    </div>
  );
};
