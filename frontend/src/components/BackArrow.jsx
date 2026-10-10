import imgUrl from "../assets/arrow-left.svg";

export default function BackArrow() {
  return <input type="image" src={imgUrl} alt="back" width={34} height={34} />;
}
