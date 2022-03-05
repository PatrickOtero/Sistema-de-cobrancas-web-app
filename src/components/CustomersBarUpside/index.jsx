/* eslint-disable consistent-return */
import SearchIcon from "@mui/icons-material/Search";
import {
  Button, IconButton, InputAdornment, Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { useState } from "react";
import configIconPink from "../../assets/ConfigIconPink.svg";
import costumersIcon from "../../assets/costumersIcon.svg";
import { tableBarStyles } from "./styles";
import useData from "../../hooks/useData";
import ToastifyError from "../../helpers/toastify/ToastifyError";

export default function CustomersBarUpside({
  setOpenModal, setEditingCostumerId,
  setRows,
}) {
  const {
    token, setDefaulterFilter,
    setUpToDateFilter, setCustomersLoading, setSearchFieldCustomers,
  } = useData();
  const [searchField, setSearchField] = useState("");

  const handleSearch = async () => {
    setSearchFieldCustomers(true);
    try {
      setCustomersLoading(true);
      const response = await fetch(
        `https://payment-system-app-api.herokuapp.com/customers?search=${searchField}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result = await response.json();

      if (response.status === 200) {
        setCustomersLoading(false);
        return setRows(result);
      }
      setCustomersLoading(false);
      setRows({});
      return ToastifyError(result);
    } catch (error) {
      setCustomersLoading(false);
      ToastifyError(error.message);
    }
  };

  const handleOpenModal = () => {
    setEditingCostumerId();
    setOpenModal(true);
  };
  return (
    <Box sx={tableBarStyles.tableBar.mainBox}>
      <Box sx={tableBarStyles.tableBar.leftBox}>
        <img src={costumersIcon} alt="Clientes" />
        <Typography variant="h3" component="h2" color="secondary">
          Clientes
        </Typography>
      </Box>
      <Box sx={tableBarStyles.tableBar.rightBox}>
        <Button
          variant="contained"
          onClick={handleOpenModal}
          sx={tableBarStyles.tableBar.addButton}
        >
          <Typography variant="h6" component="span">
            + Adicionar Cliente
          </Typography>
        </Button>
        <IconButton disableRipple>
          <img src={configIconPink} alt="Config" />
        </IconButton>
        <Box>
          <TextField
            size="small"
            label="Pesquisa"
            variant="outlined"
            sx={tableBarStyles.tableBar.inputSearch}
            onChange={(e) => setSearchField(e.target.value)}
            InputProps={{
              endAdornment: (
              // sem o z-index o botão é escondido pelo backgroundColor do textfield
                <InputAdornment
                  position="end"
                  sx={{ zIndex: "1" }}
                >
                  <IconButton
                    disableRipple
                    onClick={(e) => {
                      setDefaulterFilter(false);
                      setUpToDateFilter(false);
                      handleSearch(e);
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
              style: { fontSize: "  1.2rem", backgroundColor: "white" },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
