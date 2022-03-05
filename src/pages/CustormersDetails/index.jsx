/* eslint-disable max-len */
import { Box } from "@mui/system";
import { useEffect } from "react";
import costumersIcon from "../../assets/costumersIcon.svg";
import ChargesCustomers from "../../components/ChargesCustomers";
import DataUsers from "../../components/DataUsers";
import ModalCharge from "../../components/ModalCharge";
import Sidebar from "../../components/Sidebar/index";
import useData from "../../hooks/useData";
import "./styles.css";
import ModalClient from "../../components/ModalClient";
import ModalDetails from "../../components/ModalDetails";
import ModalEditCharge from "../../components/ModalEditCharge";
import Header from "../../components/Header";
import ModalToEdit from "../Home/components/UserEditModal";
import ModalDeleteCharge from "../../components/ModalDeleteCharge";

function CustomersDetails() {
  const {
    setActualPage, setOpenModalCharge, openModalCharge,
    openModal, setCustumersChanged, editingCostumer,
    setEditingCostumer, currentCustomerName, handleCustomerDetails,
    currentClientId, currentClientData, setOpenModal, openUserEditModal, openModalDetails,
    detailsModal, openModalEditingCharge, customersDetailsLoading,
  } = useData();
  useEffect(() => {
    setActualPage("customers");
  }, []);

  useEffect(() => {
    const handleLoadDetailCustomer = async () => {
      await handleCustomerDetails(currentClientId);
    };
    handleLoadDetailCustomer();
  }, [openModal]);
  return (
    <Box display="flex" width="100vw" height="100vh">
      <Sidebar />
      <Box width="100%" height="100%" bgcolor="#F8F8F9">
        <Header
          customersPage="true"
          headerTitle="Clientes"
          signal=">"
          detailsPhrase="Detalhes do cliente"
        />
        {openUserEditModal && <ModalToEdit />}
        <Box heigth="100%">
          <Box height="100%" margin="4rem 10rem">
            {currentClientData && (
              <Box className="customers-header">
                <img src={costumersIcon} alt="" />
                {customersDetailsLoading && (
                <div className="loading-backdrop-details-header">
                  <div className="loading-details-header">
                    <div className="loader-details-header" />
                  </div>
                </div>
                )}
                {!customersDetailsLoading && <h1>{currentCustomerName}</h1>}
              </Box>
            )}
            <DataUsers onClick={setOpenModal} />
            <ChargesCustomers
              onClick={() => setOpenModalCharge(!openModalCharge)}
            />
          </Box>
        </Box>
      </Box>
      {openModalEditingCharge && <ModalEditCharge />}
      {openModalCharge && <ModalCharge />}
      {
        openModalDetails && (
          <ModalDetails
            nameCustomer={currentCustomerName}
            description={detailsModal.description}
            duedate={detailsModal.date}
            value={detailsModal.value}
            idCobr={detailsModal.idCobr}
            status={detailsModal.statusCobrFormatted}
          />
        )
      }
      <ModalClient
        editingCostumerId={editingCostumer}
        openModal={openModal}
        setOpenModal={setOpenModal}
        setCustumersChanged={setCustumersChanged}
        editingCostumer={editingCostumer}
        setEditingCostumer={setEditingCostumer}
      />
      <ModalDeleteCharge />
    </Box>
  );
}

export default CustomersDetails;
