/* eslint-disable consistent-return */
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { useState } from "react";
import chargesIcon from "../../assets/chargesIcon.svg";
import configIconPink from "../../assets/ConfigIconPink.svg";
import { chargesBarStyles } from "./styles";
import useData from "../../hooks/useData";
import ToastifyError from "../../helpers/toastify/ToastifyError";

export default function TableBarComponent({ setRowsCharge }) {
  const {
    token, setPaidFilter,
    setExpectedFilter, setOverdueFilter,
    setChargesLoading, setSearchFieldCustomers,
  } = useData();
  const [searchField, setSearchField] = useState("");

  const handleSearch = async () => {
    setSearchFieldCustomers(true);
    try {
      setChargesLoading(true);
      const response = await fetch(
        `https://payment-system-app-api.herokuapp.com/charges?search=${searchField}`,
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
        setChargesLoading(false);
        return setRowsCharge(result);
      }
      setChargesLoading(false);
      setRowsCharge({});
      return ToastifyError(result);
    } catch (error) {
      setChargesLoading(false);
      ToastifyError(error.message);
    }
  };
  return (
    <Box sx={chargesBarStyles.tableBar.mainBox}>
      <Box sx={chargesBarStyles.tableBar.leftBox}>
        <img src={chargesIcon} alt="Clientes" />
        <Typography variant="h3" component="h2" color="secondary">
          Cobranças
        </Typography>
      </Box>
      <Box sx={chargesBarStyles.tableBar.rightBox}>
        <IconButton disableRipple>
          <img src={configIconPink} alt="Config" />
        </IconButton>
        <Box>
          <TextField
            backgroundColor="#fff"
            size="small"
            label="Pesquisa"
            variant="outlined"
            sx={chargesBarStyles.tableBar.inputSearch}
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
                      setPaidFilter(false);
                      setExpectedFilter(false);
                      setOverdueFilter(false);
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
