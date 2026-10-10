import { Link } from "react-router";
import btnStyles from "../css/Button.module.css";

export default function PrimaryButton({ text, url }) {
  return (
    <Link to={url} className={btnStyles.buttonPrimary}>
      {text}
    </Link>
  );
}
