import { IconButton, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import Draggable from "react-draggable";
import close from "../../assets/close.svg";
import documentImage from "../../assets/document.svg";
import useData from "../../hooks/useData";
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

function ModalDetails({
  nameCustomer, value, duedate, description, status, idCobr,
}) {
  const { openModalDetails, setOpenModalDetails } = useData();
  const handleClose = () => {
    setOpenModalDetails(!openModalDetails);
  };
  return (
    <div>
      <Dialog
        open={openModalDetails}
        onClose={handleClose}
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
            <Box sx={modalClientStyles.boxHeaderLeft}>
              <img src={documentImage} alt="clientes" />
              <Typography variant="h3" component="h1">
                Detalhe da cobrança
              </Typography>
            </Box>
            <Box sx={modalClientStyles.boxCloseIcon}>
              <IconButton disableRipple onClick={handleClose}>
                <img src={close} alt="fechar" />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent className="modal-details-container">
          <Box sx={modalClientStyles.boxDialogContent}>
            <Box>
              <span>Nome</span>
              <p className="modal-details-phrase">{nameCustomer}</p>
            </Box>
            <Box className="modal-details-descrip">
              <span>Descrição</span>
              <p className="modal-details-phrase">{description}</p>
            </Box>
            <Box className="modal-details-flex">
              <Box className="modal-details-space">
                <span>Vencimento</span>
                <p className="modal-details-phrase">{duedate}</p>
              </Box>
              <Box>
                <span>Valor</span>
                <p className="modal-details-phrase">{value}</p>
              </Box>
            </Box>
            <Box className="modal-details-flex">
              <Box className="modal-details-space">
                <span>ID Cobranças</span>
                <p className="modal-details-phrase">{idCobr}</p>
              </Box>
              <Box>
                <span>Status</span>
                <p className={status === "Paga" ? "pay" : "pending"}>{status}</p>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ModalDetails;
