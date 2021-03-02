import React from "react";
import { Link, withRouter } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register(props) {
  function handleSubmit(password, email) {
    props.onRegister(password, email);
  }

  return (
    <AuthForm
      title="Регистрация"
      button="Зарегистрироваться"
      needUnderButton={true}
      onSubmit={handleSubmit}
      isClearInput={props.isClearInput}
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

export default withRouter(Register);
