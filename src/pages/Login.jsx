import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateUser from "../components/CreateUser";

const Login = () => {
  const [showRegister, setShowRegister] = useState(false);

  const handleShowRegister = () => setShowRegister(true);
  const handleHideRegister = () => setShowRegister(false);

  if (showRegister) {
    return <CreateUser onCancel={handleHideRegister} />;
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="border border-danger p-4 shadow text-light" style={{ width: "400px" }}>
        <h1 className="text-center mb-4 input-title">INICIAR SESIÓN</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label input-login">
              Nombre de Usuario:
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Introduce tu nombre de usuario"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label input-login">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Introduce tu contraseña"
              required
            />
          </div>
          <button type="button" className="btn btn-danger w-100">
            ENTRAR
          </button>
        </form>
        <p className="text-center mt-3">
          Si no tienes cuenta, haz click{" "}
          <span
            style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
            onClick={handleShowRegister}
          >
            aquí
          </span>.
        </p>
      </div>
    </div>
  );
};

export default Login;
