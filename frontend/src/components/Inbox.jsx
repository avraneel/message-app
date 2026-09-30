import Convo from "./Convo";

export default function Inbox({ contacts }) {
  const convoElements = contacts.map((el, ind) => (
    <Convo name={el} key={ind} />
  ));

  return (
    <div>
      <ul>{convoElements}</ul>
    </div>
  );
}
