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
import { useNavigate } from "react-router-dom";
import defaulter from "../../assets/defaulter.svg";
import newCharge from "../../assets/newCharge.svg";
import noun from "../../assets/noun.svg";
import sortIcon from "../../assets/sortIcon.svg";
import sortIconAsc from "../../assets/sortIconAsc.svg";
import sortIconDesc from "../../assets/sortIconDesc.svg";
import useData from "../../hooks/useData";
import { CustomTableCell } from "../CustomTableCell";
import ModalCharge from "../ModalCharge";
import "./styles.css";
import emptySearch from "../../assets/emptySearch.svg";

export default function TableComponent({
  rows, setRows, sortedCustomers, loadCustomers,
}) {
  const {
    setCurrentClientId, handleCustomerDetails,
    openModalCharge, setOpenModalCharge,
    setCurrentCustomerName, customersSummaryData,
    defaulterFilter, upToDateFilter,
    homeFilter, customersLoading,
    searchFieldCustomers,
  } = useData();

  const navigate = useNavigate();

  const [sortType, setSortType] = useState("");

  const handleGetId = (id) => {
    navigate(`/clientes/${id}`);
  };

  const handleOpenChargeModal = (name) => {
    setCurrentCustomerName(name);
    setOpenModalCharge(!openModalCharge);
  };

  const handleOrderByName = async () => {
    if (sortType === "") {
      setSortType("asc");
      setRows(sortedCustomers.orderByName);
    }
    if (sortType === "asc") {
      setSortType("desc");
      setRows(sortedCustomers.orderByNameDesc);
    }
    if (sortType === "desc") {
      setSortType("");
      loadCustomers();
    }
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: "2rem", maxHeight: "50rem" }}>
      <Table aria-label="caption table">
        <TableHead>
          {rows.length > 0
        && (
        <TableRow>
          <TableCell style={{ fontSize: "1.6rem" }} align="left">
            <Box display="flex" alignItems="center">
              <IconButton disableRipple onClick={handleOrderByName}>
                {sortType === "" && <img src={sortIcon} alt="sort" />}
                {sortType === "asc" && <img src={sortIconAsc} alt="sort" />}
                {sortType === "desc" && <img src={sortIconDesc} alt="sort" />}
              </IconButton>
              Cliente
            </Box>
          </TableCell>
          <TableCell style={{ fontSize: "1.6rem" }} align="left">
            CPF
          </TableCell>
          <TableCell style={{ fontSize: "1.6rem" }} align="left">
            E-mail
          </TableCell>
          <TableCell style={{ fontSize: "1.6rem" }} align="left">
            Telefone
          </TableCell>
          <TableCell style={{ fontSize: "1.6rem" }} align="left">
            Status
          </TableCell>
          <TableCell style={{ fontSize: "1.6rem" }} align="left">
            Criar cobrança
          </TableCell>
        </TableRow>
        )}
        </TableHead>
        <TableBody>
          {customersLoading && (
          <div className="loading-backdrop-customers">
            <div className="loading-customers">
              <div className="loader-customers" />
            </div>
          </div>
          )}
          {!customersLoading && (defaulterFilter || upToDateFilter)
           && customersSummaryData[homeFilter]
            && customersSummaryData[homeFilter].map((customer) => (
              <TableRow key={customer.id} sx={{ fontSize: "1.2rem" }}>
                <CustomTableCell align="left">
                  <IconButton
                    disableRipple
                    onClick={() => {
                      handleGetId(customer.id);
                      setCurrentClientId(customer.id);
                      handleCustomerDetails(customer.id);
                    }}
                  >
                    {customer.name_customer}
                  </IconButton>
                </CustomTableCell>
                <CustomTableCell align="left">
                  {customer.cpf}
                </CustomTableCell>
                <CustomTableCell align="left">{customer.email}</CustomTableCell>
                <CustomTableCell align="left">
                  {customer.phone}
                </CustomTableCell>
                <CustomTableCell align="left">
                  {customer.status === "Inadimplente" ? <img src={defaulter} alt="Inadimplente" /> : <img src={noun} alt="em dia" />}
                </CustomTableCell>
                <CustomTableCell align="left">
                  <IconButton
                    onClick={() => handleOpenChargeModal(customer.name_customer)}
                    disableRipple
                  >
                    <img src={newCharge} alt="Criar cobrança" />
                  </IconButton>
                </CustomTableCell>
              </TableRow>
            ))}
          {!customersLoading && (!defaulterFilter && !upToDateFilter)
           && rows.length > 0 ? rows.map((row) => (
             <TableRow hover="background-color: #F8F8F9" key={row.id} sx={{ fontSize: "1.2rem" }}>
               <CustomTableCell align="left">
                 <IconButton
                   disableRipple
                   onClick={() => {
                     handleGetId(row.id);
                     setCurrentClientId(row.id);
                     handleCustomerDetails(row.id);
                   }}
                 >
                   {row.name_customer}
                 </IconButton>
               </CustomTableCell>
               <CustomTableCell align="left">
                 {row.cpf}
               </CustomTableCell>
               <CustomTableCell align="left">{row.email}</CustomTableCell>
               <CustomTableCell align="left">
                 {row.phone}
               </CustomTableCell>
               <CustomTableCell align="left">
                 {row.status === "Inadimplente" ? <img src={defaulter} alt="Inadimplente" /> : <img src={noun} alt="Em dia" />}
               </CustomTableCell>
               <CustomTableCell>
                 <IconButton onClick={() => handleOpenChargeModal(row.name_customer)} disableRipple>
                   <img src={newCharge} alt="Criar cobrança" />
                 </IconButton>
               </CustomTableCell>
             </TableRow>

            )) : !customersLoading && searchFieldCustomers && (
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
        {openModalCharge && <ModalCharge />}
      </Table>
    </TableContainer>
  );
}
