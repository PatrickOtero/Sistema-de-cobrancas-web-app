import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import successToastify from "../../assets/successToastify.svg";

export default function Toastify(text) {
  return (
    toast.success(text, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: { color: "#243F80", backgroundColor: "#C3D4FE", fontSize: "1.4rem" },
      icon: <img src={successToastify} alt="" />,

    })
  );
}
