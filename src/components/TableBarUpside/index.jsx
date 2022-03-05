import SearchIcon from "@mui/icons-material/Search";
import {
  Button, IconButton, InputAdornment, Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import configIconPink from "../../assets/ConfigIconPink.svg";
import costumersIcon from "../../assets/costumersIcon.svg";
import { tableBarStyles } from "./styles";

export default function TableBarComponent({ setOpenModal }) {
  const handleOpenModal = () => {
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
            InputProps={{
              endAdornment: (
              // sem o z-index o botão é escondido pelo backgroundColor do textfield
                <InputAdornment
                  position="end"
                  sx={{ zIndex: "1" }}
                >
                  <IconButton disableRipple>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
              style: { fontSize: "  1.2rem" },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
