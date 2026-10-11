import styles from "../css/Messages.module.css";

export default function Messages({ username, messages }) {
  const messageElements = messages.map((el, ind) => {
    if (el.sender === username) {
      // our sent message
      return <BubbleSent key={ind} text={el.text} />;
    } else {
      // their message
      return <BubbleReceived key={ind} text={el.text} />;
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
