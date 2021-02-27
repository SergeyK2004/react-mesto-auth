import imgPathAvatar from "../images/editAvatar.svg";
import imgPathEditButton from "../images/EditButton.svg";
import imgPathAddButton from "../images/add.svg";
import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  function handleCardLike(card) {
    props.onCardLike(card);
  }

  function handleCardDelete(card) {
    props.onCardDelete(card);
  }

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar">
          <img
            src={currentUser.avatar}
            alt="Аватар"
            className="profile__avatar-img"
          />
          <img
            onClick={props.onEditAvatar}
            src={imgPathAvatar}
            alt="Сменить аватар"
            className="profile__edit-avatar"
          />
        </div>
        <div className="profile__info">
          <div className="profile__name-line">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={props.onEditProfile}
              name="editButton"
              type="button"
              className="profile__edit-button"
            >
              <img
                src={imgPathEditButton}
                alt="Редактировать"
                className="profile__edit-button-img"
              />
            </button>
          </div>
          <p className="profile__spec">{currentUser.about}</p>
        </div>
        <button
          onClick={props.onAddPlace}
          name="addButton"
          type="button"
          className="profile__add-button"
        >
          <img
            src={imgPathAddButton}
            alt="Добавить"
            className="profile__add-button-img"
          />
        </button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {props.cards.map((element) => (
            <Card
              card={element}
              onCardClick={props.onCardClick}
              key={element._id}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            ></Card>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
