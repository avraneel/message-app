import Logo from "./Logo";
import styles from "../css/Home.module.css";
import btnStyles from "../css/Button.module.css";

export default function Home() {
  return (
    <main className={styles.home}>
      <Logo />
      <h1>Message App</h1>
      <div className={styles.buttonPanel}>
        <button className={btnStyles.buttonPrimary}>Sign Up</button>
        <button className={btnStyles.buttonPrimary}>Login</button>
      </div>
    </main>
  );
}
