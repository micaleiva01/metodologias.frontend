import React from 'react';

function Footer() {
  return (
    <footer className="footer py-4">
      <div className="container">
        <div className="row text-center text-md-start d-flex text-white">

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/Teams.jsx" className="text-decoration-none text-white">
                  Equipos
                </a>
              </li>
              <li>
                <a href="/schedule" className="text-decoration-none text-white">
                  Pilotos
                </a>
              </li>
              <li>
                <a href="/news" className="text-decoration-none text-white">
                  Noticias
                </a>
              </li>
              <li>
                <a href="/contact" className="text-decoration-none text-white">
                  Votaciones
                </a>
              </li>
            </ul>
          </div>

           {/* Social Media Links */}
           <div className="col-md-4 mb-3">
            <h5>Encuéntranos en redes sociales</h5>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">


              <a
                href="https://www.instagram.com/f1/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white">
                <img src='../images/instagram.webp' alt='instagram'/>
              </a>


              <a
                href="https://twitter.com/F1?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white">
                <img src='../images/twitter.png' alt='twitter'/>
              </a>


              <a
                href="https://www.youtube.com/channel/UCB_qr75-ydFVKSF9Dmo6izg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white">
                <img src='../images/youtube.webp' alt='youtube'/>
              </a>


            </div>
          </div>

          {/* Copyright */}
          <div className="col-md-4">
            <h5>Info</h5>
            <p className="small">
              &copy; {new Date().getFullYear()} Sitio web de la Formula 1 . No asociado a la marca oficial. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
