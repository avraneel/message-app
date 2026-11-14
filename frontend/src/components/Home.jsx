import Logo from "./Logo";
import styles from "../css/Home.module.css";
import btnStyles from "../css/Button.module.css";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./useAuth";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [loggedInUser] = useAuth();
  useEffect(() => {
    if (loggedInUser.loggedInUserId > 0) {
      navigate(`users/${loggedInUser.loggedInUsername}`);
    }
  }, [loggedInUser, navigate]);

  if (loggedInUser.loggedInUserId <= 0) {
    return (
      <main className={styles.home}>
        <Logo />
        <h1>Message App</h1>
        <div className={styles.buttonPanel}>
          <Link to="/auth/signup" className={btnStyles.buttonPrimary}>
            Sign Up
          </Link>
          <Link to="/auth/login" className={btnStyles.buttonPrimary}>
            Login
          </Link>
        </div>
      </main>
    );
  } else {
    return null;
  }
}
