import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/index";
import ChargesBarUpside from "../../components/ChargesBarUpside";
import ChargesTable from "../../components/ChargesTable";
import useData from "../../hooks/useData";
import ToastifyError from "../../helpers/toastify/ToastifyError";
import Header from "../../components/Header";
import ModalToEdit from "../Home/components/UserEditModal";
import ModalEditCharge from "../../components/ModalEditCharge";
import ModalDeleteCharge from "../../components/ModalDeleteCharge";
import ModalDetails from "../../components/ModalDetails";
import "./styles.css";

export default function Charges() {
  const [rowsCharge, setRowsCharge] = useState([]);
  const {
    setActualPage, token, openUserEditModal, detailsModal, openModalCharge,
    openModalEditingCharge, openModalDetails, currentCustomerName, refreshPage, setChargesLoading,
  } = useData();
  const [sortedCharges, setSortedCharges] = useState();

  const loadCharges = async () => {
    try {
      setChargesLoading(true);
      const response = await fetch(
        "https://payment-system-app-api.herokuapp.com/charges",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result = await response.json();

      setRowsCharge(result);
      setChargesLoading(false);
    } catch (error) {
      setChargesLoading(false);
      ToastifyError(error.message);
    }
  };

  const loadSortedCharges = async () => {
    try {
      const response = await fetch("https://payment-system-app-api.herokuapp.com/charges/filters/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      setSortedCharges(result);
    } catch (error) {
      ToastifyError(error.message);
    }
  };

  useEffect(() => {
    setActualPage("charges");
    loadCharges();
    loadSortedCharges();
  }, [openModalCharge || openModalEditingCharge || refreshPage]);

  return (
    <Box display="flex" width="100vw" height="100vh">
      <Sidebar />
      <Box width="100%" height="100%" bgcolor="#F8F8F9">
        <Box margin="-1.3rem 0 0 4rem">
          <Header customersPage="true" headerTitle="Cobranças" />
        </Box>
        {openUserEditModal && <ModalToEdit />}
        {openModalEditingCharge && <ModalEditCharge />}
        {openModalDetails && (
          <ModalDetails
            nameCustomer={currentCustomerName}
            description={detailsModal.description}
            duedate={detailsModal.date}
            value={detailsModal.value}
            idCobr={detailsModal.idCobr}
            status={detailsModal.statusCobrFormatted}
          />
        )}
        <ModalDeleteCharge />
        <Box heigth="100%">
          <Box height="100%" margin="4rem 10rem">
            <Box className="charges-upside">
              <ChargesBarUpside setRowsCharge={setRowsCharge} loadCharges={loadCharges} />
            </Box>
            <Box className="charges-table">
              <ChargesTable
                loadCharges={loadCharges}
                rowsCharge={rowsCharge}
                setRowsCharge={setRowsCharge}
                sortedCharges={sortedCharges}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
