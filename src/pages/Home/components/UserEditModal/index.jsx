/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */

import "./styles.css";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import IconFechar from "../../../../assets/icones-modal/fechar.svg";
import useData from "../../../../hooks/useData";
import userEditSucessImage from "./assets/usuario-edicao-sucesso.svg";

export default function ModalToEdit() {
  const {
    setOpenUserEditModal,
    setCurrentUserData,
    setUserPopUp,
    token,
    editUserName,
    editEmail,
    editCpf,
    editPhone,
    editPass,
    editConfirmPass,
    setEditUserName,
    setEditEmail,
    setEditCpf,
    setEditPhone,
    setEditPass,
    setEditConfirmPass,
  } = useData();

  const [sucessEdit, setSucessEdit] = useState(false);
  const [userEditErrors, setUserEditErrors] = useState({});
  const [sucessModal, setSucessModal] = useState(false);
  const [userEditLoading, setUserEditLoading] = useState(false);

  const handleEditUser = async () => {
    setUserEditLoading(true);
    try {
      const bodyToSend = {
        name_user: editUserName,
        email: editEmail,
        cpf: editCpf,
        phone: editPhone,
        pass: editPass,
      };

      const userEditMessage = await (
        await fetch("https://payment-system-app-api.herokuapp.com/users", {
          method: "PUT",
          body: JSON.stringify(bodyToSend),
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
      ).json();

      if (userEditMessage === "Usuario editado com sucesso!") {
        setEditPass("");
        setEditConfirmPass("");
        setSucessEdit(!sucessEdit);

        setSucessModal(true);
        setOpenUserEditModal(true);

        setTimeout(() => {
          setSucessModal(false);
          setOpenUserEditModal(false);
          setUserPopUp(false);
        }, 1000);
      }
      setUserEditLoading(false);
      if (userEditErrors) {
        setUserEditErrors(userEditMessage);
        setUserEditLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
      setUserEditLoading(false);
    }
  };

  useEffect(() => {
    setCurrentUserData({
      name_user: editUserName,
      email: editEmail,
      cpf: editCpf,
      phone: editPhone,
    });
  }, [sucessEdit]);

  return (
    <Box className="edit-user-backdrop-container">
      { sucessModal
      && (
      <Box className="user-edit-success-modal-container">
        <Box className="user-edit-success-message-container">
          <img src={userEditSucessImage} alt="Usuário editado com sucesso!" />
        </Box>
        <b className="user-edit-success-message">Cadastro Alterado com sucesso!</b>
      </Box>
      )}
      { !sucessModal && (
      <Box className="edit-user-modal-container">
        {userEditLoading && (
        <div className="user-edit-loading-backdrop">
          <div className="loading-user-edit-modal">
            <div className="loader-user-edit-modal" />
          </div>
        </div>
        )}
        <Box
          className="edit-user-modal-close-icon-container"
          onClick={() => {
            setOpenUserEditModal(false);
            setUserPopUp(false);
          }}
          src={IconFechar}
          alt="Fechar"
        >
          <Box
            className="close-icon-first-leg"
          >
            <Box
              className="close-icon-second-leg"
            />
          </Box>
        </Box>
        <Box className="edit-user-modal-title">
          <b>Edite seu cadastro</b>
        </Box>
        <Box className="edit-user-modal-upper-inputs">
          <label htmlFor="edit-name">Nome</label>
          <input
            onChange={(e) => setEditUserName(e.target.value)}
            value={editUserName}
            id={userEditErrors.requiredName && editUserName.length === 0 ? "red-border-warning" : "edit-name"}
            type="text"
            placeholder="Digite seu nome"
          />
          {userEditErrors
          && userEditErrors.requiredName && editUserName.length === 0 && <h4 className="user-edit-below-input-errors">{userEditErrors.requiredName}</h4>}
          <label htmlFor="edit-email">E-mail</label>
          <input
            onChange={(e) => setEditEmail(e.target.value)}
            value={editEmail}
            id={(userEditErrors.requiredEmail || userEditErrors.emailExists) && editEmail.length === 0 ? "red-border-warning" : "edit-email"}
            type="email"
            placeholder="Digite seu email"
          />
          { userEditErrors
          && (userEditErrors.emailExists || userEditErrors.requiredEmail) && <h4 className="user-edit-below-input-errors">{userEditErrors.emailExists || userEditErrors.requiredEmail}</h4> }
        </Box>
        <Box className="edit-user-modal-middle-inputs">
          <Box className="user-edit-modal-cpf">
            <label htmlFor="edit-cpf">CPF</label>
            <InputMask
              onChange={(e) => setEditCpf(e.target.value)}
              value={editCpf}
              placeholder="Digite seu cpf"
              id={(userEditErrors.cpfExists || userEditErrors.invalidCpf) ? "edit-cpf red-border-warning" : "edit-cpf"}
              mask="999.999.999-99"
            />
            { userEditErrors
          && (userEditErrors.cpfExists || userEditErrors.invalidCpf) && <h4 className={userEditErrors.cpfExists || userEditErrors.invalidCpf ? "user-edit-below-input-errors" : "hidden"}>{userEditErrors.cpfExists || userEditErrors.invalidCpf}</h4> }
          </Box>
          <Box className="user-edit-modal-phone">
            <label htmlFor="edit-phone">Telefone</label>
            <InputMask
              onChange={(e) => setEditPhone(e.target.value)}
              value={editPhone}
              placeholder="Digite seu Telefone"
              id="edit-phone"
              mask="(99) 9 9999-9999"
            />
          </Box>
        </Box>
        <Box />
        <Box className="edit-user-modal-lower-inputs">
          <label htmlFor="edit-new-pass">Nova senha</label>
          <input
            onChange={(e) => setEditPass(e.target.value)}
            value={editPass}
            id={editPass !== editConfirmPass ? "red-border-warning" : "edit-new-pass"}
            type="password"
            placeholder="Informe sua nova senha"
          />
          {editPass !== editConfirmPass && <b className="user-edit-below-input-errors">As senhas não coincidem!</b>}
          <label htmlFor="edit-pass-confirm">Confirmar senha</label>
          <input
            onChange={(e) => setEditConfirmPass(e.target.value)}
            value={editConfirmPass}
            id={editPass !== editConfirmPass ? "red-border-warning" : "edit-pass-confirm"}
            type="password"
            placeholder="Confirme sua senha"
          />
          {editPass !== editConfirmPass && <b className="user-edit-below-input-errors">As senhas não coincidem!</b>}
        </Box>
        <Box className="edit-user-modal-button">
          <button onClick={() => handleEditUser()} type="submit">Aplicar</button>
        </Box>
      </Box>
      )}
    </Box>
  );
}
