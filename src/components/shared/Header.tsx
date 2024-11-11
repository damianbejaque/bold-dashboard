import logo from "assets/logo.png";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 w-full fixed top-0 left-0 bg-header z-1000 ">
      <img src={logo} className="h-10" alt="Logo" />
      <nav className="flex items-center">
        <ul className="flex">
          <li className="ml-5 text-gris-claro">
            <a href="/">Mi Negocio</a>
          </li>
          <li className="ml-5 text-gris-claro">
            <a href="/about">Ayuda</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
