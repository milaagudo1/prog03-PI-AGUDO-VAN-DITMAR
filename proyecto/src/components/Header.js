import { Link } from "react-router-dom";

function Header() {

  let tengoUsuario = sessionStorage.getItem("usuario");

  return (
    <nav>
      <ul className="nav nav-tabs my-4">

        <li className="nav-item">
          <Link className="nav-link" to="/">
            <img src="/logo.png" alt="CineTrack" className="logo-img" />
          </Link>
        </li>

       
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
            <li className="nav-item">
              <Link className="nav-link" to="/register">Crear Cuenta</Link>
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