import SecondaryButton from "./buttons/SecondaryButton";
import formStyles from "../css/Form.module.css";
import btnStyles from "../css/Button.module.css";
import { useAuth } from "./useAuth";
import url from "../globals";
import { useState } from "react";

export default function ChangeUsername() {
  const [loggedInUser, setLoggedInUser] = useAuth();
  const [newUsername, setNewUsername] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const requestBody = {
      newUsername: newUsername,
    };

    const response = await fetch(
      `${url}/users/${loggedInUser.loggedInUserId}/username`,
      {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(requestBody),
        credentials: "include",
      },
    );
    if (!response.ok) {
      throw new Error(`Put username response code: ${response.status}`);
    }
    const data = await response.json();
    setLoggedInUser({
      loggedInUserId: data.id,
      loggedInUsername: data.username,
    });
  }

  return (
    <div className={formStyles.formPage}>
      <h2 className={formStyles.formHeading}>Change Username</h2>
      <form
        action=""
        method="post"
        className={formStyles.form}
        onSubmit={handleSubmit}
      >
        <div className={formStyles.formBody}>
          <div className={formStyles.formItem}>
            <label htmlFor="new-username">New Username *</label>
            <input
              type="text"
              name="new-username"
              id="new-username"
              className={formStyles.inputElement}
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              required
            />
          </div>
        </div>
        <div className={btnStyles.btnPanel}>
          <SecondaryButton text="Back" url=".." />
          <button className={btnStyles.buttonPrimary}>Change Username</button>
        </div>
      </form>
    </div>
  );
}
