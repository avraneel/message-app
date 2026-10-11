import styles from "../css/Chat.module.css";
import Messages from "./Messages";
import PrimaryButton from "./buttons/PrimaryButton";

export default function Chat() {
  const messages = [
    { sender: "alice", text: "hey how are you?" },
    { sender: "johnsmith", text: "I am fine, what about you?" },
  ];

  return (
    <div className={styles.chat}>
      <Topbar username="johnsmith" />
      <Messages username="alice" messages={messages} />
      <form action="" className={styles.inputArea}>
        <textarea name="" id="" rows={3} className={styles.textArea}></textarea>
        <PrimaryButton text="Send" />
      </form>
    </div>
  );
}

function Topbar({ username }) {
  return (
    <div className={styles.topBar}>
      <p>{username}</p>
    </div>
  );
}
