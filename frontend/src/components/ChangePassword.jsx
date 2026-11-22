import SecondaryButton from "./buttons/SecondaryButton";
import formStyles from "../css/Form.module.css";
import btnStyles from "../css/Button.module.css";
import { useAuth } from "./useAuth";
import { useState } from "react";
import url from "../globals";
import { useNavigate } from "react-router";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [loggedInUser] = useAuth();
  const [newPassword, setNewPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    // const oldPasswd = formData.get("old-password");
    const confirmPasswd = formData.get("confirm-password");

    if (confirmPasswd !== newPassword) {
      alert("new and confirm passwords must match!");
      return;
    }

    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const requestBody = {
      newPassword: newPassword,
    };

    const response = await fetch(
      `${url}/users/${loggedInUser.loggedInUserId}/password`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify(requestBody),
        credentials: "include",
      },
    );
    if (!response.ok) {
      throw new Error(`put response code: ${response.status}`);
    }
    //const data = await response.json();
    navigate(`/users/${loggedInUser.loggedInUsername}`);
  }

  return (
    <div className={formStyles.formPage}>
      <h2 className={formStyles.formHeading}>Change Password</h2>
      <form
        action=""
        method="post"
        className={formStyles.form}
        onSubmit={handleSubmit}
      >
        <div className={formStyles.formBody}>
          {/* <div className={formStyles.formItem}>
            <label htmlFor="old-password">Old Password *</label>
            <input
              type="password"
              name="old-password"
              id="old-password"
              className={formStyles.inputElement}
              required
            />
          </div> */}
          <div className={formStyles.formItem}>
            <label htmlFor="new-password">New Password *</label>
            <input
              type="password"
              name="new-password"
              id="new-password"
              className={formStyles.inputElement}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className={formStyles.formItem}>
            <label htmlFor="confirm-password">Confirm Password *</label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              className={formStyles.inputElement}
              required
            />
          </div>
        </div>
        <div className={btnStyles.btnPanel}>
          <SecondaryButton text="Back" url=".." />
          <button className={btnStyles.buttonPrimary}>Change Password</button>
        </div>
      </form>
    </div>
  );
}
