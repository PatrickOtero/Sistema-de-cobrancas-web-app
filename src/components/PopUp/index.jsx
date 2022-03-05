/* eslint-disable react/button-has-type */
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import iconeEditar from "./assets/icone-editar.svg";
import iconeSair from "./assets/icone-sair.svg";
import iconeSetaPopUp from "./assets/icone-seta-pop-up.svg";
import useData from "../../hooks/useData";

export default function PopUp() {
  const navigate = useNavigate();
  const {
    setUserPopUp,
    setOpenUserEditModal,
    openUserEditModal,
    removeToken,
    currentUserData,
    setEditUserName,
    setEditEmail,
    setEditCpf,
    setEditPhone,
    userPopUp,
  } = useData();

  const logout = () => {
    setUserPopUp(false);
    removeToken();
    navigate("/");
  };

  return (
    <Box>
      { userPopUp
      && (
      <Box className="popup-container">
        <img className="upper-white-popup-arrow" src={iconeSetaPopUp} alt="Seta" />
        <Box className="popup-second-container">
          <Box className="popup-edit-icon-container">
            <button
              onClick={() => {
                setOpenUserEditModal(!openUserEditModal);
                setEditUserName(currentUserData.name_user);
                setEditEmail(currentUserData.email);
                setEditCpf(currentUserData.cpf);
                setEditPhone(currentUserData.phone);
              }}
              type="button"
            >
              <img src={iconeEditar} alt="Editar" />
            </button>
            <span>Editar</span>
          </Box>
          <Box className="popup-logout-icon-container">
            <button onClick={() => logout()} type="button">
              <img src={iconeSair} alt="Deslogar" />
            </button>
            <span>Sair</span>
          </Box>
        </Box>
      </Box>
      )}
    </Box>
  );
}
