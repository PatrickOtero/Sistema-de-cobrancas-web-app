/* eslint-disable no-alert */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/system";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import choiceImg from "../../assets/choice.svg";
import registerImg from "../../assets/register.svg";
import Button from "../../components/Button/index";
import FormRegister from "../../components/FormRegister";
import formSchema from "../../validations/registerValidations";
import "./styles.css";
import closedEye from "../../assets/eye-off.svg";
import openedEye from "../../assets/eye.svg";
import greyBar from "../../assets/grey-bar.svg";
import greenBar from "../../assets/green-bar.svg";
import ToastifyError from "../../helpers/toastify/ToastifyError";

function Register() {
  let checkPass = useRef({});
  const navigate = useNavigate();
  const validationSchema = { resolver: yupResolver(formSchema) };
  const {
    register, handleSubmit, reset, formState: { errors }, watch,
  } = useForm(validationSchema);
  checkPass = watch("pass", "");
  const [page, setPage] = useState(false);
  const changePage = () => setPage(!page);
  const saveData = () => {
    changePage();
  };
  const onSubmit = async (data) => {
    try {
      const {
        name_user, email, pass, confirmPass,
      } = data;
      const bodyRegister = { name_user, email, pass };
      const responseRequisition = await fetch("https://payment-system-app-api.herokuapp.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyRegister),
      });
      const contentRequest = await responseRequisition.json();
      const contentStatus = await responseRequisition.status;
      if (contentStatus === 200) {
        navigate("/cadastrado");
      }
      if (contentStatus === 400) {
        changePage();
        return;
      }
      reset({ pass: "", confirmPass: "" });
    } catch (error) {
      ToastifyError(error.message);
    }
  };
  const [firstToggleEye, setFirstToggleEye] = useState(true);
  function changeFirstToggleEye() {
    setFirstToggleEye(!firstToggleEye);
  }
  const [secondToggleEye, setSecondToggleEye] = useState(true);
  function changeSecondToggleEye() {
    setSecondToggleEye(!secondToggleEye);
  }
  return (
    <Box className="register">
      <Box className="register-left">
        <Box className="register-left-title">
          {!page && <img src={registerImg} alt="" />}
          {page && <img src={choiceImg} alt="" />}
        </Box>
      </Box>
      <Box className="register-right">
        {!page && (
          <Box className="section">
            <FormRegister
              title="Adicione seus dados"
              onSubmit={saveData}
            >
              <label htmlFor="name">
                Nome*
              </label>
              <input required id="name" placeholder="Digite seu nome" type="text" {...register("name_user")} />
              <p className="errors">{errors.name?.message}</p>

              <label className="second-label" htmlFor="email">
                E-mail*
              </label>

              <input required id="email" placeholder="Digite seu e-mail" type="email" {...register("email")} />
              <p className="errors">{errors.email?.message}</p>
              <Button>Continuar</Button>
            </FormRegister>
            <Box className="section_footer">
              <img src={greenBar} alt="" />
              <button className="section-change_button" onClick={changePage} type="button"><img src={greyBar} alt="" /></button>
              <img src={greyBar} alt="" />
            </Box>
          </Box>
        )}
        {page && (
          <Box className="section">
            <FormRegister
              title="Escolha uma senha"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Box className="input-password">
                <label htmlFor="pass">
                  Insira a senha*
                </label>
                <input id="pass" placeholder="Insira a senha" className="input-password" type={firstToggleEye ? "password" : "text"} {...register("pass")} />
                <button onClick={changeFirstToggleEye} type="button"><img src={firstToggleEye ? closedEye : openedEye} alt="" /></button>
              </Box>
              <p className="errors">{errors.pass?.message}</p>
              <Box className="input-password">
                <Box className="forgot">
                  <label className="second-label" htmlFor="confirmPass">
                    Repita a senha*
                  </label>
                </Box>
                <input id="confirmPass" placeholder="Confirme a senha" className="input-password" type={secondToggleEye ? "password" : "text"} {...register("confirmPass")} />
                <button onClick={changeSecondToggleEye} type="button"><img src={secondToggleEye ? closedEye : openedEye} alt="" /></button>
              </Box>
              <p className=" errors-last">{errors.confirmPass?.message}</p>
              <Button>Entrar</Button>
            </FormRegister>
            <Box className="section_footer">
              <button onClick={changePage} className="section-change_button" type="button"><img src={greyBar} alt="" /></button>
              <img src={greenBar} alt="" />
              <img src={greyBar} alt="" />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Register;
