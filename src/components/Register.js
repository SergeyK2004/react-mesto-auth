import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register(props) {
  return (
    <AuthForm
      title="Регистрация"
      button="Зарегистрироваться"
      needUnderButton={true}
      onSubmit={props.onSubmit}
    >
      <div className="authForm__signin">
        <p>
          Уже зарегистрированы?
          <Link to="sign-in" className="authForm__signin-link">
            Войти
          </Link>
        </p>
      </div>
    </AuthForm>
  );
}

export default Register;
