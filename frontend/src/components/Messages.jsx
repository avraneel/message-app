import styles from "../css/Messages.module.css";
import { useAuth } from "./useAuth";

export default function Messages({ messages }) {
  const [loggedInUser] = useAuth();
  const messageElements = messages.map((el) => {
    if (el.fromUserId === loggedInUser.loggedInUserId) {
      // our sent message
      return <BubbleSent key={el.id} text={el.text} />;
    } else {
      // their message
      return <BubbleReceived key={el.id} text={el.text} />;
    }
  });
  return <div className={styles.messageWindow}>{messageElements}</div>;
}

function BubbleReceived({ text }) {
  return (
    <div className={`${styles.received} ${styles.bubble}`}>
      <p>{text}</p>
    </div>
  );
}

function BubbleSent({ text }) {
  return (
    <div className={`${styles.sent} ${styles.bubble}`}>
      <p>{text}</p>
    </div>
  );
}
