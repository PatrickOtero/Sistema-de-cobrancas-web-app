/* eslint-disable react/prop-types */
import "./styles.css";

export default function Button({ children, onClick }) {
  return (
    <button onClick={onClick} type="submit" className="pink-button">{children}</button>
  );
}
