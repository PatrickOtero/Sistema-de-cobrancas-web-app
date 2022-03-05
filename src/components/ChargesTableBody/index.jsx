/* eslint-disable camelcase */
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import TableRow from "@mui/material/TableRow";
import { CustomTableCell } from "../CustomTableCell";
import del from "../../assets/charges-icons/delete.svg";
import edit from "../../assets/charges-icons/edit.svg";
import overdue from "../../assets/charges-icons/overdue.svg";
import paid from "../../assets/charges-icons/paid.svg";
import pending from "../../assets/charges-icons/pending.svg";
import useData from "../../hooks/useData";
import "./styles.css";

function TableBodyCharges({
  nameCustomer, idCobr, value, date, statusCobrFormatted, description,
}) {
  const {
    openModalEditingCharge, setOpenModalEditingCharge, setEditingCustomerData,
    handleCloseModalDelete, setGetIdChargeForDelete, setCurrentCustomerName, setDetailsModal,
    setOpenModalDetails, openModalDetails,
  } = useData();

  const handleOpenModalDetails = () => {
    setCurrentCustomerName(nameCustomer);
    setDetailsModal({
      idCobr, date, value, statusCobrFormatted, description,
    });
    setOpenModalDetails(!openModalDetails);
  };

  const pushingDataToEdit = () => {
    setCurrentCustomerName(nameCustomer);
    setEditingCustomerData({
      idCobr, date, value, statusCobrFormatted, description,
    });
  };

  const handleChangeModalToEditing = () => {
    setOpenModalEditingCharge(!openModalEditingCharge);
    pushingDataToEdit();
  };

  const handlePushInfoAboutCharges = () => {
    setGetIdChargeForDelete(idCobr);
    handleCloseModalDelete();
  };
  return (
    <TableRow hover="background-color: #F8F8F9" key={idCobr} sx={{ fontSize: "1.2rem" }}>
      <CustomTableCell className="cursor-pointer" onClick={handleOpenModalDetails} align="left">
        {nameCustomer}
      </CustomTableCell>
      <CustomTableCell className="cursor-pointer" onClick={handleOpenModalDetails} align="left">
        {idCobr}
      </CustomTableCell>
      <CustomTableCell className="cursor-pointer" onClick={handleOpenModalDetails} align="left">
        {value}
      </CustomTableCell>
      <CustomTableCell className="cursor-pointer" onClick={handleOpenModalDetails} align="left">
        {
          date
        }
      </CustomTableCell>
      <CustomTableCell className="cursor-pointer" onClick={handleOpenModalDetails} align="left">
        {statusCobrFormatted === "Vencida" && <img src={overdue} alt="vencida" />}
        {statusCobrFormatted === "Pendente" && <img src={pending} alt="pendente" />}
        {statusCobrFormatted === "Paga" && <img src={paid} alt="paga" />}
      </CustomTableCell>
      <CustomTableCell onClick={handleOpenModalDetails} align="left">{description}</CustomTableCell>
      <CustomTableCell align="left">
        <Box display="flex">
          <IconButton onClick={handleChangeModalToEditing} disableRipple>
            <img src={edit} alt="editar" />
          </IconButton>

          <IconButton onClick={handlePushInfoAboutCharges} disableRipple>
            <img src={del} alt="excluir" />
          </IconButton>
        </Box>
      </CustomTableCell>
    </TableRow>
  );
}

export default TableBodyCharges;
