import { IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import defaulter from "../../assets/defaulter.svg";
import newCharge from "../../assets/newCharge.svg";
import noun from "../../assets/noun.svg";
import sortIcon from "../../assets/sortIcon.svg";
import Toastify from "../../helpers/toastify/Toastify";
import { CustomTableCell } from "../CustomTableCell";
import { tableComponentStyles } from "./styles";

export default function TableComponent({ newClient }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (newClient) {
      setRows([...rows, newClient]);
      Toastify("Cadastro concluido com sucesso!");
    }
  }, [newClient]);

  console.log("24234");
  return (
    <TableContainer component={Paper} sx={{ borderRadius: "2rem", maxHeight: "50rem" }}>
      <Table aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontSize: "1.6rem" }} align="left">
              <Box display="flex" alignItems="center">
                <IconButton disableRipple>
                  <img src={sortIcon} alt="sort" />
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
        </TableHead>
        <TableBody>
          {rows.length > 0 && rows.map((row) => (
            <TableRow key={row.cpf} sx={{ fontSize: "1.2rem" }}>
              <CustomTableCell sx={tableComponentStyles.customTableCell} align="left">{row.name}</CustomTableCell>
              <CustomTableCell sx={tableComponentStyles.customTableCell} align="left">{row.cpf}</CustomTableCell>
              <CustomTableCell sx={tableComponentStyles.customTableCell} align="left">{row.email}</CustomTableCell>
              <CustomTableCell sx={tableComponentStyles.customTableCell} align="left">{row.phone}</CustomTableCell>
              <CustomTableCell sx={tableComponentStyles.customTableCell} align="left">
                {row.status === "Inadimplente" ? <img src={defaulter} alt="Inadimplente" /> : <img src={noun} alt="Inadimplente" />}
              </CustomTableCell>
              <CustomTableCell sx={tableComponentStyles.customTableCell}>
                <IconButton disableRipple>
                  <img src={newCharge} alt="Criar cobrança" />
                </IconButton>
              </CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
