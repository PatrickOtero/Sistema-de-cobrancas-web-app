import { Box } from "@mui/system";
import "./styles.css";
import "../generalStyles.css";
import { useNavigate } from "react-router-dom";
import useData from "../../../../../hooks/useData";
import iconeClienteEmDia from "../../../assets/icone-cliente-em-dia.svg";

function UpToDateCustomerCard() {
  const {
    customersSummaryData, summaryCustomersMsg,
    homeLoading, setUpToDateFilter, setHomeFilter,
  } = useData();

  const navigate = useNavigate();

  return (
    <Box className="customer-card-container">
      <Box className="customer-card">
        <Box className="customer-card-header">
          <Box className="customer-card-left-elements">
            <img src={iconeClienteEmDia} alt="Ícone de cliente" />
            <b className="customer-card-header-text">Clientes em dia</b>
          </Box>
          <Box className="customer-card-small-colored-value-card upToDate">
            {customersSummaryData.upToDate && <b>{customersSummaryData.upToDate.length}</b>}
          </Box>
        </Box>
        <Box className="customer-card-table-head">
          <Box className="first-text">
            <b>Clientes</b>
          </Box>
          <Box className="second-text">
            <b>Id do clie.</b>
          </Box>
          <Box className="third-text">
            <b>Cpf</b>
          </Box>
        </Box>
        <Box className="customer-card-table-body">
          {homeLoading && (
          <div className="loading-backdrop">
            <div className="loading-home">
              <div className="loader-home" />
            </div>
          </div>
          )}
          { customersSummaryData.upToDate
          && customersSummaryData.upToDate.map((customersSummary) => (
            <Box key={customersSummary.id} className="customer-card-table-line">
              <Box className="first-text">
                <span>{customersSummary.name_customer}</span>
              </Box>
              <Box className="second-text">
                <span>{customersSummary.id}</span>
              </Box>
              <Box className="third-text">
                <span>{customersSummary.cpf}</span>
              </Box>
            </Box>
          ))}
          <b className="empty-customer-list-info-phrase">{summaryCustomersMsg || customersSummaryData.emptyUpToDate}</b>
        </Box>
        <Box className="customer-card-table-bottom">
          <button
            onClick={() => {
              setHomeFilter("upToDate");
              setUpToDateFilter(true);
              navigate("/clientes");
            }}
            className="bottom-customer-card-link"
            type="button"
          >
            Ver todos

          </button>
        </Box>
      </Box>
    </Box>
  );
}

export default UpToDateCustomerCard;
