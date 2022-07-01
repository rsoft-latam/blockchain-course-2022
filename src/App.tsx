import React from "react";
import "./App.css";
// @ts-ignore
import { connectWallet } from "./ethereum/web3";

import Coin from "./components/Coin";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Pricing from "./components/Pricing";
import Features from "./components/Features";
import Clients from "./components/Clients";

function App() {
  return (
    <div>
      <Header />

      <section id="hero">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div
              className=" col-lg-6 py-5 py-lg-0 order-2 order-lg-1"
              data-aos="fade-right"
            >
              <h1>Tu nueva experiencia digital</h1>
              <h2>Compromiso de excelencia</h2>
              <a
                href="#about"
                className="btn-get-started-blanck scrollto"
                style={{ marginLeft: "10px" }}
                onClick={() => connectWallet()}
              >
                Conectar Billetera
              </a>
            </div>
            <div
              className="col-lg-6 order-1 order-lg-2 hero-img"
              data-aos="fade-left"
            >
              <img src="assets/img/coin.png" className="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </section>

      <main id="main">
        <section id="clients" className="clients section-bg">
          <Clients />
        </section>

        <section id="features" className="features section-bg">
          <Features />
        </section>

        <section id="pricing" className="pricing section-bg">
          <Pricing />
        </section>

        <section id="contact" className="contact section-bg">
          <Coin />
        </section>
      </main>

      <Footer />

      <a
        href=""
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short" />
      </a>
    </div>
  );
}

export default App;
