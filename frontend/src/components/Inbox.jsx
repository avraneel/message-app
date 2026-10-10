import Convo from "./Convo";
import { Link } from "react-router";
import styles from "../css/Inbox.module.css";
import cogSvgUrl from "../assets/cog.svg";

export default function Inbox({ contacts }) {
  const convoElements = contacts.map((el, ind) => (
    <Convo name={el} key={ind} />
  ));

  return (
    <div className={styles.inbox}>
      <TopbarInbox />
      <ul className={styles.conversationList}>{convoElements}</ul>
    </div>
  );
}

function TopbarInbox() {
  return (
    <nav className={styles.topbarInbox}>
      <Link to="/settings">
        <img src={cogSvgUrl} alt="settings" height={24} width={24} />
      </Link>
      <h2>Inbox</h2>
    </nav>
  );
}
