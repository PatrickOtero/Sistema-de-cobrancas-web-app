/* eslint-disable react/destructuring-assignment */
import "./styles.css";
import { Box } from "@mui/system";
import editClient from "../../assets/edit-client.svg";
import useData from "../../hooks/useData";

export default function DataUsers({ onClick }) {
  const {
    currentClientData, customersDetailsLoading,
  } = useData();
  return (
    <Box className="container-datausers">
      <Box className="datausers-header">
        <h2>Dados do cliente</h2>
        <button onClick={onClick} type="button" className="edit-button">
          <img src={editClient} alt="" />
          Editar cliente
        </button>
      </Box>
      {customersDetailsLoading && (
      <div className="loading-backdrop-customers-details">
        <div className="loading-customers-details">
          <div className="loader-customers-details" />
        </div>
      </div>
      )}
      {!customersDetailsLoading && currentClientData && (
        <>
          <Box className="datausers-data">
            <Box>
              <h6>E-mail</h6>
              <p>{currentClientData.email}</p>
            </Box>
            <Box>
              <h6>Telefone</h6>
              <p>{currentClientData.phone}</p>
            </Box>
            <Box>
              <h6>CPF</h6>
              <p>{currentClientData.cpf}</p>
            </Box>
            <Box />
            <Box />
            <Box />
          </Box>
          <Box className="datausers-data second-data">
            <Box>
              <h6>Endereço</h6>
              <p>{currentClientData.address}</p>
            </Box>
            <Box>
              <h6>Bairro</h6>
              <p>{currentClientData.neighborhood}</p>
            </Box>
            <Box>
              <h6>Complemento</h6>
              <p>{currentClientData.complement}</p>
            </Box>
            <Box>
              <h6>CEP</h6>
              <p>{currentClientData.zip_code}</p>
            </Box>
            <Box>
              <h6>Cidade</h6>
              <p>{currentClientData.city}</p>
            </Box>
            <Box>
              <h6>UF</h6>
              <p>{currentClientData.state}</p>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
