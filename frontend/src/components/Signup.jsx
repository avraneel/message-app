import SecondaryButton from "./buttons/SecondaryButton";
import btnStyles from "../css/Button.module.css";
import formStyles from "../css/Form.module.css";
import Logo from "./Logo";
import url from "../globals";
import { useNavigate } from "react-router";

export default function Signup() {
  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const username = formData.get("username");
    const password = formData.get("password");

    const requestBody = {
      username: username,
      password: password,
    };

    const headers = new Headers({
      "Content-Type": "application/json",
    });

    try {
      const response = await fetch(`${url}/signup`, {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={formStyles.formPage}>
      <Logo />
      <h1 className={formStyles.formHeading}>Sign Up</h1>
      <form onSubmit={handleSubmit} method="post" className={formStyles.form}>
        <div className={formStyles.formBody}>
          <div className={formStyles.formItem}>
            <label htmlFor="username">Username *</label>
            <input
              type="text"
              name="username"
              id="username"
              className={formStyles.inputElement}
              required
            />
          </div>
          <div className={formStyles.formItem}>
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              name="password"
              id="password"
              className={formStyles.inputElement}
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
          <SecondaryButton text="Back" url="/" />
          <button className={btnStyles.buttonPrimary}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}
