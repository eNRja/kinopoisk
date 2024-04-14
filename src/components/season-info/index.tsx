import React from "react";
import styles from "./SeasonInfo.module.css";

export const SeasonInfo = ({ seasons }: any) => {
  if (!seasons) return null;
  return (
    <div className={styles.Seasons}>
      {seasons.map((season: any, index: number) => (
        <div key={index} className={styles.SeasonInfo}>
          <p>Сезон: {season.number}</p>
          <p>Эпизодов:</p>
          <p>{season.episodesCount}</p>
        </div>
      ))}
    </div>
  );
};
