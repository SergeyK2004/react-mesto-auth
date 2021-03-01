import React from "react";
import { withRouter } from "react-router-dom";
import AuthForm from "./AuthForm";
import { autorize } from "./Auth";

function Login(props) {
  const [isClearInput, setIsClearInput] = React.useState(false);

  function handleSubmit(password, email) {
    autorize(password, email).then((res) => {
      if (res) {
        setIsClearInput(true);
        localStorage.setItem("token", res.token);
        props.handleSignin(email);
        props.history.push("/mesto");
      }
    });
  }

  return (
    <AuthForm
      title="Вход"
      button="Войти"
      needUnderButton={false}
      onSubmit={handleSubmit}
      isClearInput={isClearInput}
    ></AuthForm>
  );
}

export default withRouter(Login);
