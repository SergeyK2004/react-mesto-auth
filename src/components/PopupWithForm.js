import imgPath from "../images/CloseIcon.svg";
function PopupWithForm(props) {
  function handlePopupClick(evt) {
    if (evt.target.classList.contains("popup")) {
      props.onClose();
    }
  }

  return (
    <section
      onClick={handlePopupClick}
      className={`popup popup_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className={`popup__container`}>
        <button
          onClick={props.onClose}
          type="button"
          className={`popup__button-close popup__button-close_type_${props.name}`}
        >
          <img src={imgPath} className="popup__img-close" alt="Закрыть" />
        </button>
        <h2 className={`popup__title popup__title_type_${props.name}`}>
          {props.title}
        </h2>
        <form
          onSubmit={props.onSubmit}
          name={props.name}
          className={`popup__form popup__form_${props.name}`}
          noValidate
        >
          {props.children}
          <button className="popup__button-submit" type="submit">
            Сохранить
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
