import React from "react";
import AuthForm from "./AuthForm";

function Register(props) {
  return (
    <AuthForm
      title="Регистрация"
      button="Зарегистрироваться"
      needUnderButton={true}
      onSubmit={props.onSubmit}
    ></AuthForm>
  );
}

export default Register;
