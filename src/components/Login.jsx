import { useEffect, useState } from "react";

import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameIsTouched, setUsernameIsTouched] = useState(false);
  const [usernameIsValid, setUsernameIsValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
    if (
      e.target.value !== "admin" &&
      e.target.value !== "user" &&
      e.target.value !== "super_user"
    ) {
      setUsernameIsValid(false);
    } else {
      setUsernameIsValid(true);
    }
    setUsernameIsTouched(true);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (
      username !== "admin" &&
      username !== "user" &&
      username !== "super_user"
    ) {
      return;
    } else {
      localStorage.setItem("user", username);
      navigate("dashboard");
    }
  };

  return (
    <div className={styles.background}>
      <form className={styles.form} onSubmit={formSubmitHandler}>
        <h2 className={styles["header-secondary"]}>Log in</h2>
        <div className={styles["form-control"]}>
          <label>username</label>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={usernameChangeHandler}
            className={`${
              !usernameIsValid && usernameIsTouched && styles.invalid
            }`}
          />
          {!usernameIsValid && usernameIsTouched && (
            <span className={`${styles["invalid-error"]}`}>
              Invalid username
            </span>
          )}
        </div>
        <div className={styles["form-control"]}>
          <label>password</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={passwordChangeHandler}
          />
        </div>
        <button className={styles.submit} disabled={!usernameIsValid}>
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Login;
