import Convo from "./Convo";
import { Link, useOutletContext } from "react-router";
import styles from "../css/Inbox.module.css";
import cogSvgUrl from "../assets/cog.svg";

export default function Inbox() {
  const contacts = useOutletContext();

  if (contacts) {
    /** el.ind !=== 1 means user "zero" (reserved user, to which messages sent to a deleted user points
     * is not displayed */
    const convoElements = contacts.map(
      (el, ind) => el.id !== 1 && <Convo name={el.username} key={ind} />,
    );
    return (
      <div className={styles.inbox}>
        <TopbarInbox />
        <ul className={styles.conversationList}>{convoElements}</ul>
      </div>
    );
  } else {
    return (
      <div className={styles.inbox}>
        <TopbarInbox />
      </div>
    );
  }
}

function TopbarInbox() {
  return (
    <nav className={styles.topbarInbox}>
      <Link to="settings">
        <img src={cogSvgUrl} alt="settings" height={24} width={24} />
      </Link>
      <h2>Inbox</h2>
    </nav>
  );
}
