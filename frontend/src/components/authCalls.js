import url from "../globals";

export async function fetchId() {
  const response = await fetch(`${url}/id`, { credentials: "include" });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const { userId } = await response.json();
  return userId;
}
