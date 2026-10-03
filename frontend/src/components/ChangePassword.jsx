export default function ChangePassword() {
  return (
    <form action="" method="post">
      <div>
        <label htmlFor="old-password">Old Password *</label>
        <input type="password" name="old-password" id="old-password" />
      </div>
      <div>
        <label htmlFor="new-password">New Password *</label>
        <input type="password" name="new-password" id="new-password" />
      </div>
      <div>
        <label htmlFor="confirm-password">Confirm Password *</label>
        <input type="password" name="confirm-password" id="confirm-password" />
      </div>
      <button>Submit</button>
    </form>
  );
}
