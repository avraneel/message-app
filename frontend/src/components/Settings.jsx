import { Link } from "react-router";
import SecondaryButton from "./buttons/SecondaryButton";
import styles from "../css/Settings.module.css";
import btnStyles from "../css/Button.module.css";

export default function Settings() {
  return (
    <div className={styles.settings}>
      <h1 className={styles.heading}>Settings</h1>
      <ul className={styles.settingsList}>
        <li className={styles.settingsListItem}>
          <Link to="/user/change/username" className={styles.settingsListLink}>
            Change Username
          </Link>
        </li>
        <hr />
        <li className={styles.settingsListItem}>
          <Link to="/user/change/password" className={styles.settingsListLink}>
            Change Password
          </Link>
        </li>
        <hr />
        <li className={styles.settingsListItem}>
          <Link to="/user/delete-account" className={styles.settingsListLink}>
            Delete Account
          </Link>
        </li>
      </ul>
      <div className={styles.btnPanel}>
        <SecondaryButton text="Back" url="/user" />
        <button className={btnStyles.buttonPrimary}>Logout</button>
      </div>
    </div>
  );
}
