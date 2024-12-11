import React, { useEffect , useState} from "react";
import Votings from '../pages/Votings';
import Teams from '../pages/Teams';
import Pilots from "../pages/Pilots";
import Login from "..pages/Login";
import f1logo from "../images/formula1logo.png";
import "../styles/heading.css";
import "bootstrap/dist/css/bootstrap.min.css";


const logo = <img src={f1logo} alt="logo" style={{height: '30px'}}/>;


const Heading = () => {
  const [activeComponent, setActiveComponent] = useState(
    localStorage.getItem('activeComponent') || 'Home');

useEffect(() => {
  localStorage.setItem('activeComponent', activeComponent);
}, [activeComponent]);    

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Teams':
        return <Teams />;
      case 'Votings':
        return <Votings />;
      case 'Pilots':
        return <Pilots />;
      case 'Login':
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
                  <a className={`nav-link ${activeComponent === 'Votings' ? 'active' : ''} me-1`} 
                      href="../pages/Votings.jsx" 
                      onClick={() => setActiveComponent('Votings')}>
                      VOTACIONES
                  </a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${activeComponent === 'Pilots' ? 'active' : ''} mx-2`} 
                    href="../pages/Pilots.jsx" 
                    onClick={() => setActiveComponent('Pilots')}>
                    PILOTOS
                  </a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${activeComponent === 'Teams' ? 'active' : ''} me-1`} 
                    href="../pages/Teams.jsx"  
                    onClick={() => setActiveComponent('Teams')}>
                    EQUIPOS
                  </a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${activeComponent === 'Login' ? 'active' : ''} me-1`} 
                    href="../pages/Login.jsx"  
                    onClick={() => setActiveComponent('Login')}>
                    INICIAR SESIÓN
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main className="container mt-4">
        {renderComponent()}
      </main>
    </div>
  );
};



export default Heading;


/*
import React from "react";
import { Link } from "react-router-dom";
import f1logo from "../images/formula1logo.png";
import "../styles/heading.css";
import "bootstrap/dist/css/bootstrap.min.css";

const logo = <img src={f1logo} alt="logo" style={{height: '30px'}}/>;


function Heading() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">{logo}</Link>
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
                <Link className="nav-link active text-center text-danger me-1 heading-link" to="#">
                  Noticias
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active text-center text-danger mx-1 heading-link" to="../pages/Pilots.jsx">
                  Pilotos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active text-center text-danger mx-2 heading-link" to="../pages/Votings.jsx">
                  Votaciones
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active text-center text-danger ms-2 heading-link" to="#">
                  Iniciar Sesión
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}



aca arranca el primero


function Heading() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Formula 1 Logo" style={{ height: "40px" }} />
          </Link>
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
                <Link className="nav-link active text-center text-danger me-1 heading-link" to="/noticias">
                  Noticias
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active text-center text-danger mx-1 heading-link" to="/pilots">
                  Pilotos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active text-center text-danger mx-2 heading-link" to="/votaciones">
                  Votaciones
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active text-center text-danger ms-2 heading-link" to="/iniciar-sesion">
                  Iniciar Sesión
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

*/
