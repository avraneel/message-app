import { useOutletContext, useParams } from "react-router";
import styles from "../css/Chat.module.css";
import Messages from "./Messages";
import btnStyles from "../css/Button.module.css";
import { useAuth } from "./useAuth";
import { useEffect, useState } from "react";
import url from "../globals";

export default function Chat() {
  const params = useParams();
  const [loggedInUser] = useAuth();
  const contacts = useOutletContext();
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState([]);

  useEffect(() => {
    try {
      const talkingWith = contacts.filter(
        (el) => el.username === params.user2,
      )[0];
      if (talkingWith) {
        async function fetchMessages() {
          const response = await fetch(
            `${url}/users/${loggedInUser.loggedInUserId}/messages/${talkingWith.id}`,
            { credentials: "include" },
          );
          if (!response.ok) {
            throw new Error(`fetchMessage status code: ${response.status}`);
          }
          const data = await response.json();
          setMessages(data);
        }
        fetchMessages();
      }
    } catch (err) {
      console.error(err);
    }
  }, [loggedInUser, contacts, params]);

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const message = formData.get("message");

    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const talkingWith = contacts.filter(
      (el) => el.username === params.user2,
    )[0];

    const requestBody = {
      from: loggedInUser.loggedInUserId,
      to: talkingWith.id,
      text: message,
    };

    try {
      const response = await fetch(
        `${url}/users/${loggedInUser.loggedInUserId}/messages/`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(requestBody),
          credentials: "include",
        },
      );
      if (!response.ok) {
        throw new Error(`send response status: ${response.status}`);
      }
      const data = await response.json();
      setMessages(data);
      setMessageText("");
    } catch (err) {
      console.error(err);
    }
  }

  if (contacts) {
    return (
      <div className={styles.chat}>
        <Topbar username={params.user2} />
        <Messages
          username={loggedInUser.loggedInUsername}
          messages={messages}
        />
        <form action="" className={styles.inputArea} onSubmit={handleSubmit}>
          <textarea
            name="message"
            id=""
            rows={3}
            className={styles.textArea}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          ></textarea>
          <button className={btnStyles.buttonPrimary}>Send</button>
        </form>
      </div>
    );
  } else {
    return null;
  }
}

function Topbar({ username }) {
  return (
    <div className={styles.topBar}>
      <h3>{username}</h3>
    </div>
  );
}
