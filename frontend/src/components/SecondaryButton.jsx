import { Link } from "react-router";
import btnStyles from "../css/Button.module.css";

export default function SecondaryButton({ text, url }) {
  return (
    <Link to={url} className={btnStyles.buttonSecondary}>
      {text}
    </Link>
  );
}
