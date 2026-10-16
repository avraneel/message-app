import SecondaryButton from "./buttons/SecondaryButton";
import styles from "../css/DeleteAccount.module.css";
import btnStyles from "../css/Button.module.css";
import url from "../globals";
import { useNavigate } from "react-router";

export default function DeleteAccount({ username }) {
  let navigate = useNavigate();
  async function handleClick() {
    const response = await fetch(`${url}/${username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      // body should be username which is in path
    });

    if (!response.ok) {
    } else {
      navigate("/");
    }
  }
  return (
    <div className={styles.deleteAccount}>
      <h1>Delete Account</h1>
      <p>
        Are you sure want to delete your account with the following username?
      </p>
      <p>{username}</p>
      <div className={btnStyles.btnPanel}>
        <SecondaryButton text="No, Go Back" url="/settings" />
        <button className={btnStyles.buttonPrimary} onClick={handleClick}>
          Yes, delete my Account
        </button>
      </div>
    </div>
  );
}
