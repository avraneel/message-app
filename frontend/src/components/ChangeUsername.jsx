export default function ChangeUsername() {
  return (
    <form action="" method="post">
      <div>
        <label htmlFor="old-username">Old Username *</label>
        <input type="text" name="old-username" id="old-username" />
      </div>
      <div>
        <label htmlFor="new-username">New Username *</label>
        <input type="text" name="new-username" id="new-username" />
      </div>
      <button>Submit</button>
    </form>
  );
}
