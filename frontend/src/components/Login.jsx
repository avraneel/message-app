import btnStyles from "../css/Button.module.css";
import formStyles from "../css/Form.module.css";
import Logo from "./Logo";
import Back from "./Back";

export default function Login() {
  return (
    <div className={formStyles.formPage}>
      <Logo />
      <h2 className={formStyles.formHeading}>Log In</h2>
      <form action="" method="post" className={formStyles.form}>
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
          <button className={btnStyles.buttonPrimary}>Log In</button>
          <Back url="/" />
        </div>
      </form>
    </div>
  );
}
