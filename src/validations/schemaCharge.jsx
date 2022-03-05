import yup from "./configs";

const schemaCharges = yup.object().shape({
  name_customer: yup.string().required("Campo obrigatório"),
  description: yup.string().required("Campo obrigatório"),
  duedateRaw: yup.string().required("Campo obrigatório"),
  valueRaw: yup.string().required("Campo obrigatório"),
  status: yup.string().required("Campo obrigatório").nullable(),
});

export default schemaCharges;
