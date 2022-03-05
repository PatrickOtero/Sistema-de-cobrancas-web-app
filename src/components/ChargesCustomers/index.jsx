/* eslint-disable jsx-a11y/control-has-associated-label */
import "./styles.css";
import { Box } from "@mui/system";
import { useEffect } from "react";
import arrowUpDown from "../../assets/arrowupdown.svg";
import ChargesDetails from "../ChargesDetails";
import useData from "../../hooks/useData";

export default function ChargesCustomers({ onClick }) {
  const {
    setActualPage, charges,
    handleGetChargesCustomer, setCurrentClientId,
    currentClientId, chargesMsg, openModalCharge,
    openModalDelete, openModalEditingCharge, chargesCustomerLoading,
  } = useData();

  useEffect(async () => {
    setActualPage("customers");
  }, []);
  useEffect(() => {
    setCurrentClientId(currentClientId);
    const handleLoadCharges = async () => {
      await handleGetChargesCustomer(currentClientId);
    };
    handleLoadCharges();
  }, [openModalCharge || openModalEditingCharge || openModalDelete]);
  return (
    <Box className="container-chargescustomer">
      <Box className="chargescustomer-header">
        <h2>Cobranças do cliente</h2>
        <button onClick={onClick} type="button" className="newcharge-button">+ Nova cobrança</button>
      </Box>
      <Box className="chargescustomer-data">
        <Box>
          <button className="filter-button" type="button">
            <img src={arrowUpDown} alt="" />
            ID Cob.
          </button>
        </Box>
        <Box>
          <button className="filter-button" type="button">
            <img src={arrowUpDown} alt="" />
            Data de venc.
          </button>
        </Box>
        <Box />
        <Box>
          <h6>Valor</h6>
        </Box>
        <Box />
        <Box>
          <h6>Status</h6>
        </Box>
        <Box />
        <Box>
          <h6>Descrição</h6>
        </Box>
      </Box>
      {chargesCustomerLoading && (
      <div className="loading-backdrop-charges-customer">
        <div className="loading-charges-customer">
          <div className="loader-charges-customer" />
        </div>
      </div>
      )}
      {!chargesCustomerLoading && chargesMsg && <p className="error-message">{chargesMsg}</p>}
      {!chargesCustomerLoading && !chargesMsg && charges.length > 0 && charges.map((charge) => (
        <ChargesDetails
          idCobr={charge.id}
          date={charge.duedate}
          value={charge.value}
          statusCobr={charge.status}
          description={charge.description}
        />
      ))}
    </Box>
  );
}
