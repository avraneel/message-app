import Convo from "./Convo";
import styles from "../css/Inbox.module.css";

export default function Inbox({ contacts }) {
  const convoElements = contacts.map((el, ind) => (
    <Convo name={el} key={ind} />
  ));

  return (
    <div>
      <ul className={styles.inbox}>{convoElements}</ul>
    </div>
  );
}
