/* eslint-disable jsx-a11y/control-has-associated-label */
import "./styles.css";
import { Box } from "@mui/system";
import deleteIcon from "../../assets/delete-icon.svg";
import editIcon from "../../assets/edit-icon.svg";
import useData from "../../hooks/useData";

export default function ChargesDetails({
  idCobr, date, value, statusCobr, description,
}) {
  const {
    openModalDetails, setOpenModalDetails, setDetailsModal,
    openModalEditingCharge, setOpenModalEditingCharge, setEditingCustomerData,
    handleCloseModalDelete, setGetIdChargeForDelete,
  } = useData();
  const statusCobrFormatted = statusCobr[0].toUpperCase() + statusCobr.substr(1);

  const handleOpenModalDetails = () => {
    setDetailsModal({
      idCobr, date, value, statusCobrFormatted, description,
    });
    setOpenModalDetails(!openModalDetails);
  };

  const pushingDataToEdit = () => {
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
    <Box className="chargescustomer-details">
      <button type="button" className="button-charges" onClick={handleOpenModalDetails}>
        <Box className="idCobr">
          <p>{idCobr}</p>
        </Box>
        <Box className="date">
          <p>{date}</p>
        </Box>
        <Box className="value">
          <p>{value}</p>
        </Box>
        <Box className="status">
          <p className={statusCobrFormatted === "Paga" ? "pay" : "pending"}>{statusCobrFormatted}</p>
        </Box>
        <Box className="description">
          <p>{description}</p>
        </Box>
      </button>
      <Box className="icons">
        <button onClick={handleChangeModalToEditing} className="details-icons" type="button"><img src={editIcon} alt="" /></button>
        <button onClick={handlePushInfoAboutCharges} className="details-icons" type="button"><img src={deleteIcon} alt="" /></button>
      </Box>
    </Box>
  );
}
