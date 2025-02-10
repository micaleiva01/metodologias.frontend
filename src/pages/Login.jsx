import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateUser from "../components/CreateUser";

const Login = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleShowRegister = () => setShowRegister(true);
  const handleHideRegister = () => setShowRegister(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const response = await fetch("http://localhost:8000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }
      
      const user = await response.json();
      localStorage.setItem("user", JSON.stringify(user));
      setIsLoggedIn(true);

      // Redirect only after successful authentication
      setTimeout(() => {
        if (user.rol === "ADMIN") {
          navigate("/admin/dashboard");
        } else if (user.rol === "TEAM_MANAGER") {
          navigate("/team-manager/dashboard");
        }
      }, 100);
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoggedIn) {
    return null; // Hide login component once logged in
  }

  if (showRegister) {
    return <CreateUser onCancel={handleHideRegister} />;
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="border border-danger p-4 shadow text-light" style={{ width: "400px" }}>
        <h1 className="text-center mb-4 input-title">INICIAR SESIÓN</h1>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label input-login">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Introduce tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label input-login">Contraseña:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Introduce tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-danger w-100">ENTRAR</button>
        </form>
        <p className="text-center mt-3">
          Si no tienes cuenta, haz click
          <span
            style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
            onClick={handleShowRegister}
          > aquí</span>.
        </p>
      </div>
    </div>
  );
};

export default Login;