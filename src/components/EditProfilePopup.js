import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      spec: description,
    });
  }
  function handlerOnChangeName(evt) {
    setName(evt.target.value);
  }
  function handlerOnChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <>
        <label className="popup__field">
          <input
            required
            placeholder="Имя"
            className="popup__input popup__input_type_name"
            type="text"
            name="name"
            id="name-input"
            minLength="2"
            maxLength="40"
            value={name || ""}
            onChange={handlerOnChangeName}
          />
          <span className="popup__input-error" id="name-input-error"></span>
        </label>
        <label className="popup__field">
          <input
            required
            placeholder="Профессия"
            className="popup__input popup__input_type_spec"
            type="text"
            name="spec"
            id="spec-input"
            minLength="2"
            maxLength="200"
            value={description || ""}
            onChange={handlerOnChangeDescription}
          />
          <span className="popup__input-error" id="spec-input-error"></span>
        </label>
      </>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
