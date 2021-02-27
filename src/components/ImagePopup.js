import imgPath from "../images/CloseIcon.svg";

function ImagePopup(props) {
  const isOpen = Boolean(props.card);

  function handlePopupClick(evt) {
    if (evt.target.classList.contains("popup")) {
      props.onClose();
    }
  }

  return (
    <section
      onClick={handlePopupClick}
      className={`popup popup_image ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__image-container">
        <button
          onClick={props.onClose}
          type="button"
          className="popup__button-close"
        >
          <img src={imgPath} className="popup__img-close" alt="Закрыть" />
        </button>
        <img
          className="popup__image"
          alt="Изображение"
          src={isOpen ? props.card.link : "#"}
        />
        <p className="popup__image-title">{props.card.name}</p>
      </div>
    </section>
  );
}

export default ImagePopup;
