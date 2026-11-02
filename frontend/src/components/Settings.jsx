import { Link, useNavigate } from "react-router";
import SecondaryButton from "./buttons/SecondaryButton";
import styles from "../css/Settings.module.css";
import btnStyles from "../css/Button.module.css";
import url from "../globals";

export default function Settings() {
  let navigate = useNavigate();
  async function logout() {
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const response = await fetch(`${url}/logout`, {
      method: "POST",
      headers,
      credentials: "include",
    });

    if (!response.ok) {
    } else {
      navigate("/");
    }
  }

  return (
    <div className={styles.settings}>
      <h1 className={styles.heading}>Settings</h1>
      <ul className={styles.settingsList}>
        <li className={styles.settingsListItem}>
          <Link to="username" className={styles.settingsListLink}>
            Change Username
          </Link>
        </li>
        <hr />
        <li className={styles.settingsListItem}>
          <Link to="password" className={styles.settingsListLink}>
            Change Password
          </Link>
        </li>
        <hr />
        <li className={styles.settingsListItem}>
          <Link to="delete" className={styles.settingsListLink}>
            Delete Account
          </Link>
        </li>
      </ul>
      <div className={styles.btnPanel}>
        <SecondaryButton text="Back" url=".." />
        <button className={btnStyles.buttonPrimary} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
