import { Link } from "react-router";
import styles from "../css/PageNotFound.module.css";

export default function PageNotFound() {
  return (
    <div className={styles.pageNotFound}>
      <h1>404</h1>
      <p>Were you meant to be here?</p>
      <Link to="/">Take me home</Link>
    </div>
  );
}
