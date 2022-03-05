import { Box } from "@mui/system";
import "../generalStyles.css";
import "./styles.css";
// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import iconeCobrancaPaga from "../../../assets/icone-cobranca-paga.svg";
import useData from "../../../../../hooks/useData";

function PaidChargesCard() {
  const {
    chargesSummaryData, summaryChargesMsg,
    homeLoading, setPaidFilter, setHomeFilter,
  } = useData();

  const navigate = useNavigate();

  return (
    <Box className="charges-card-container">
      <Box className="colored-charges-upper-card paid">
        <Box className="upper-card-icon-container">
          <img src={iconeCobrancaPaga} alt="ícone de cobranças previstas" />
        </Box>
        <Box className="upper-card-texts-container">
          <b className="upper-card-text">Cobranças pagas</b>
          <b className="upper-card-value">{chargesSummaryData.totalPaidValue}</b>
        </Box>
      </Box>
      <Box className="charges-card">
        <Box className="charges-card-header">
          <b className="charges-card-header-text">Cobranças pagas</b>
          <Box className="charges-card-small-colored-value-card paid">
            {chargesSummaryData.paid && <b>{chargesSummaryData.paid.length}</b>}
          </Box>
        </Box>
        <Box className="charges-card-table-head">
          <Box className="first-text">
            <span>Cliente</span>
          </Box>
          <Box className="second-text">
            <span>ID da cob.</span>
          </Box>
          <Box className="third-text">
            <span>Valor</span>
          </Box>
        </Box>
        <Box className="charges-card-table-body">
          {homeLoading && (
          <div className="loading-backdrop">
            <div className="loading-home">
              <div className="loader-home" />
            </div>
          </div>
          )}
          { chargesSummaryData.paid
          && chargesSummaryData.paid.map((chargeSummary) => (
            <Box key={chargeSummary.id} className="charges-card-table-line">
              <Box className="first-text">
                <span>{chargeSummary.name_customer}</span>
              </Box>
              <Box className="second-text">
                <span>{chargeSummary.id}</span>
              </Box>
              <Box className="third-text">
                <span>{chargeSummary.value}</span>
              </Box>
            </Box>
          ))}
          <b className="empty-charges-list-info-phrase">{summaryChargesMsg || chargesSummaryData.emptyPaid}</b>
        </Box>
        <Box className="charges-card-table-bottom">
          <button
            onClick={() => {
              setHomeFilter("paid");
              setPaidFilter(true);
              navigate("/cobrancas");
            }}
            className="bottom-charges-card-link"
            type="button"
          >
            Ver todos

          </button>
        </Box>
      </Box>
    </Box>
  );
}

export default PaidChargesCard;
