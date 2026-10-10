import { Link } from "react-router";
import btnStyles from "../css/Button.module.css";

export default function Back({ url }) {
  return (
    <Link to={url} className={btnStyles.buttonSecondary}>
      Back
    </Link>
  );
}
