/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import chargesIcon from "../../assets/chargesIcon.svg";
import selectedChargesIcon from "../../assets/selectedChargesIcon.svg";
import costumersIcon from "../../assets/costumersIcon.svg";
import selectedCostumersIcon from "../../assets/selectedCostumersIcon.svg";
import homeIcon from "../../assets/homeIcon.svg";
import selectedHomeIcon from "../../assets/selectedHomeIcon.svg";
import { sidebarStyles } from "./style";
import useData from "../../hooks/useData";

function SidebarButton({
  image, text, onClick, color, border, height,
}) {
  return (
    <Box sx={sidebarStyles.buttonBox} borderRight={border} height={height}>
      <IconButton onClick={onClick} color={color} disableRipple sx={sidebarStyles.flexColumn}>
        <img src={image} alt={text} />
        <Typography fontSize="1.6rem" variant="b" component="p">
          {text}
        </Typography>
      </IconButton>
    </Box>
  );
}
export default function MiniDrawer() {
  const {
    actualPage, setDefaulterFilter,
    setUpToDateFilter, setPaidFilter,
    setOverdueFilter, setExpectedFilter,
    setSearchFieldCustomers,
  } = useData();
  const navigate = useNavigate();
  return (
    <Box display="flex" backgroundColor="#F0F0F5">
      <CssBaseline />
      <Box>
        <Box sx={sidebarStyles.sidebarBox}>
          <SidebarButton
            onClick={() => {
              setDefaulterFilter(false);
              setUpToDateFilter(false);
              setPaidFilter(false);
              setOverdueFilter(false);
              setExpectedFilter(false);
              setSearchFieldCustomers(false);
              navigate("/home");
            }}
            text="Home"
            color={actualPage === "home" ? "primary" : "secondary"}
            image={actualPage === "home" ? selectedHomeIcon : homeIcon}
            border={actualPage === "home" ? "0.2rem solid #DA0175" : ""}
            height="8.2rem"
          />
          <SidebarButton
            onClick={() => {
              setDefaulterFilter(false);
              setUpToDateFilter(false);
              setPaidFilter(false);
              setOverdueFilter(false);
              setExpectedFilter(false);
              setSearchFieldCustomers(false);
              navigate("/clientes");
            }}
            text="Clientes"
            color={actualPage === "customers" ? "primary" : "secondary"}
            image={actualPage === "customers" ? selectedCostumersIcon : costumersIcon}
            border={actualPage === "customers" ? "2px solid #DA0175" : ""}
            height="8.2rem"
          />
          <SidebarButton
            onClick={() => {
              setDefaulterFilter(false);
              setUpToDateFilter(false);
              setPaidFilter(false);
              setOverdueFilter(false);
              setExpectedFilter(false);
              setSearchFieldCustomers(false);
              navigate("/cobrancas");
            }}
            text="Cobranças"
            color={actualPage === "charges" ? "primary" : "secondary"}
            image={actualPage === "charges" ? selectedChargesIcon : chargesIcon}
            border={actualPage === "charges" ? "2px solid #DA0175" : ""}
            height="8.2rem"
          />
        </Box>
      </Box>
    </Box>
  );
}
