import SecondaryButton from "./buttons/ButtonSecondary";
import btnStyles from "../css/Button.module.css";
import formStyles from "../css/Form.module.css";
import Logo from "./Logo";

export default function Signup() {
  return (
    <div className={formStyles.formPage}>
      <Logo />
      <h1 className={formStyles.formHeading}>Sign Up</h1>
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
