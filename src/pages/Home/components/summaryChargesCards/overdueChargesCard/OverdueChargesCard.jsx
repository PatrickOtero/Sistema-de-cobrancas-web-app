import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import useData from "../../../../../hooks/useData";
import iconeCobrançaVencida from "../../../assets/icone-cobranca-vencida.svg";
import "../generalStyles.css";
import "./styles.css";

function OverdueChargesCard() {
  const {
    chargesSummaryData, summaryChargesMsg,
    homeLoading, setOverdueFilter, setHomeFilter,
  } = useData();

  const navigate = useNavigate();

  return (
    <Box className="charges-card-container">
      <Box className="colored-charges-upper-card overdue">
        <Box className="upper-card-icon-container">
          <img src={iconeCobrançaVencida} alt="ícone de cobranças previstas" />
        </Box>
        <Box className="upper-card-texts-container">
          <b className="upper-card-text">Cobranças vencidas</b>
          <b className="upper-card-value">{chargesSummaryData.totalOverdueValue}</b>
        </Box>
      </Box>
      <Box className="charges-card">
        <Box className="charges-card-header">
          <b className="charges-card-header-text">Cobranças vencidas</b>
          <Box className="charges-card-small-colored-value-card overdue">
            {chargesSummaryData.overdue && <b>{chargesSummaryData.overdue.length}</b>}
          </Box>
        </Box>
        <Box className="charges-card-table-head">
          <Box className="first-text">
            <b>Cliente</b>
          </Box>
          <Box className="second-text">
            <b>ID da cob.</b>
          </Box>
          <Box className="third-text">
            <b>Valor</b>
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
          { chargesSummaryData.overdue
          && chargesSummaryData.overdue.map((chargeSummary) => (
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
          <b className="empty-charges-list-info-phrase">{summaryChargesMsg || chargesSummaryData.emptyOverdue}</b>
        </Box>
        <Box className="charges-card-table-bottom">
          <button
            onClick={() => {
              setHomeFilter("overdue");
              setOverdueFilter(true);
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

export default OverdueChargesCard;
