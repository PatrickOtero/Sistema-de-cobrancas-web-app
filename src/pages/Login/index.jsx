/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin } from "react-loader-spinner";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/index";
import useData from "../../hooks/useData";
import schemaLogin from "../../validations/schemaLogin";
import "./styles.css";
import ToastifyError from "../../helpers/toastify/ToastifyError";

function Login() {
  const validationLogin = { resolver: yupResolver(schemaLogin) };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(validationLogin);
  const navigate = useNavigate();
  const {
    setToken,
    token,
    setCurrentUserData,
    setLoading,
    loading,
  } = useData();

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  });

  const handleUserLogin = async (data) => {
    try {
      setLoading(true);
      const userData = await (
        await fetch("https://payment-system-app-api.herokuapp.com/userLogin", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        })
      ).json();

      if (userData.token) {
        setToken(userData.token);
        setCurrentUserData(userData.user);
        navigate("/home");
      }
      if (!userData.token) {
        ToastifyError(userData);
      }
      setLoading(false);
    } catch (error) {
      ToastifyError(error.message);
      setLoading(false);
    }
  };

  return (
    <Box className="login">
      <Box className="login-left">
        <Box className="login-left-title">
          <h1>Gerencie todos os pagamentos da sua empresa em um só lugar.</h1>
        </Box>
      </Box>
      <Box className="login-right">
        <Box className="login-right-section">
          <h2>Faça seu login!</h2>
          <form onSubmit={handleSubmit(handleUserLogin)}>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              placeholder="Digite seu e-mail"
              type="text"
              {...register("email", { required: true })}
            />
            <p className="errors">{errors.email?.message}</p>
            <Box className="forgot">
              <label htmlFor="password">Senha</label>
              <a href="/">Esqueceu sua senha?</a>
            </Box>
            <input
              id="password"
              placeholder="Digite sua senha"
              type="password"
              {...register("pass", { required: true })}
            />
            <p className="errors">{errors.pass?.message}</p>
            <Box className="loading">
              {loading && <TailSpin color="#DA1175" height={40} width={40} />}
            </Box>
            <Button>Enviar</Button>
          </form>
          <span className="footer">
            Ainda não possui uma conta?
            <Link to="/cadastrar">Cadastre-se</Link>
          </span>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
