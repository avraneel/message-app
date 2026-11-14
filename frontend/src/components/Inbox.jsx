import Convo from "./Convo";
import { Link } from "react-router";
import styles from "../css/Inbox.module.css";
import cogSvgUrl from "../assets/cog.svg";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import url from "../globals";

export default function Inbox() {
  const [loggedInUser] = useAuth();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch(
          `${url}/users/${loggedInUser.loggedInUserId}/contacts`,
          { credentials: "include" },
        );
        if (!response.ok) {
          throw new Error(`Response status code: ${response.status}`);
        }
        const data = await response.json();
        setContacts(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchContacts();
  }, [loggedInUser]);

  const convoElements = contacts.map((el, ind) => (
    <Convo name={el.username} key={ind} />
  ));

  if (contacts) {
    return (
      <div className={styles.inbox}>
        <TopbarInbox />
        <ul className={styles.conversationList}>{convoElements}</ul>
      </div>
    );
  } else {
    return null;
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
