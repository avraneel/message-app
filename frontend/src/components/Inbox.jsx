import Convo from "./Convo";
import styles from "../css/Inbox.module.css";

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
      <h2>Inbox</h2>
    </nav>
  );
}
