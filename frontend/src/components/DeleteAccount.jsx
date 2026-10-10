import SecondaryButton from "./SecondaryButton";
import styles from "../css/DeleteAccount.module.css";
import btnStyles from "../css/Button.module.css";

export default function DeleteAccount({ username }) {
  return (
    <div className={styles.deleteAccount}>
      <h1>Delete Account</h1>
      <p>
        Are you sure want to delete your account with the following username?
      </p>
      <p>{username}</p>
      <div className={btnStyles.btnPanel}>
        <SecondaryButton text="No, Go Back" url="/settings" />
        <button className={btnStyles.buttonPrimary}>
          Yes, delete my Account
        </button>
      </div>
    </div>
  );
}
