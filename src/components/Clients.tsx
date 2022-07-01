import React from "react";

const Clients = () => {
  return (
    <div className="container">
      <div className="row no-gutters clients-wrap clearfix wow fadeInUp">
        <div className="col-lg-2 col-md-4 col-6">
          <div className="client-logo">
            <img
              src="assets/img/clients/client-1.png"
              className="img-fluid"
              alt=""
              data-aos="flip-right"
            />
          </div>
        </div>

        <div className="col-lg-2 col-md-4 col-6">
          <div className="client-logo">
            <img
              src="assets/img/clients/client-2.png"
              className="img-fluid"
              alt=""
              data-aos="flip-right"
              data-aos-delay="100"
            />
          </div>
        </div>

        <div className="col-lg-2 col-md-4 col-6">
          <div className="client-logo">
            <img
              src="assets/img/clients/client-3.png"
              className="img-fluid"
              alt=""
              data-aos="flip-right"
              data-aos-delay="200"
            />
          </div>
        </div>

        <div className="col-lg-2 col-md-4 col-6">
          <div className="client-logo">
            <img
              src="assets/img/clients/client-4.png"
              className="img-fluid"
              alt=""
              data-aos="flip-right"
              data-aos-delay="300"
            />
          </div>
        </div>

        <div className="col-lg-2 col-md-4 col-6">
          <div className="client-logo">
            <img
              src="assets/img/clients/client-5.png"
              className="img-fluid"
              alt=""
              data-aos="flip-right"
              data-aos-delay="400"
            />
          </div>
        </div>

        <div className="col-lg-2 col-md-4 col-6">
          <div className="client-logo">
            <img
              src="assets/img/clients/client-6.png"
              className="img-fluid"
              alt=""
              data-aos="flip-right"
              data-aos-delay="500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;
