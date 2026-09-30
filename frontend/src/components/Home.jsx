import imgUrl from "../assets/main-logo.svg";
import styles from "../css/Home.module.css";
import btnStyles from "../css/Button.module.css";

export default function Home() {
  return (
    <main className={styles.home}>
      <img src={imgUrl} alt="main logo" height={128} width={128} />
      <h1>Message App</h1>
      <div className={styles.buttonPanel}>
        <button className={btnStyles.buttonPrimary}>Sign Up</button>
        <button className={btnStyles.buttonPrimary}>Login</button>
      </div>
    </main>
  );
}
