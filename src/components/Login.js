import React from "react";
import AuthForm from "./AuthForm";

function Login(props) {
  return (
    <AuthForm
      title="Вход"
      button="Войти"
      needUnderButton={false}
      onSubmit={props.onSubmit}
    ></AuthForm>
  );
}

export default Login;
