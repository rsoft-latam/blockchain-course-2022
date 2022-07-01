import React from "react";

const Pricing = () => {
  return (
    <div className="container">
      <div className="section-title">
        <h2 data-aos="fade-in">PRECIO</h2>
        <p data-aos="fade-in">
          Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex
          aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos
          quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia
          fugiat sit in iste officiis commodi quidem hic quas.
        </p>
      </div>

      <div className="row no-gutters">
        <div className="col-lg-4 box" data-aos="zoom-in">
          <h3>Plata</h3>
          <h4>
            $0<span>per month</span>
          </h4>
          <ul>
            <li>
              <i className="bx bx-check" /> Quam adipiscing vitae proin
            </li>
            <li>
              <i className="bx bx-check" /> Nec feugiat nisl pretium
            </li>
            <li>
              <i className="bx bx-check" /> Nulla at volutpat diam uteera
            </li>
            <li className="na">
              <i className="bx bx-x" />
              <span>Pharetra massa massa ultricies</span>
            </li>
            <li className="na">
              <i className="bx bx-x" />
              <span>Massa ultricies mi quis hendrerit</span>
            </li>
          </ul>
          <a
            href="src/components/pricing#Pricing.tsx"
            className="get-started-btn"
          >
            Get Started
          </a>
        </div>

        <div className="col-lg-4 box featured" data-aos="zoom-in">
          <h3>Oro</h3>
          <h4>
            $29<span>per month</span>
          </h4>
          <ul>
            <li>
              <i className="bx bx-check" /> Quam adipiscing vitae proin
            </li>
            <li>
              <i className="bx bx-check" /> Nec feugiat nisl pretium
            </li>
            <li>
              <i className="bx bx-check" /> Nulla at volutpat diam uteera
            </li>
            <li>
              <i className="bx bx-check" /> Pharetra massa massa ultricies
            </li>
            <li>
              <i className="bx bx-check" /> Massa ultricies mi quis hendrerit
            </li>
          </ul>
          <a
            href="src/components/pricing#Pricing.tsx"
            className="get-started-btn"
          >
            Get Started
          </a>
        </div>

        <div className="col-lg-4 box" data-aos="zoom-in">
          <h3>Bronce</h3>
          <h4>
            $49<span>per month</span>
          </h4>
          <ul>
            <li>
              <i className="bx bx-check" /> Quam adipiscing vitae proin
            </li>
            <li>
              <i className="bx bx-check" /> Nec feugiat nisl pretium
            </li>
            <li>
              <i className="bx bx-check" /> Nulla at volutpat diam uteera
            </li>
            <li>
              <i className="bx bx-check" /> Pharetra massa massa ultricies
            </li>
            <li>
              <i className="bx bx-check" /> Massa ultricies mi quis hendrerit
            </li>
          </ul>
          <a
            href="src/components/pricing#Pricing.tsx"
            className="get-started-btn"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
