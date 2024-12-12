import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error("Se ha producido un error");
            }

            const data = await response.json();
            localStorage.setItem("token", data.token);
            alert("Se ha iniciado sesion correctamente!");
        } catch (error) {
            alert(error.message);
        }
    };

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
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-danger w-100"
                        onClick={handleLogin}
                    >
                        ENTRAR
                    </button>
                </form>
                <p className="text-center mt-3">
                    Si no tienes cuenta, haz click <a href="/signup">aquí</a>.
                </p>
            </div>
        </div>
    );
};

export default Login;
