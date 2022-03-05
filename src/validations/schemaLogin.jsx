import yup from "./configs";

const schemaLogin = yup.object().shape({
  email: yup.string().required("Campo obrigatório"),
  pass: yup.string().required("Campo obrigatório"),
});

export default schemaLogin;
