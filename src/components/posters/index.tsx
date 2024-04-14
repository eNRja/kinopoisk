import React, { useRef } from "react";
import styles from "./Posters.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";

export const Posters = () => {
  const postersRef = useRef<HTMLDivElement>(null);
  const { posters } = useSelector((state: RootState) => state.movie);

  const handleWheelScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    if (postersRef.current) {
      event.preventDefault();
      event.stopPropagation();
      postersRef.current.scrollLeft += event.deltaY;
    }
  };

  if (!posters) return <div className={styles.Posters}>нет постеров..</div>;

  return (
    <div
      className={styles.Posters}
      ref={postersRef}
      onWheel={handleWheelScroll}
    >
      {posters.docs.map((poster: any, index: number) => (
        <div key={index} className={styles.Poster}>
          <img
            src={poster.previewUrl}
            alt={poster.type}
            className={styles.PosterImg}
          />
        </div>
      ))}
    </div>
  );
};
