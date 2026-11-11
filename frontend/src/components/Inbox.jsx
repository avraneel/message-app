import Convo from "./Convo";
import { Link } from "react-router";
import styles from "../css/Inbox.module.css";
import cogSvgUrl from "../assets/cog.svg";
import { useState, useEffect } from "react";
import url from "../globals";
import { fetchId } from "./authCalls";

export default function Inbox() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const loadContacts = async () => {
      const userId = await fetchId();
      const response = await fetch(`${url}/users/${userId}/contacts`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      const contactNames = data.map((el) => el.username);
      setContacts(contactNames);
    };

    loadContacts();
  }, []);

  console.log("render");
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
      <Link to="settings">
        <img src={cogSvgUrl} alt="settings" height={24} width={24} />
      </Link>
      <h2>Inbox</h2>
    </nav>
  );
}
