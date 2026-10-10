import { Link } from "react-router";
import styles from "../css/Settings.module.css";
import btnStyles from "../css/Button.module.css";

export default function Settings() {
  return (
    <div className={styles.settings}>
      <h2>Settings</h2>
      <ul className={styles.settingsList}>
        <li className={styles.settingsListItem}>
          <Link to="" className={styles.settingsListLink}>
            Change Username
          </Link>
        </li>
        <li className={styles.settingsListItem}>
          <Link className={styles.settingsListLink}>Change Password</Link>
        </li>
        <li className={styles.settingsListItem}>
          <Link className={styles.settingsListLink}>Delete Account</Link>
        </li>
      </ul>
      <button className={btnStyles.buttonPrimary}>Logout</button>
    </div>
  );
}
