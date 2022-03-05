import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toastify(text) {
  return (
    toast.error(text, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: { color: "#AE1100", backgroundColor: "#F2D6D0", fontSize: "1.4rem" },
    })
  );
}
