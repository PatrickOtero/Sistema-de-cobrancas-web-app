import yup from "./configs";

const formSchema = yup.object().shape({
  name_user: yup.string().required(),
  email: yup.string(),
  pass: yup.string().required("Por favor, insira uma senha").min(5, "A senha precisa ter mais de 5 caracteres"),
  confirmPass: yup.string().required("Confirme a senha").oneOf([yup.ref("pass")], "A senha precisa ser igual"),
});

export default formSchema;
