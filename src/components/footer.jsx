import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import instagramLogo from '../images/instagram.webp';
import twitterLogo from '../images/twitter.png';
import youtubeLogo from '../images/youtube.png';

function Footer() {
  return (
    <footer className="footer py-4">
      <div className="container">
        <div className="row text-center text-md-start d-flex text-white">

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5>LINKS</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/teams" className="text-white footer-link">
                  Equipos
                </Link>
              </li>
              <li>
                <Link to="/pilots" className="text-white footer-link">
                  Pilotos
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-white footer-link">
                  Noticias
                </Link>
              </li>
              <li>
                <Link to="/votings" className="text-white footer-link">
                  Votaciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="col-md-4 mb-3">
            <h5>NUESTRAS REDES</h5>
            <div className="d-flex gap-3 footer-logos">

              <a 
                href="https://www.instagram.com/f1/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white py-2 pe-2 footer-img">
                <img src={instagramLogo} alt="Instagram" style={{height: '50px'}}/>              
              </a>

              <a
                href="https://twitter.com/F1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white p-2 footer-img">
                <img src={twitterLogo} alt="Twitter" style={{height: '40px'}}/>
              </a>

              <a
                href="https://www.youtube.com/channel/UCB_qr75-ydFVKSF9Dmo6izg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white p-2 footer-img">
                <img src={youtubeLogo} alt="YouTube" style={{height: '40px'}}/>
              </a>

            </div>
          </div>

          {/* Copyright */}
          <div className="col-md-4">
            <h5>INFO</h5>
            <p className="small">
              &copy; {new Date().getFullYear()} Sitio web de la Formula 1. No asociado a la marca oficial. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
