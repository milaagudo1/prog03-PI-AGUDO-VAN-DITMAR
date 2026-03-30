import { Link } from "react-router-dom";

function Header() {
  let tengoUsuario = false;

  return (
    <nav>
      <ul className="nav nav-tabs my-4">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/movies">Películas</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/series">Series</Link>
        </li>

        {tengoUsuario ? (
          <li className="nav-item">
            <Link className="nav-link" to="/favorites">Favoritos</Link>
          </li>
        ) : (
          <>
            <li className="nav-item ml-auto">
              <Link className="nav-link" to="/register">Registro</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;