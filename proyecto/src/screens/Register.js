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