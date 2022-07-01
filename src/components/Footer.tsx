import React from "react";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row  justify-content-center">
            <div className="col-lg-6">
              <h3>RSoft Latam</h3>
              <p>
                Et aut eum quis fuga eos sunt ipsa nihil. Labore corporis magni
                eligendi fuga maxime saepe commodi placeat.
              </p>
            </div>
          </div>

          <div className="row footer-newsletter justify-content-center">
            <div className="col-lg-6">
              <form action="src/components/Footer" method="post">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                />
                <input type="submit" value="Subscribe" />
              </form>
            </div>
          </div>

          <div className="social-links">
            <a href="https://twitter.com/rsoft_latam" className="twitter">
              <i className="bx bxl-twitter" />
            </a>
            <a href="https://www.facebook.com/RsoftLatam" className="facebook">
              <i className="bx bxl-facebook" />
            </a>
            <a
              href="https://www.youtube.com/c/rsoftlatam"
              className="instagram"
            >
              <i className="bx bxl-youtube" />
            </a>
            <a href="https://github.com/rsoft-latam" className="google-plus">
              <i className="bx bxl-github" />
            </a>
            <a
              href="https://www.linkedin.com/in/ricardo-pari-534070139"
              className="linkedin"
            >
              <i className="bx bxl-linkedin" />
            </a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom clearfix">
        <div className="copyright">
          &copy; Copyright{" "}
          <strong>
            <span>RSoft Latam</span>
          </strong>
          . All Rights Reserved
        </div>
        <div className="credits">
          Designed by <a href="https://rsoft-latam.web.app">RSoft Latam</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
