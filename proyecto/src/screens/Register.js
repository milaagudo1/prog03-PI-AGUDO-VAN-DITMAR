import { useState } from "react";

function Register() {

  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    let email = e.target.email.value;
    let password = e.target.password.value;

    
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

   
    let usuarioGuardado = localStorage.getItem(email);

    if (usuarioGuardado) {
      setError("El email ya está registrado");
      return;
    }

    
    localStorage.setItem(email, JSON.stringify({ email, password }));

    
    sessionStorage.setItem("usuario", email);

    setError("");
    alert("Usuario creado correctamente");
  }

  return (
    <div className="register-container">
      <h2>Crear Cuenta</h2>

      <form onSubmit={handleSubmit} className="register-form">

        <input name="email" placeholder="Email" required />

        <input name="password" type="password" placeholder="Password" required />

        <button>Registrarse</button>

        {error && <p className="error">{error}</p>}

      </form>
    </div>
  );
}

export default Register;