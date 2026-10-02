import styles from "../css/Convo.module.css";
import GoArrow from "./GoArrow";

export default function Convo({ name }) {
  return (
    <li className={styles.convo}>
      <p>{name}</p>
      <GoArrow />
    </li>
  );
}
