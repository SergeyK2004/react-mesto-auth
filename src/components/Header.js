import logo from "../images/logo.svg";
import { useHistory } from "react-router-dom";

function Header(props) {
  const history = useHistory();

  function signOut() {
    if (props.link === "signOut") {
      localStorage.removeItem("token");
      history.push("/sign-in");
    } else {
      history.push(`/${props.link}`);
    }
  }

  const linkStyle = { color: props.linkColor };
  return (
    <header className="header">
      <img src={logo} className="logo" alt="лого" />
      <p>
        {props.userName}
        <button onClick={signOut} className="header__link" style={linkStyle}>
          {props.linkText}
        </button>
      </p>
    </header>
  );
}

export default Header;
