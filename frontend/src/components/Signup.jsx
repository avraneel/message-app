import styles from "../css/Signup.module.css";
import btnStyles from "../css/Button.module.css";
import Logo from "./Logo";

export default function Signup() {
  return (
    <div className={styles.signup}>
      <Logo />
      <h2>Sign Up</h2>
      <form action="" method="post">
        <div>
          <label htmlFor="username">Username *</label>
          <input type="text" name="username" id="username" required />
        </div>
        <div>
          <label htmlFor="password">Password *</label>
          <input type="password" name="password" id="password" required />
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password *</label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            required
          />
        </div>
        <button className={btnStyles.buttonPrimary}>Sign Up</button>
      </form>
    </div>
  );
}
