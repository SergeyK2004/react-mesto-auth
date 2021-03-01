import imgClosePath from "../images/CloseIcon.svg";
import imgSuccessPath from "../images/success.png";
import imgFailPath from "../images/fail.png";

function InfoTooltip(props) {
  const imgPath = props.isRegSuccess ? imgSuccessPath : imgFailPath;
  const popupTitle = props.isRegSuccess
    ? "Вы успешно зарегистрировались!"
    : "Что-то пошло не так! Попробуйте еще раз.";
  function handlePopupClick(evt) {
    if (evt.target.classList.contains("popup")) {
      props.onClose();
    }
  }

  return (
    <section
      onClick={handlePopupClick}
      className={`popup popup_tooltip} ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className={`popup__container`}>
        <button
          onClick={props.onClose}
          type="button"
          className={`popup__button-close popup__button-close_type_tooltip}`}
        >
          <img src={imgClosePath} className="popup__img-close" alt="Закрыть" />
        </button>
        <img src={imgPath} className="popup__img-tooltip" alt="Регистрация" />
        <h2 className={`popup__title popup__title_type_tooltip`}>
          {popupTitle}
        </h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
