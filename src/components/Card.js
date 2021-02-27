import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import pathImgTrash from "../images/trash.svg";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = isOwn
    ? "element__trash"
    : "element__trash element__trash_disable";
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = isLiked
    ? "element__heart_active element__heart"
    : "element__heart";
  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  return (
    <li className="element">
      <img
        onClick={handleClick}
        className="element__image"
        src={props.card.link}
        alt="Фото"
      />
      <div className="element__description">
        <h2 className="element__text">{props.card.name}</h2>
        <div className="element__likes">
          <button
            onClick={handleLikeClick}
            type="button"
            className={cardLikeButtonClassName}
          ></button>
          <p className="element__likes-count">{props.card.likes.length}</p>
        </div>
      </div>
      <button
        onClick={handleDeleteClick}
        type="button"
        className={cardDeleteButtonClassName}
      >
        <img src={pathImgTrash} alt="корзина" />
      </button>
    </li>
  );
}

export default Card;
