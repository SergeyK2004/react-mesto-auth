import React from "react";

function AuthForm(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(password, email);
  }
  function handlerOnChangeEmail(evt) {
    setEmail(evt.target.value);
  }
  function handlerOnChangePassword(evt) {
    setPassword(evt.target.value);
  }
  React.useEffect(() => {
    if (props.isClearInput) {
      setEmail("");
      setPassword("");
    }
  }, [props.isClearInput]);

  const underButtonText = props.needUnderButton ? props.children : "";

  return (
    <section className={`authForm`}>
      <h2 className={`authForm__title`}>{props.title}</h2>
      <form
        onSubmit={handleSubmit}
        name="login"
        className={`authForm__form`}
        noValidate
      >
        <label className="authForm__field">
          <input
            required
            placeholder="Email"
            className="authForm__input authForm__input_type_email"
            type="text"
            name="email"
            id="email-input"
            autoComplete="username"
            minLength="2"
            maxLength="40"
            value={email || ""}
            onChange={handlerOnChangeEmail}
          />
          <span className="authForm__input-error" id="name-input-error"></span>
        </label>
        <label className="authForm__field">
          <input
            required
            placeholder="Пароль"
            className="authForm__input authForm__input_type_password"
            type="password"
            name="password"
            id="password-input"
            autoComplete="current-password"
            minLength="2"
            maxLength="40"
            value={password || ""}
            onChange={handlerOnChangePassword}
          />
          <span
            className="authForm__input-error"
            id="password-input-error"
          ></span>
        </label>
        <button className="authForm__button-submit" type="submit">
          {props.button}
        </button>
      </form>
      {underButtonText}
    </section>
  );
}

export default AuthForm;
