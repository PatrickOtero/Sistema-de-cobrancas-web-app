import { TextField } from "@mui/material";
import { modalClientStyles } from "../ModalClient/styles";

export default function CustomTextField({
  id, field, onChange, type, defaultValue,
}) {
  return (
    <TextField
      id={id}
      type={type}
      placeholder={`Digite o ${field}`}
      variant="outlined"
      size="medium"
      fullWidth
      sx={modalClientStyles.textField}
      inputProps={{ style: { fontSize: "1.2rem" } }}
      onChange={onChange}
      defaultValue={defaultValue}
    />
  );
}
