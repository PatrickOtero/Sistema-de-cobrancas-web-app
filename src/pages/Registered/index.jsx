import { Box } from "@mui/system";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import check from "../../assets/check.svg";
import registeredImage from "../../assets/confirm.svg";
import greenBar from "../../assets/green-bar.svg";
import greyBar from "../../assets/grey-bar.svg";
import Button from "../../components/Button";
import "./styles.css";

function Registered() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  });

  const redirect = () => {
    navigate("/");
  };

  return (
    <Box className="registered">
      <Box className="registered-left">
        <Box className="registered-left-title">
          <img src={registeredImage} alt="" />
        </Box>
      </Box>
      <Box className="registered-right">
        <Box className="section">
          <img className="check-image" src={check} alt="" />
          <Button onClick={redirect}>Ir para login</Button>
          <Box className="section_footer-registered">
            <img src={greyBar} alt="" />
            <img src={greyBar} alt="" />
            <img src={greenBar} alt="" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Registered;
