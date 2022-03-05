/* eslint-disable import/no-mutable-exports */
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const mainColor = {
  200: "#ff55a4",
  500: "#DA0175",
  800: "#a3004a ",
};

const secondColor = {
  A400: "#343447",
};

let theme = createTheme({

  palette: {
    primary: mainColor,
    secondary: secondColor,
  },
});

theme = responsiveFontSizes(theme);

export default theme;
