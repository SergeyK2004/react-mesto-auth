import logo from "../images/logo.svg";

function Header(props) {
  function onHeaderClick() {
    props.onHeaderClick(props.link);
  }

  const linkStyle = { color: props.linkColor };
  return (
    <header className="header">
      <img src={logo} className="logo" alt="лого" />
      <p>
        {props.userName}
        <button
          onClick={onHeaderClick}
          className="header__link"
          style={linkStyle}
        >
          {props.linkText}
        </button>
      </p>
    </header>
  );
}

export default Header;
