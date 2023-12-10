import { useNavigate } from "react-router-dom";
import data from "../../users.json";

import styles from "./Dashboard.module.css";
import { useEffect } from "react";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles["dashboard-left"]}>
        <div className={styles["user-icon-name"]}>
          <div className={styles["user-icon"]}></div>
          <div className={styles["user-name"]}>
            {localStorage.getItem("user")}
          </div>
        </div>
        <form className={styles.form} onSubmit={logoutHandler}>
          <button>Log out</button>
        </form>
      </div>
      <div className={styles["dashboard-right"]}>
        <h2 className={styles["heading-secondary"]}>Users</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>id</th>
              <th>first name</th>
              <th>last name</th>
              {(localStorage.getItem("user") === "admin" ||
                localStorage.getItem("user") === "super_user") && (
                <th>email</th>
              )}
              <th>gender</th>
              {localStorage.getItem("user") === "admin" && <th>ip address</th>}
              <th rowSpan={10}>friends</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td rowSpan={1}>{user.id}</td>
                <td rowSpan={1}>{user.first_name}</td>
                <td rowSpan={1}>{user.last_name}</td>
                {(localStorage.getItem("user") === "admin" ||
                  localStorage.getItem("user") === "super_user") && (
                  <td rowSpan={1}>{user.email}</td>
                )}
                <td rowSpan={1}>{user.gender}</td>
                {localStorage.getItem("user") === "admin" && (
                  <td rowSpan={1}>{user.ip_address}</td>
                )}
                <td>
                    {user.friends.map((friend) => (
                        <p key={friend.id}>{friend.name}</p>
                    ))}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
