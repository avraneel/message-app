import SecondaryButton from "./buttons/ButtonSecondary";
import formStyles from "../css/Form.module.css";
import btnStyles from "../css/Button.module.css";

export default function ChangePassword() {
  return (
    <div className={formStyles.formPage}>
      <h2 className={formStyles.formHeading}>Change Password</h2>
      <form action="" method="post" className={formStyles.form}>
        <div className={formStyles.formBody}>
          <div className={formStyles.formItem}>
            <label htmlFor="old-password">Old Password *</label>
            <input
              type="password"
              name="old-password"
              id="old-password"
              className={formStyles.inputElement}
            />
          </div>
          <div className={formStyles.formItem}>
            <label htmlFor="new-password">New Password *</label>
            <input
              type="password"
              name="new-password"
              id="new-password"
              className={formStyles.inputElement}
            />
          </div>
          <div className={formStyles.formItem}>
            <label htmlFor="confirm-password">Confirm Password *</label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              className={formStyles.inputElement}
            />
          </div>
        </div>
        <div className={btnStyles.btnPanel}>
          <SecondaryButton text="Back" url="/settings" />
          <button className={btnStyles.buttonPrimary}>Submit</button>
        </div>
      </form>
    </div>
  );
}
