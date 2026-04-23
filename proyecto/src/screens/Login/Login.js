import React, { Component } from "react";
import Cookies from "universal-cookie";
import "./Login.css";

const cookies = new Cookies();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      mensajeError: ""
    };
  }

  controlarCambios(event) {
    this.setState({
      [event.target.name]: event.target.value,
      mensajeError: ""
    });
  }

  loginUsuario(event) {
    event.preventDefault();
    const { email, password } = this.state;
    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];
    
    const usuarioValido = usuariosRegistrados.filter(
      (user) => user.email === email && user.password === password
    );

    if (usuarioValido.length > 0) {
      cookies.set("user-auth-cookie", email);
      alert("Inicio de sesión exitoso");
    } else {
      this.setState({ mensajeError: "Credenciales incorrectas" });
    }
  }

  render() {
    return (
      <div className="login-container">
        <form onSubmit={(event) => this.loginUsuario(event)}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={(event) => this.controlarCambios(event)}
              value={this.state.email}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={(event) => this.controlarCambios(event)}
              value={this.state.password}
              required
            />
          </div>

          {this.state.mensajeError && (<p className="error-text">{this.state.mensajeError}</p>)}

          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }
}

export default Login;
