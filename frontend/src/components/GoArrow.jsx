import imgUrl from "../assets/arrow-button.svg";
import styles from "../css/GoArrow.module.css";

export default function GoArrow() {
  return (
    <input
      className={styles.goBtn}
      type="image"
      src={imgUrl}
      alt="go"
      height={34}
      width={34}
    />
  );
}
