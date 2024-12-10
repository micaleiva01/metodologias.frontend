import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import f1logo from "../images/formula1logo.png";
import "../styles/heading.css";
import "../pages/Pilots";

const logo = <img src={f1logo} alt="logo" style={{height: '30px'}}/>;

function Heading() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">{logo}</a>
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
                <a className="nav-link active text-center text-danger me-1 heading-link" href="#noticias">
                  Noticias
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active text-center text-danger mx-1 heading-link" href="#pilotos">
                  Pilotos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active text-center text-danger mx-2 heading-link" href="#votaciones">
                  Votaciones
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active text-center text-danger ms-2 heading-link" aria-current="page" href="#iniciosesion">
                  Iniciar Sesión
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Heading;
