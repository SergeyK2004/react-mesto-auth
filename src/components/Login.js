import React from "react";
import { withRouter } from "react-router-dom";
import AuthForm from "./AuthForm";

function Login(props) {
  function handleSubmit(password, email) {
    props.onLogin(password, email);
  }

  return (
    <AuthForm
      title="Вход"
      button="Войти"
      needUnderButton={false}
      onSubmit={handleSubmit}
      isClearInput={props.isClearInput}
    ></AuthForm>
  );
}

export default withRouter(Login);
