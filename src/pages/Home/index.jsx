import { Box } from "@mui/system";
import "./styles.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import MiniDrawer from "../../components/Sidebar/index";
import useData from "../../hooks/useData";
import PaidChargesCard from "./components/summaryChargesCards/paidChargesCard/PaidChargesCard";
import ExpectedChargesCard from "./components/summaryChargesCards/expectedChargesCard/ExpectedChargesCard";
import OverdueChargesCard from "./components/summaryChargesCards/overdueChargesCard/OverdueChargesCard";
import DefaulterCustomerCard from "./components/summaryCustomersCards/defaulterCustomerCard/DefaulterCard";
import UpToDateCustomerCard from "./components/summaryCustomersCards/upToDateCustomerCard/UpToDateCard";
import ModalToEdit from "./components/UserEditModal";

export default function Home() {
  const navigate = useNavigate();
  const {
    handleSummaryCharges,
    handleSummaryCustomers,
    setActualPage,
    token,
    openUserEditModal,
    setUserPopUp,
  } = useData();
  useEffect(() => {
    if (token === "jwt expired") {
      navigate("/");
    }
  });
  useEffect(() => {
    if (token) {
      setActualPage("home");
    }
  }, []);

  useEffect(() => {
    const loadChargesSummary = async () => {
      await handleSummaryCharges();
    };

    loadChargesSummary();
  }, []);

  useEffect(() => {
    const loadCustomersSummary = async () => {
      await handleSummaryCustomers();
    };

    loadCustomersSummary();
  }, []);

  useEffect(() => {
    setUserPopUp(false);
  }, []);

  return (
    <Box className="container-home">
      {openUserEditModal && <ModalToEdit />}
      <Box className="sidebar-home">
        <MiniDrawer />
      </Box>
      <Box className="main-home">
        <Box className="container-header">
          <Header />
        </Box>
        <Box className="home-charges-cards-container">
          <PaidChargesCard />
          <OverdueChargesCard />
          <ExpectedChargesCard />
        </Box>
        <Box className="home-customers-cards-container">
          <DefaulterCustomerCard />
          <UpToDateCustomerCard />
        </Box>
      </Box>
    </Box>
  );
}
