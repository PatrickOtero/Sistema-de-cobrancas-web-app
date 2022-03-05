/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import "./styles.css";

export default function FormRegister({ title, onSubmit, children }) {
  return (
    <Box className="register-right-section">
      <h2>{title}</h2>
      <form onSubmit={onSubmit}>
        {children}
      </form>
      <Box className="register-right-section_footer">
        <span>
          Já possui uma conta? Faça seu
          <Link to="/">Login</Link>
        </span>
      </Box>
    </Box>
  );
}
