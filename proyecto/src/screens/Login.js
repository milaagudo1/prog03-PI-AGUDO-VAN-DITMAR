import { useState } from "react";

function Login() {

  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    let email = e.target.email.value;
    let password = e.target.password.value;

    let user = JSON.parse(localStorage.getItem(email));

    if (user && user.password === password) {
      sessionStorage.setItem("usuario", email);
      setError("");
      alert("Login correcto");
    } else {
      setError("Credenciales incorrectas");
    }
  }

  return (
    <div className="login-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit} className="login-form">

        <input name="email" placeholder="Email" required />

        <input name="password" type="password" placeholder="Password" required />

        <button>Ingresar</button>

        {error && <p className="error">{error}</p>}

      </form>
    </div>
  );
}

export default Login;