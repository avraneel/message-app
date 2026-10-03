import { Link } from "react-router";

export default function Settings() {
  return (
    <ul>
      <li>
        <Link to="">Change Username *</Link>
      </li>
      <li>
        <Link>Change Password *</Link>
      </li>
      <li>
        <Link>Delete Account *</Link>
      </li>
    </ul>
  );
}
