import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatar = React.useRef();
  function handleClose(e) {
    props.onClose();
    avatar.current.value = "";
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      link: avatar.current.value,
    });
  }

  React.useEffect(() => {
    avatar.current.value = "";
  }, [currentUser]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          required
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_type_link"
          type="url"
          name="link"
          id="link-avatar-input"
          ref={avatar}
        />
        <span
          className="popup__input-error"
          id="link-avatar-input-error"
        ></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
