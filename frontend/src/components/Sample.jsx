import { useState } from "react";

export function Parent({ children }) {
  const [val, setVal] = useState(0);
  console.log("render Parent");
  const ui = (
    <div>
      <h1>Hello i am {val}</h1>
      {children}
      <button onClick={() => setVal(val + 1)}>Click Me to update state</button>
    </div>
  );
  console.log(ui);
  return ui;
}

export function Child() {
  console.log("render Child");
  const ui = <p>I am a Child</p>;
  console.log(ui);
  return ui;
}

export function Sample() {
  return (
    <Parent>
      <Child />
    </Parent>
  );
}
