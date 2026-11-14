import { NavLink } from "react-router";
import imgUrl from "../assets/arrow-button.svg";
import styles from "../css/GoArrow.module.css";

export default function GoArrow({ user2Name }) {
  return (
    <NavLink to={`chat/${user2Name}`}>
      <img
        src={imgUrl}
        alt="go"
        height={34}
        width={34}
        className={styles.goBtn}
      />
    </NavLink>
  );
}
