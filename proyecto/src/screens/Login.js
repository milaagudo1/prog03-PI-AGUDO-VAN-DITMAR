import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  evitarSubmit(event) {
    event.preventDefault();
  }

  controlarCambios(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  validarUsuario() {
    let usuarioValido = {
      email: "test@mail.com",
      password: "123456"
    };

    if (
      this.state.email === usuarioValido.email &&
      this.state.password === usuarioValido.password
    ) {
      this.setState({ error: "" });
      alert("Login correcto");
    } else {
      this.setState({ error: "Credenciales incorrectas" });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={(event) => this.evitarSubmit(event)}>

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

          <input
            type="submit"
            value="Submit"
            onClick={() => this.validarUsuario()}
          />

          {this.state.error && <p>{this.state.error}</p>}

        </form>
      </div>
    );
  }
}

export default Login;