import React, { useEffect, useState } from "react";
import Votings from "../pages/Votings";
import Teams from "../pages/Teams";
import Cars from "../pages/Cars";
import Pilots from "../pages/Pilots";
import Login from "../pages/Login";
import News from "../pages/News";
import Calendar from "../pages/Calendar";
import Circuits from "../pages/Circuits";
import f1logo from "../images/formula1logo.png";
import "../styles/heading.css";
import "bootstrap/dist/css/bootstrap.min.css";

const logo = <img src={f1logo} alt="logo" style={{ height: "30px" }} />;

const Heading = () => {
  const [activeComponent, setActiveComponent] = useState(
    localStorage.getItem("activeComponent") || "Home"
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    localStorage.setItem("activeComponent", activeComponent);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, [activeComponent]);

  const renderComponent = () => {
    switch (activeComponent) {
      case "Circuits":
        return <Circuits />;
      case "Calendar":
        return <Calendar />;
      case "News":
        return <News />;
      case "Teams":
        return <Teams />;
      case "Cars":
        return <Cars />;
      case "Votings":
        return <Votings />;
      case "Pilots":
        return <Pilots />;
      case "Login":
        return <Login />;
      default:
        return <Votings />;
    }
  };

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              {logo}
            </a>
            <button
              className="navbar-toggler custom-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse heading-text" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeComponent === "News" ? "active" : ""} me-2`}
                    href="../pages/News.jsx"
                    onClick={() => setActiveComponent("News")}
                  >
                    NOTICIAS
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeComponent === "Votings" ? "active" : ""} me-1`}
                    href="../pages/Votings.jsx"
                    onClick={() => setActiveComponent("Votings")}
                  >
                    VOTACIONES
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeComponent === "Pilots" ? "active" : ""} mx-2`}
                    href="../pages/Pilots.jsx"
                    onClick={() => setActiveComponent("Pilots")}
                  >
                    PILOTOS
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeComponent === "Teams" ? "active" : ""} me-1`}
                    href="../pages/Teams.jsx"
                    onClick={() => setActiveComponent("Teams")}
                  >
                    EQUIPOS
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeComponent === "Cars" ? "active" : ""} me-1`}
                    href="../pages/Cars.jsx"
                    onClick={() => setActiveComponent("Cars")}
                  >
                    COCHES
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeComponent === "Calendar" ? "active" : ""} me-2`}
                    href="../pages/Calendar.jsx"
                    onClick={() => setActiveComponent("Calendar")}
                  >
                    CALENDARIO
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeComponent === "Circuits" ? "active" : ""} me-2`}
                    href="../pages/Circuits.jsx"
                    onClick={() => setActiveComponent("Circuits")}
                  >
                    CIRCUITOS
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeComponent === "Login" ? "active" : ""} me-1`}
                    href="../pages/Login.jsx"
                    onClick={() => setActiveComponent("Login")}
                  >
                    {user ? "INICIO" : "INICIAR SESIÓN"}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main className="container mt-4">{renderComponent()}</main>
    </div>
  );
};

export default Heading;
