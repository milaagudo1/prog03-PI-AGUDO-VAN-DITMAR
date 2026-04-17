import React, { Component } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  controlarCambios(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  registerUsuario(e) {
    


    
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.registerUsuario(e)}>      
          <label>Email:</label>
          <input
            type="text"
            name="email"
            onChange={(e) => this.controlarCambios(e)}
            value={this.state.email}
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={(e) => this.controlarCambios(e)}
            value={this.state.password}
          />
          <button type="submit">Registrarme</button>
        </form>
      </div>
    );

  }
}

export default Register;