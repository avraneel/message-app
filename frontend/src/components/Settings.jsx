import { Link } from "react-router";
import styles from "../css/Settings.module.css";
import btnStyles from "../css/Button.module.css";

export default function Settings() {
  return (
    <div className={styles.settings}>
      <h2 className={styles.heading}>Settings</h2>
      <ul className={styles.settingsList}>
        <li className={styles.settingsListItem}>
          <Link to="" className={styles.settingsListLink}>
            Change Username
          </Link>
        </li>
        <hr />
        <li className={styles.settingsListItem}>
          <Link className={styles.settingsListLink}>Change Password</Link>
        </li>
        <hr />
        <li className={styles.settingsListItem}>
          <Link className={styles.settingsListLink}>Delete Account</Link>
        </li>
      </ul>
      <div className={styles.btnPanel}>
        <Link to="/user" className={btnStyles.buttonSecondary}>
          Back
        </Link>
        <button className={btnStyles.buttonPrimary}>Logout</button>
      </div>
    </div>
  );
}
