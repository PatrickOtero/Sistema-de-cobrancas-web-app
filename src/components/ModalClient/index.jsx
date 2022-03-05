/* eslint-disable no-param-reassign */
// "no-param-reassign":"off"

import { yupResolver } from "@hookform/resolvers/yup";
import { IconButton, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import Draggable from "react-draggable";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import close from "../../assets/close.svg";
import costumersIcon from "../../assets/costumersIcon.svg";
import Toastify from "../../helpers/toastify/Toastify";
import ToastifyError from "../../helpers/toastify/ToastifyError";
import useData from "../../hooks/useData";
import { schemaClientName } from "../../validations/schemaClientName";
import CustomTextField from "../CustomTextField/index";
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

export default function ModalClient({
  openModal, setOpenModal, editingCostumer, setCustumersChanged,
}) {
  const { token } = useData();
  const validation = { resolver: yupResolver(schemaClientName) };
  const {
    control, handleSubmit, formState: { errors }, reset,
  } = useForm(validation);

  const onSubmit = async (data) => {
    if (!editingCostumer) {
      try {
        const response = await fetch("https://payment-system-app-api.herokuapp.com/customers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        const body = await response.json();
        if (response.status === 200) {
          Toastify("Cadastro concluido com sucesso");
          setCustumersChanged(response);
        }

        if (response.status !== 200) {
          ToastifyError(body);
          return;
        }
      } catch (error) {
        ToastifyError(error.message);
      }
    }

    if (editingCostumer) {
      try {
        const response = await fetch(`https://payment-system-app-api.herokuapp.com/customers/${editingCostumer.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        const body = await response.json();
        if (response.status === 200) {
          Toastify("Edições de cadastro concluidas com sucesso");
          setCustumersChanged(response);
        }

        if (response.status !== 200) {
          ToastifyError(body);
        }
      } catch (error) {
        ToastifyError(error.message);
      }
    }
    reset();
    setOpenModal(false);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Dialog
        open={openModal}
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
              <img src={costumersIcon} alt="clientes" />
              <Typography variant="h3" component="h1">
                {editingCostumer ? "Editar Cliente" : "Cadastro de Cliente"}
              </Typography>
            </Box>
            <Box sx={modalClientStyles.boxCloseIcon}>
              <IconButton disableRipple onClick={handleClose}>
                <img src={close} alt="fechar" />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={modalClientStyles.boxDialogContent}>
              <Box>
                <InputLabel required htmlFor="name_customer" sx={modalClientStyles.inputLabel}>Nome</InputLabel>
                <Controller
                  name="name_customer"
                  control={control}
                  defaultValue={editingCostumer && editingCostumer.name_customer}
                  render={({ field: { onChange } }) => (
                    <CustomTextField
                      id="name_customer"
                      field="Nome"
                      onChange={onChange}
                      defaultValue={editingCostumer && editingCostumer.name_customer}
                    />
                  )}
                  rules={{ required: true }}
                />
                <p style={modalClientStyles.requiredError}>{errors.name_customer?.message}</p>
              </Box>
              <Box>
                <InputLabel htmlFor="email" required sx={modalClientStyles.inputLabel}>Email</InputLabel>
                <Controller
                  name="email"
                  control={control}
                  defaultValue={editingCostumer && editingCostumer.email}
                  render={({ field: { onChange } }) => (
                    <CustomTextField
                      id="email"
                      field="Email"
                      onChange={onChange}
                      type="email"
                      defaultValue={editingCostumer && editingCostumer.email}
                    />
                  )}
                  rules={{ required: true }}
                />
                <p style={modalClientStyles.requiredError}>{errors.email?.message}</p>
              </Box>
              <Box display="flex" gap="2.4rem">
                <Box flexGrow={1}>
                  <InputLabel htmlFor="cpf" required sx={modalClientStyles.inputLabel}>CPF</InputLabel>
                  <Controller
                    name="cpf"
                    control={control}
                    defaultValue={editingCostumer && editingCostumer.cpf}
                    render={({ field: { onChange } }) => (
                      <InputMask
                        mask="999.999.999-99"
                        disabled={false}
                        maskChar=" "
                        onChange={onChange}
                        defaultValue={editingCostumer && editingCostumer.cpf}
                      >
                        {() => (
                          <TextField
                            id="cpf"
                            placeholder="Digite o CPF"
                            variant="outlined"
                            size="medium"
                            fullWidth
                            sx={modalClientStyles.textField}
                            inputProps={{ style: { fontSize: "1.2rem" } }}
                            defaultValue={editingCostumer && editingCostumer.cpf}
                          />
                        )}
                      </InputMask>

                    )}
                    rules={{ required: true }}
                  />
                  <p style={modalClientStyles.requiredError}>{errors.cpf?.message}</p>
                </Box>
                <Box flexGrow={1}>
                  <InputLabel htmlFor="phone" required sx={modalClientStyles.inputLabel}>Telefone</InputLabel>
                  <Controller
                    name="phone"
                    control={control}
                    defaultValue={editingCostumer && editingCostumer.phone}
                    render={({ field: { onChange } }) => (
                      <InputMask
                        defaultValue={editingCostumer && editingCostumer.phone}
                        mask="(99) 9 9999-9999"
                        disabled={false}
                        maskChar=" "
                        onChange={onChange}
                      >
                        {() => (
                          <TextField
                            id="phone"
                            placeholder="Digite o Telefone"
                            variant="outlined"
                            size="medium"
                            fullWidth
                            sx={modalClientStyles.textField}
                            inputProps={{ style: { fontSize: "1.2rem" } }}
                            defaultValue={editingCostumer && editingCostumer.phone}
                          />
                        )}
                      </InputMask>
                    )}
                    rules={{ required: true }}
                  />
                  <p style={modalClientStyles.requiredError}>{errors.phone?.message}</p>
                </Box>
              </Box>
              <Box>
                <InputLabel htmlFor="address" sx={modalClientStyles.inputLabel}>Endereço</InputLabel>
                <Controller
                  name="address"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <CustomTextField
                      id="address"
                      field="Endereço"
                      onChange={onChange}
                      value={editingCostumer && editingCostumer.address}
                    />
                  )}
                />
              </Box>
              <Box>
                <InputLabel htmlFor="complement" sx={modalClientStyles.inputLabel}>Complemento</InputLabel>
                <Controller
                  name="complement"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <CustomTextField
                      id="complement"
                      field="Complemento"
                      onChange={onChange}
                      value={editingCostumer && editingCostumer.complement}
                    />
                  )}
                />
              </Box>
              <Box display="flex" gap="2.4rem">
                <Box flexGrow={1}>
                  <InputLabel htmlFor="zip_code" sx={modalClientStyles.inputLabel}>CEP</InputLabel>
                  <Controller
                    name="zip_code"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <CustomTextField
                        id="zip_code"
                        field="CEP"
                        onChange={onChange}
                        value={editingCostumer && editingCostumer.zip_code}
                      />
                    )}
                  />
                </Box>
                <Box flexGrow={1}>
                  <InputLabel htmlFor="neighborhood" sx={modalClientStyles.inputLabel}>Bairro</InputLabel>
                  <Controller
                    name="neighborhood"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <CustomTextField
                        id="neighborhood"
                        field="Bairro"
                        onChange={onChange}
                        value={editingCostumer && editingCostumer.neighborhood}
                      />
                    )}
                  />
                </Box>
              </Box>

              <Box display="flex" gap="2.4rem">
                <Box flexGrow={1}>
                  <InputLabel htmlFor="city" sx={modalClientStyles.inputLabel}>Cidade</InputLabel>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <CustomTextField
                        id="city"
                        field="Cidade"
                        onChange={onChange}
                        value={editingCostumer && editingCostumer.city}
                      />
                    )}
                  />
                </Box>
                <Box flexGrow={0.1}>
                  <InputLabel htmlFor="state" sx={modalClientStyles.inputLabel}>UF</InputLabel>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <CustomTextField
                        id="state"
                        field="UF"
                        onChange={onChange}
                        value={editingCostumer && editingCostumer.state}

                      />
                    )}
                  />
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
