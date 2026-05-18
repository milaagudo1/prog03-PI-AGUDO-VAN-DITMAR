import React, { useState } from "react";
import Cookies from "universal-cookie";
import "./Login.css";

const cookies = new Cookies();

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  function controlarCambios(event) {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    setMensajeError("");
  }

  function loginUsuario(event) {
    event.preventDefault();
    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioValido = usuariosRegistrados.filter(
      (user) => user.email === email && user.password === password
    );

    if (usuarioValido.length > 0) {
      cookies.set("user-auth-cookie", email);
      props.history.push("/");
    } else {
      setMensajeError("Credenciales incorrectas");
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={loginUsuario}>

        <div className="form-group">
          <label htmlFor="email">Email:</label>

          <input
            id="email"
            type="email"
            name="email"
            onChange={controlarCambios}
            value={email}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>

          <input
            id="password"
            type="password"
            name="password"
            onChange={controlarCambios}
            value={password}
            required
          />
        </div>

        {mensajeError && (
          <p className="error-text">{mensajeError}</p>
        )}

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;



