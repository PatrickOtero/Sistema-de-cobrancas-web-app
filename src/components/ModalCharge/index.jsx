/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { yupResolver } from "@hookform/resolvers/yup";
import { IconButton, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { useEffect } from "react";
import Draggable from "react-draggable";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import NumberFormat from "react-number-format";
import close from "../../assets/close.svg";
import documentImage from "../../assets/document.svg";
import Toastify from "../../helpers/toastify/Toastify";
import ToastifyError from "../../helpers/toastify/ToastifyError";
import useData from "../../hooks/useData";
import schemaCharges from "../../validations/schemaCharge";
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

function ModalCharge() {
  const {
    setOpenModalCharge, openModalCharge, currentCustomerName, token,
    currentCustomer, setAddingCharges, setChargesMsg, handleCustomerDetails, currentClientId,
  } = useData();

  useEffect(() => {
    const handleLoadDetailCustomer = async () => {
      await handleCustomerDetails(currentClientId);
    };
    handleLoadDetailCustomer();
  }, [openModalCharge]);

  const handleClose = () => {
    setOpenModalCharge(!openModalCharge);
  };

  const validationForm = { resolver: yupResolver(schemaCharges) };
  const {
    handleSubmit, control, register, formState: { errors },
  } = useForm(validationForm);
  const onSubmit = async ({
    duedateRaw, valueRaw, name_customer, description, status,
  }) => {
    const value = valueRaw.replace(/\.|,/g, "").replace("R$", "").replace("00", "");
    const duedate = duedateRaw.replace(/[/"]/g, "-");
    const bodyCharge = {
      name_customer, description, status, value, duedate, currentCustomer,
    };

    try {
      const response = await fetch(`https://payment-system-app-api.herokuapp.com/charges/${currentCustomer}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyCharge),
      });
      const bodyCharges = await response.json();
      const statusRequest = response.status;
      if (statusRequest === 200) {
        Toastify(bodyCharges);
        setChargesMsg("");
        setOpenModalCharge(!openModalCharge);
        setAddingCharges(bodyCharges);
      }

      if (statusRequest !== 200) {
        ToastifyError(bodyCharges);
      }
    } catch (error) {
      ToastifyError(error.message);
    }
  };

  return (
    <div>
      <Dialog
        open={openModalCharge}
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
                Cadastro de cobrança
              </Typography>
            </Box>
            <Box sx={modalClientStyles.boxCloseIcon}>
              <IconButton
                disableRipple
                onClick={handleClose}
              >
                <img src={close} alt="fechar" />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={modalClientStyles.boxDialogContent}>
              <Box className="input-modal-charge">
                <label htmlFor="input-name">Nome*</label>
                <input value={currentCustomerName} id="input-name" type="text" {...register("name_customer")} />
                <p className="errors">{errors.name?.message}</p>
              </Box>
              <Box className="input-modal-charge">
                <label htmlFor="input-description">Descrição*</label>
                <input className="input-description" id="input-description" type="text" {...register("description")} />
                <p className="errors">{errors.description?.message}</p>
              </Box>
              <Box className="input-due-value">
                <Box className="input-due">
                  <label htmlFor="input-due">Venc*</label>
                  <InputMask
                    mask="99/99/9999"
                    disabled={false}
                    maskChar=" "
                    id="input-due"
                    {...register("duedateRaw")}
                    placeholder="dd/mm/aaaa"
                  />
                  <p className="errors">{errors.duedateRaw?.message}</p>
                </Box>
                <Box className="input-value">
                  <label htmlFor="input-value">Valor*</label>
                  <Controller
                    name="valueRaw"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <NumberFormat
                        thousandsGroupStyle="thousand"
                        prefix="R$"
                        decimalSeparator=","
                        displayType="input"
                        type="text"
                        thousandSeparator="."
                        allowNegative={false}
                        decimalScale={2}
                        isNumericString={false}
                        fixedDecimalScale
                        onChange={onChange}
                      />
                    )}
                  />
                  <p className="errors">{errors.valueRaw?.message}</p>
                </Box>
              </Box>
              <Box className="modal_charge-section">
                <span className="status">Status*</span>
                <Box className="input-radio">
                  <Box className="input-pay">
                    <label htmlFor="input-pay" className="form-control">
                      <input value="Paga" id="input-pay" type="radio" name="radio" {...register("status")} />
                      <span>Cobrança Paga</span>
                    </label>
                  </Box>
                  <Box className="input-pending">
                    <label htmlFor="input-pending" className="form-control">
                      <input value="Pendente" id="input-pending" type="radio" name="radio" {...register("status")} />
                      <span>Cobrança Pendente</span>
                    </label>
                  </Box>
                  <p className="errors errors-status">{errors.status?.message}</p>
                </Box>
              </Box>
              <Box sx={modalClientStyles.boxFooterButtons}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleClose}
                  sx={modalClientStyles.buttonFooter}
                  style={{ backgroundColor: "#f8f8f9", color: "#0E8750" }}
                >
                  <Typography variant="h6" component="span">
                    Cancelar
                  </Typography>
                </Button>
                <Button
                  size="large"
                  variant="contained"
                  fullWidth
                  sx={modalClientStyles.buttonFooter}
                  type="submit"
                >
                  <Typography variant="h6" component="span">
                    Aplicar
                  </Typography>
                </Button>
              </Box>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </div>

  );
}

export default ModalCharge;
