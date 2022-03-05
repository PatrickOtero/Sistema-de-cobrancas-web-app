export const modalClientStyles = {
  dialogTitle: {
    display: "flex",
    alignItems: "center",
    color: "secondary.main",
    width: "100%",
    padding: "0",
  },

  boxHeaderLeft: {
    display: "flex",
    alignItems: "center",
    width: "80%",
    padding: "4rem 0 0 5.7rem",
  },

  boxCloseIcon: {
    width: "20%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    padding: "2rem",
    img: {
      width: "1.8rem",
    },
  },

  boxDialogContent: {
    display: "flex", flexDirection: "column", gap: "0.8rem", padding: "1.5rem 4rem 0",
  },

  textField: {
    fieldSet: { borderRadius: "0.8rem" },
  },
  requiredError: {
    color: "red",
  },
  inputLabel: {
    color: "black",
    fontSize: "1.2rem",
  },
  boxFooterButtons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "4rem",
    gap: "2rem",
  },
  buttonFooter: {
    padding: "0.4rem 8.7rem", borderRadius: "0.8rem",
  },
};
