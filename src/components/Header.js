import logo from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <img src={logo} className="logo" alt="лого" />
    </header>
  );
}

export default Header;
