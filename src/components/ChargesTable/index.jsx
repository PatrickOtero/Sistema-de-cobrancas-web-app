import { IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import { useState } from "react";
import sortIcon from "../../assets/sortIcon.svg";
import sortIconAsc from "../../assets/sortIconAsc.svg";
import sortIconDesc from "../../assets/sortIconDesc.svg";
import TableBodyCharges from "../ChargesTableBody";
import useData from "../../hooks/useData";
import "./styles.css";
import emptySearch from "../../assets/emptySearch.svg";

export default function TableComponent({
  rowsCharge, setRowsCharge,
  sortedCharges, loadCharges,
}) {
  const [sortIdType, setSortIdType] = useState("");
  const [sortNameType, setSortNameType] = useState("");

  const {
    paidFilter, expectedFilter,
    overdueFilter, chargesSummaryData,
    homeFilter, chargesLoading, searchFieldCustomers,
  } = useData();

  const handleOrderByName = () => {
    if (sortIdType !== "") {
      setSortIdType("");
    }
    if (sortNameType === "") {
      setSortNameType("asc");
      setRowsCharge(sortedCharges.orderByName);
      return;
    }
    if (sortNameType === "asc") {
      setSortNameType("desc");
      setRowsCharge(sortedCharges.orderByNameDesc);
      return;
    }
    if (sortNameType === "desc") {
      setSortNameType("");
      loadCharges();
    }
  };
  const handleOrderById = () => {
    if (sortNameType !== "") {
      setSortNameType("");
    }

    if (sortIdType === "") {
      setSortIdType("asc");
      setRowsCharge(sortedCharges.orderById);
      return;
    }
    if (sortIdType === "asc") {
      setSortIdType("desc");
      setRowsCharge(sortedCharges.orderByIdDesc);
      return;
    }
    if (sortIdType === "desc") {
      setSortIdType("");
      loadCharges();
    }
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: "2rem", maxHeight: "50rem" }}>
      <Table aria-label="caption table">
        <TableHead>
          {rowsCharge.length > 0 && (
          <TableRow>
            <TableCell style={{ fontSize: "1.6rem" }} align="left">
              <Box display="flex" alignItems="center">
                <IconButton disableRipple onClick={handleOrderByName}>
                  {sortNameType === "" && <img src={sortIcon} alt="sort" />}
                  {sortNameType === "asc" && <img src={sortIconAsc} alt="sort" />}
                  {sortNameType === "desc" && <img src={sortIconDesc} alt="sort" />}
                </IconButton>
                Cliente
              </Box>
            </TableCell>
            <TableCell style={{ fontSize: "1.6rem" }} align="left">
              <Box display="flex" alignItems="center">
                <IconButton disableRipple onClick={handleOrderById}>
                  {sortIdType === "" && <img src={sortIcon} alt="sort" />}
                  {sortIdType === "asc" && <img src={sortIconAsc} alt="sort" />}
                  {sortIdType === "desc" && <img src={sortIconDesc} alt="sort" />}
                </IconButton>
                ID cob.
              </Box>
            </TableCell>
            <TableCell style={{ fontSize: "1.6rem" }} align="left">
              Valor
            </TableCell>
            <TableCell style={{ fontSize: "1.6rem" }} align="left">
              Data de venc.
            </TableCell>
            <TableCell style={{ fontSize: "1.6rem" }} align="left">
              Status
            </TableCell>
            <TableCell style={{ fontSize: "1.6rem" }} align="left">
              Descrição
            </TableCell>
            <TableCell style={{ fontSize: "1.6rem" }} align="left" />
          </TableRow>
          )}
        </TableHead>
        <TableBody>
          {chargesLoading && (
          <div className="loading-backdrop-charges">
            <div className="loading-charges">
              <div className="loader-charges" />
            </div>
          </div>
          )}
          { !chargesLoading && (paidFilter || expectedFilter || overdueFilter)
           && chargesSummaryData[homeFilter]
            && chargesSummaryData[homeFilter].map((charge) => (
              <TableBodyCharges
                key={charge.id}
                nameCustomer={charge.name_customer}
                description={charge.description}
                idCobr={charge.id}
                date={charge.duedate}
                statusCobrFormatted={charge.status}
                value={charge.value}
              />
            ))}

          {!chargesLoading && !paidFilter && !expectedFilter && !overdueFilter
           && rowsCharge.length > 0 ? rowsCharge.map((row) => (
             <TableBodyCharges
               key={row.id}
               nameCustomer={row.name_customer}
               description={row.description}
               idCobr={row.id}
               date={row.duedate}
               statusCobrFormatted={row.status}
               value={row.value}
             />
            ))
            : !chargesLoading && searchFieldCustomers && (
              <Box sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "2rem",
              }}
              >
                <Box
                  component="img"
                  src={emptySearch}
                  alt="sem resultados pesquisa"
                  width="70rem"
                />
              </Box>
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
