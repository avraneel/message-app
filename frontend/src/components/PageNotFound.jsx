import { Link } from "react-router";

export default function PageNotFound() {
  return (
    <div className="404">
      <h1>404</h1>
      <p>Were you meant to be here?</p>
      <Link to="/">Take me home</Link>
    </div>
  );
}
