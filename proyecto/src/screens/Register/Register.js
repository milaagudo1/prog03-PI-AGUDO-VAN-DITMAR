import React, { Component } from "react";
import Cookies from "universal-cookie";
import "./Register.css";

const cookies = new Cookies();

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  controlarCambios(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  registerUsuario(event) {
    event.preventDefault();

    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const emailExistente = usuariosRegistrados.filter( user => user.email === this.state.email); 
    if (emailExistente.length > 0) {
      alert("El email ya está registrado");
      return;
    }
    else {
      if (this.state.password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres");
        return;
      }
      else {
        usuariosRegistrados.push({ email: this.state.email, password: this.state.password });
        localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));
        cookies.set("user-auth-cookie", this.state.email);
        this.setState({ email: "", password: "" });
        alert("Registro exitoso");
      }
    }
  }

  render() {
    return (
      <div className="register-container"> 
        <form onSubmit={(event) => this.registerUsuario(event)}>      
          <label>Email:</label>
          <input
            type="text"
            name="email"
            onChange={(event) => this.controlarCambios(event)}
            value={this.state.email}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={(event) => this.controlarCambios(event)}
            value={this.state.password}
          />

          <button type="submit">Registrarme</button>
        </form>
      </div>
    );
  }
}

export default Register;