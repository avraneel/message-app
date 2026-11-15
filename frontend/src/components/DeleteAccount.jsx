import SecondaryButton from "./buttons/SecondaryButton";
import styles from "../css/DeleteAccount.module.css";
import btnStyles from "../css/Button.module.css";
import url from "../globals";
import { useAuth } from "./useAuth";

export default function DeleteAccount() {
  const [loggedInUser, setLoggedInUser] = useAuth();
  async function handleClick() {
    const response = await fetch(
      `${url}/users/${loggedInUser.loggedInUserId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        // body should be username which is in path
      },
    );

    if (!response.ok) {
      throw new Error(`delete response code ${response.status}`);
    } else {
      setLoggedInUser({
        loggedInUserId: 0,
        loggedInUsername: "",
      });
    }
  }
  return (
    <div className={styles.deleteAccount}>
      <h1>Delete Account</h1>
      <p>
        Are you sure want to delete your account with the following username?
      </p>
      <p>{loggedInUser.loggedInUsername}</p>
      <div className={btnStyles.btnPanel}>
        <SecondaryButton text="No, Go Back" url=".." />
        <button className={btnStyles.buttonPrimary} onClick={handleClick}>
          Yes, delete my Account
        </button>
      </div>
    </div>
  );
}
