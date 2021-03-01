import React from "react";
import { Link, withRouter } from "react-router-dom";
import AuthForm from "./AuthForm";
import { register } from "./Auth";
import InfoTooltip from "./InfoTooltip";

function Register(props) {
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false);
  const [isRegSuccess, setIsRegSuccess] = React.useState(false);
  const [isClearInput, setIsClearInput] = React.useState(false);

  function handleSubmit(password, email) {
    register(password, email).then((res) => {
      if (res) {
        setIsClearInput(true);
        setIsRegSuccess(true);
        setIsTooltipPopupOpen(true);
      } else {
        setIsRegSuccess(false);
        setIsTooltipPopupOpen(true);
      }
    });
  }
  function closePopup() {
    setIsTooltipPopupOpen(false);
    if (isRegSuccess) {
      props.history.push("/sign-in");
    }
  }

  return (
    <>
      <AuthForm
        title="Регистрация"
        button="Зарегистрироваться"
        needUnderButton={true}
        onSubmit={handleSubmit}
        isClearInput={isClearInput}
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
      <InfoTooltip
        isOpen={isTooltipPopupOpen}
        onClose={closePopup}
        isRegSuccess={isRegSuccess}
      />
    </>
  );
}

export default withRouter(Register);
