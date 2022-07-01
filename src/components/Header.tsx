import React from "react";

const Header = () => {
  return (
    <header id="header">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="logo">
          <h1>
            <a href="">UPB COIN</a>
          </h1>
        </div>

        <nav id="navbar" className="navbar">
          <ul>
            <li>
              <a
                className="nav-link scrollto active"
                href="src/components/Header#hero"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                className="nav-link scrollto"
                href="src/components/Header#pricing"
              >
                Precio
              </a>
            </li>
            <li>
              <a
                className="nav-link scrollto"
                href="src/components/Header#features"
              >
                Funciones
              </a>
            </li>
            <li>
              <a
                className="nav-link scrollto"
                href="src/components/Header#contact"
              >
                Comprar
              </a>
            </li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle" />
        </nav>
      </div>
    </header>
  );
};

export default Header;
