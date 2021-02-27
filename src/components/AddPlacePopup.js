import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
    setName("");
    setLink("");
  }
  function handleClose(evt) {
    props.onClose();
    setName("");
    setLink("");
  }
  function handlerOnChangeName(evt) {
    setName(evt.target.value);
  }
  function handlerOnChangeLink(evt) {
    setLink(evt.target.value);
  }

  return (
    <PopupWithForm
      name="new-card"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <>
        <label className="popup__field">
          <input
            required
            placeholder="Название"
            className="popup__input popup__input_type_title"
            type="text"
            name="name"
            id="title-input"
            minLength="2"
            maxLength="30"
            value={name}
            onChange={handlerOnChangeName}
          />
          <span className="popup__input-error" id="title-input-error"></span>
        </label>
        <label className="popup__field">
          <input
            required
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_type_link"
            type="url"
            name="link"
            id="link-input"
            value={link}
            onChange={handlerOnChangeLink}
          />
          <span className="popup__input-error" id="link-input-error"></span>
        </label>
      </>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
