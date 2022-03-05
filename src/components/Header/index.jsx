/* eslint-disable react/button-has-type */
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useData from "../../hooks/useData";
import PopUp from "../PopUp/index";
import iconeSeta from "./assets/icone-seta.svg";
import "./styles.css";

export default function Header({
  customersPage, signal, detailsPhrase, headerTitle,
}) {
  const {
    userPopUp, setUserPopUp, currentUserData,
    loginUserNameInitialsObtainer, setChargesMsg, actualPage,
  } = useData();
  const [userNameInitials, setUserNameInitials] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUserData.name_user) {
      const userInitials = loginUserNameInitialsObtainer(currentUserData);
      setUserNameInitials(userInitials.toUpperCase());
    }
  }, [currentUserData.name_user]);

  const handleChangeCustomer = () => {
    setChargesMsg("");
    if (actualPage === "customers") {
      navigate("/clientes");
      return;
    }

    if (actualPage === "charges") {
      navigate("/cobrancas");
    }
  };

  return (
    <Box className="header-container">
      { customersPage === "true"
      && (
      <Box className="header-customers">
        <button onClick={handleChangeCustomer} className="header-customers-link">{headerTitle}</button>
        <p className="header-customers-grey">
          {signal}
        </p>
        <p className="header-customers-grey">{detailsPhrase}</p>
      </Box>
      )}

      { customersPage !== "true"
      && (
      <Box className="header-title">
        <b>Resumo das cobranças</b>
      </Box>
      )}
      <Box className="user-name-container">
        <Box className="user-name-initials">
          <b className="initials-text">{userNameInitials}</b>
        </Box>
        <Box className="user-name-and-arrow">
          <b className="user-name-text">{currentUserData.name_user}</b>
          <Box className="user-container-arrow-button">
            <button type="button" onClick={() => setUserPopUp(!userPopUp)}>
              <img src={iconeSeta} alt="Seta" />
            </button>
            <PopUp />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
