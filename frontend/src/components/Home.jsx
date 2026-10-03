import Logo from "./Logo";
import styles from "../css/Home.module.css";
import btnStyles from "../css/Button.module.css";
import { Link } from "react-router";

export default function Home() {
  return (
    <main className={styles.home}>
      <Logo />
      <h1>Message App</h1>
      <div className={styles.buttonPanel}>
        <Link to="/signup" className={btnStyles.buttonPrimary}>
          Sign Up
        </Link>
        <Link to="/login" className={btnStyles.buttonPrimary}>
          Login
        </Link>
      </div>
    </main>
  );
}
