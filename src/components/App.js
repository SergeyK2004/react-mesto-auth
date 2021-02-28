import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import React from "react";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [selectedCard, setSelectedCard] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard("");
  }
  function handleUpdateUser(item) {
    api.setUserInfo(item).then((newUserInfo) => {
      setCurrentUser(newUserInfo);
    });
    closeAllPopups();
  }
  function handleUpdateAvatar(item) {
    api.setUserAvatar(item).then((newUserInfo) => {
      setCurrentUser(newUserInfo);
    });
    closeAllPopups();
  }
  function handleAddPlaceSubmit(item) {
    api.setNewCard(item).then((newCard) => {
      setCards([newCard, ...cards]);
    });
    closeAllPopups();
  }

  function onCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.reverseLike(card._id, isLiked).then((newCard) => {
      const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
      // Обновляем стейт
      setCards(newCards);
    });
  }

  function onCardDelete(card) {
    api.delCard(card).then((newCard) => {
      const newCards = cards.filter((c) => c._id !== card._id);
      // Обновляем стейт
      setCards(newCards);
    });
  }

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="body">
          <div className="page">
            <Switch>
              <Route path="/sign-up">
                <Header />
                <Register />
              </Route>
              <Route path="/sign-in">
                <Header />
                <Login />
              </Route>
              <ProtectedRoute path="/mesto" loggedIn={loggedIn}>
                <Header />
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                  cards={cards}
                />
              </ProtectedRoute>
              <Route exact path="/">
                {loggedIn ? (
                  <Redirect to="/mesto" />
                ) : (
                  <Redirect to="/sign-in" />
                )}
              </Route>
            </Switch>

            <Footer />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
