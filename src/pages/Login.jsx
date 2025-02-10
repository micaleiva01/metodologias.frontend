import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateUser from "../components/CreateUser";

const Login = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [redirecting, setRedirecting] = useState(false); // ✅ To handle transition
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

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
      setUser(user);

      // ✅ Redirect user based on role
      if (user.rol === "ADMIN") {
        navigate("/admin/dashboard", { replace: true });
      } else if (user.rol === "TEAM_MANAGER") {
        navigate("/team-manager/dashboard", { replace: true });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Estás seguro de que deseas cerrar sesión?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login", { replace: true });
    }
  };

  const handleNavigation = (path) => {
    setRedirecting(true); // ✅ Hides dashboard before navigating
    setTimeout(() => {
      navigate(path, { replace: true });
    }, 100); // Ensures smooth transition
  };

  if (redirecting) {
    return null; // ✅ Prevents dashboard from flashing while navigating
  }

  if (user) {
    return (
      <div className="container my-5 text-white text-center">
        <h1>Bienvenido, {user.name}!</h1>
        <h3>¿Qué deseas hacer?</h3>
        <div className="d-flex flex-column align-items-center">
          {user.rol === "ADMIN" && (
            <>
              <button className="btn btn-primary mt-4 mb-2" onClick={() => handleNavigation("/news")}>
                Gestionar Noticias
              </button>
              <button className="btn btn-primary mb-2" onClick={() => handleNavigation("/votings")}>
                Gestionar Votaciones
              </button>
              <button className="btn btn-primary mb-2" onClick={() => handleNavigation("/calendar")}>
                Gestionar Carreras
              </button>
              <button className="btn btn-primary mb-2" onClick={() => handleNavigation("/circuits")}>
                Gestionar Circuitos
              </button>
              <button className="btn btn-primary mb-2" onClick={() => handleNavigation("/admin/users")}>
                Gestionar Usuarios
              </button>
            </>
          )}

          {user.rol === "TEAM_MANAGER" && (
            <>
              <button className="btn btn-primary mt-4 mb-2" onClick={() => handleNavigation("/team-manager/pilots")}>
                Gestionar Pilotos
              </button>
              <button className="btn btn-primary mb-2" onClick={() => handleNavigation("/team-manager/cars")}>
                Gestionar Coches
              </button>
            </>
          )}
        </div>
        <button className="btn btn-danger mt-3" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    );
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
