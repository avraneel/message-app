import { useNavigate } from "react-router";
import btnStyles from "../css/Button.module.css";
import formStyles from "../css/Form.module.css";
import Logo from "./Logo";
import SecondaryButton from "./buttons/SecondaryButton";
import url from "../globals";

export default function Login() {
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
      const response = await fetch(`${url}/login`, {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      navigate("/user");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={formStyles.formPage}>
      <Logo />
      <h1 className={formStyles.formHeading}>Log In</h1>
      <form onSubmit={handleSubmit} className={formStyles.form}>
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
        </div>
        <div className={btnStyles.btnPanel}>
          <SecondaryButton text="Back" url="/" />
          <button className={btnStyles.buttonPrimary}>Log In</button>
        </div>
      </form>
    </div>
  );
}
