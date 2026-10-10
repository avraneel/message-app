import SecondaryButton from "./buttons/ButtonSecondary";
import formStyles from "../css/Form.module.css";
import btnStyles from "../css/Button.module.css";

export default function ChangeUsername() {
  return (
    <div className={formStyles.formPage}>
      <h2 className={formStyles.formHeading}>Change Username</h2>
      <form action="" method="post" className={formStyles.form}>
        <div className={formStyles.formBody}>
          <div className={formStyles.formItem}>
            <label htmlFor="old-username">Old Username *</label>
            <input
              type="text"
              name="old-username"
              id="old-username"
              className={formStyles.inputElement}
            />
          </div>
          <div className={formStyles.formItem}>
            <label htmlFor="new-username">New Username *</label>
            <input
              type="text"
              name="new-username"
              id="new-username"
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
