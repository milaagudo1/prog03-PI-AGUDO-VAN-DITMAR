import React, { Component } from "react";

class Register extends Component {
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

  registrarUsuario() {
    
    if (this.state.password.length < 6) {
      this.setState({
        error: "La contraseña debe tener al menos 6 caracteres"
      });
      return;
    }

    
    let usuarioExistente = "test@mail.com";

    if (this.state.email === usuarioExistente) {
      this.setState({
        error: "El email ya está registrado"
      });
      return;
    }

    
    this.setState({
      error: ""
    });

    alert("Usuario creado correctamente");
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
            onClick={() => this.registrarUsuario()}
          />

          if (this.state.error) {
            return <p>{this.state.error}</p>;
          }

        </form>
      </div>
    );
  }
}

export default Register;