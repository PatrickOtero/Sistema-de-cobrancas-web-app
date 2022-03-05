import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import CustomersBarUpside from "../../components/CustomersBarUpside/index";
import CustomersTable from "../../components/CustomersTable";
import ModalClient from "../../components/ModalClient/index";
import Sidebar from "../../components/Sidebar/index";
import ToastifyError from "../../helpers/toastify/ToastifyError";
import useData from "../../hooks/useData";
import Header from "../../components/Header";
import UserEditModal from "../Home/components/UserEditModal";
import "./styles.css";

export default function Customers() {
  const [openModalClient, setOpenModalClient] = useState(false);
  const [custumersChanged, setCustumersChanged] = useState();
  const [editingCostumer, setEditingCostumer] = useState();
  const [rows, setRows] = useState([]);
  const [sortedCustomers, setSortedCustomers] = useState();
  const {
    setActualPage, token, openUserEditModal, setCustomersLoading,
  } = useData();

  const loadSortedCustomers = async () => {
    try {
      setCustomersLoading(true);
      const response = await fetch("https://payment-system-app-api.herokuapp.com/customers/filters/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      setSortedCustomers(result);
      setCustomersLoading(false);
    } catch (error) {
      setCustomersLoading(false);
      ToastifyError(error.message);
    }
  };
  const loadCustomers = async () => {
    try {
      setCustomersLoading(true);
      const response = await fetch(
        "https://payment-system-app-api.herokuapp.com/customers",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result = await response.json();

      setRows(result);
      setCustomersLoading(false);
    } catch (error) {
      setCustomersLoading(false);
      ToastifyError(error.message);
    }
  };

  useEffect(() => {
    setActualPage("customers");
    loadCustomers();
    loadSortedCustomers();
  }, [custumersChanged]);

  return (
    <Box display="flex" width="100vw" height="100vh" justifyContent="center">
      <Sidebar />
      <Box width="100%" height="100%" bgcolor="#F8F8F9">
        <Box margin="-1.3rem 0 0 4rem">
          <Header headerTitle="Clientes" customersPage="true" />
        </Box>
        <Box heigth="100%">
          {openUserEditModal && <UserEditModal />}
          <Box height="100%" margin="4rem 10rem" className="customers-table">
            <Box className="customers-upside">
              <CustomersBarUpside
                setRows={setRows}
                setOpenModal={setOpenModalClient}
                setEditingCostumerId={setEditingCostumer}
                loadCustomers={loadCustomers}
              />
            </Box>
            <Box className="customers-table">
              <CustomersTable
                rows={rows}
                setRows={setRows}
                loadCustomers={loadCustomers}
                setOpenModal={setOpenModalClient}
                setEditingCostumer={setEditingCostumer}
                editingCostumer={editingCostumer}
                sortedCustomers={sortedCustomers}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <ModalClient
        editingCostumerId={editingCostumer}
        openModal={openModalClient}
        setOpenModal={setOpenModalClient}
        setCustumersChanged={setCustumersChanged}
        editingCostumer={editingCostumer}
        setEditingCostumer={setEditingCostumer}
      />
    </Box>
  );
}
