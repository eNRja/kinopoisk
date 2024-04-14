import React, { useState, FC } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const Login: FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username.trim() === "") {
      setError("Имя не может быть пустым");
      return;
    }

    login();
    navigate(-1);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setError("");
  };

  return (
    <div className={styles.Login}>
      <h2>Страница входа</h2>
      <label className={styles.LoginLabel}>
        Имя
        <input type="text" value={username} onChange={handleChange} />
      </label>
      {error && <p className={styles.Error}>{error}</p>}
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
};
