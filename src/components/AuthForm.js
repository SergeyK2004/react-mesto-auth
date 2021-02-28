import React from "react";

function AuthForm(props) {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handlerOnChangeName(evt) {
    setName(evt.target.value);
  }
  function handlerOnChangePassword(evt) {
    setPassword(evt.target.value);
  }

  return (
    <section className={`authForm`}>
      <h2 className={`authForm__title`}>{props.title}</h2>
      <form
        onSubmit={props.onSubmit}
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
            name="name"
            id="name-input"
            minLength="2"
            maxLength="40"
            value={name || ""}
            onChange={handlerOnChangeName}
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
    </section>
  );
}

export default AuthForm;
