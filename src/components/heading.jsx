import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import f1logo from "../images/formula1logo.png";
import "../styles/heading.css";

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
                <a className="nav-link active text-center" aria-current="page" href="#inicio">
                  Inicio
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-center" href="#noticias">
                  Noticias
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-center" href="#pilotos">
                  Pilotos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-center" href="#votaciones">
                  Votaciones
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
