import React, { useState } from "react";
import Cookies from "universal-cookie";
import "./Register.css";
import { Link } from "react-router-dom";

const cookies = new Cookies();

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function controlarCambios(event) {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }

  function registerUsuario(event) {
    event.preventDefault();

    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const emailExistente = usuariosRegistrados.filter( user => user.email === email);
    if (emailExistente.length > 0) {
      alert("El email ya está registrado");
      return;
    } else {
      if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres");
        return;
      }
      usuariosRegistrados.push({ email: email, password: password });
      localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));
      cookies.set("user-auth-cookie", email);
      setEmail("");
      setPassword("");
      alert("Registro exitoso");
    }
  }

  return (
    <div className="register-container">
      <form onSubmit={registerUsuario}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={controlarCambios}
          value={email}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={controlarCambios}
          value={password}
        />

        <button className="btn btn-secondary">Registrarme</button>
      </form>
    </div>
  );
}

export default Register;