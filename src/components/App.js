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
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { chekToken, autorize, register } from "../utils/auth";

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
  const [userEmail, setUserEmail] = React.useState(false);
  const [isClearInput, setIsClearInput] = React.useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false);
  const [isRegSuccess, setIsRegSuccess] = React.useState(false);

  const history = useHistory();

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
    api
      .setUserInfo(item)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleUpdateAvatar(item) {
    api
      .setUserAvatar(item)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleAddPlaceSubmit(item) {
    api
      .setNewCard(item)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .reverseLike(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        // Обновляем стейт
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onCardDelete(card) {
    api
      .delCard(card)
      .then((newCard) => {
        const newCards = cards.filter((c) => c._id !== card._id);
        // Обновляем стейт
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSignin(email) {
    setLoggedIn(true);
    setUserEmail(email);
  }
  function onLogin(password, email) {
    autorize(password, email)
      .then((res) => {
        setIsClearInput(true);
        localStorage.setItem("token", res.token);
        handleSignin(email);
        history.push("/mesto");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onRegister(password, email) {
    register(password, email)
      .then(() => {
        setIsClearInput(true);
        setIsRegSuccess(true);
        setIsTooltipPopupOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setIsRegSuccess(false);
        setIsTooltipPopupOpen(true);
      });
  }
  function closePopup() {
    setIsTooltipPopupOpen(false);
    if (isRegSuccess) {
      history.push("/sign-in");
    }
  }

  function onHeaderClick(link) {
    if (link === "signOut") {
      localStorage.removeItem("token");
      history.push("/sign-in");
    } else {
      history.push(`/${link}`);
    }
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

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      // здесь будем проверять токен
      chekToken(token)
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          history.push("/mesto");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [history]);

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="body">
          <div className="page">
            <Switch>
              <Route path="/sign-up">
                <Header
                  userName=""
                  link="sign-in"
                  linkText="Войти"
                  linkColor="#ffffff"
                  onHeaderClick={onHeaderClick}
                />
                <Register onRegister={onRegister} isClearInput={isClearInput} />
              </Route>
              <Route path="/sign-in">
                <Header
                  userName=""
                  link="sign-up"
                  linkText="Регистрация"
                  linkColor="#ffffff"
                  onHeaderClick={onHeaderClick}
                />
                <Login
                  handleSignin={handleSignin}
                  onLogin={onLogin}
                  isClearInput={isClearInput}
                />
              </Route>
              <ProtectedRoute path="/mesto" loggedIn={loggedIn}>
                <Header
                  userName={userEmail}
                  link="signOut"
                  linkText="Выйти"
                  linkColor="#A9A9A9"
                  onHeaderClick={onHeaderClick}
                />
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
            <InfoTooltip
              isOpen={isTooltipPopupOpen}
              onClose={closePopup}
              isRegSuccess={isRegSuccess}
            />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
