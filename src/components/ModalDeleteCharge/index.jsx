/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import Draggable from "react-draggable";
import useData from "../../hooks/useData";
import Toastify from "../../helpers/toastify/Toastify";
import ToastifyError from "../../helpers/toastify/ToastifyError";
import close from "../../assets/close.svg";
import alert from "../../assets/alert-delete.svg";
import "./style.css";
import { modalClientStyles } from "./styles";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={"[class*=\"MuiDialogContent-root\"]"}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function ModalDeleteCharge() {
  const {
    openModalDelete, handleCloseModalDelete, getIdChargeForDelete, token,
    setRefreshPage, refreshPage,
  } = useData();

  const handleDeleteOneCharge = async () => {
    try {
      const responseReqDelete = await fetch(
        `https://payment-system-app-api.herokuapp.com/charges/${getIdChargeForDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const resultReq = await responseReqDelete.json();
      const resultReqStatus = responseReqDelete.status;
      if (resultReqStatus === 200) {
        Toastify(resultReq);
      }

      if (resultReqStatus !== 200) {
        ToastifyError(resultReq);
      }
    } catch (error) {
      ToastifyError(error.message);
    }
    setRefreshPage(!refreshPage);
    handleCloseModalDelete();
  };

  return (
    <div>
      <Dialog
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        PaperProps={{
          style: { borderRadius: "3rem", width: "76rem" },
        }}
      >
        <DialogTitle
          sx={modalClientStyles.dialogTitle}
          id="draggable-dialog-title"
        >
          <Box
            display="flex"
            sx={{ width: "100%" }}
          >
            <Box sx={modalClientStyles.boxHeaderLeft} />
            <Box sx={modalClientStyles.boxCloseIcon}>
              <IconButton
                disableRipple
                onClick={handleCloseModalDelete}
              >
                <img src={close} alt="fechar" />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box className="container-modal-client">
            <Box className="container-modal-client-image">
              <img src={alert} alt="Alerta" />
            </Box>
            <Box className="container-modal-client-phrase">
              <h1>Tem certeza que deseja excluir esta cobrança?</h1>
            </Box>
            <Box className="container-modal-client-buttons">
              <Box className="container-modal-client-button-decline">
                <button onClick={handleCloseModalDelete} type="button">Não</button>
              </Box>
              <Box className="container-modal-client-button-confirm">
                <button onClick={handleDeleteOneCharge} type="button">Sim</button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>

  );
}

export default ModalDeleteCharge;
