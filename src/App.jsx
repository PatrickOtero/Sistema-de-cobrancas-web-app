/* eslint-disable import/no-useless-path-segments */
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";
import { ToastContainer } from "react-toastify";
import DataProvider from "./contexts/DataProvider";
import theme from "../src/styles/theme";
import Routes from "./Routes";

function App() {
  return (
    <Box className="App" display="flex">
      <ThemeProvider theme={theme}>
        <DataProvider>
          <Routes />
        </DataProvider>
      </ThemeProvider>
      <ToastContainer />
    </Box>
  );
}

export default App;
