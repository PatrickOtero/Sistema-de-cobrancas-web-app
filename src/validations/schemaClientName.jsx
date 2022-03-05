import yup from "./configs";

export const schemaClientName = yup.object().shape({
  name_customer: yup.string().required("Campo obrigatório"),
  email: yup.string().required("Campo obrigatório"),
  phone: yup.string().required("Campo obrigatório"),
  cpf: yup.string().required("Campo obrigatório"),
});
