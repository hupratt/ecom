import React from "react";

const BottomNavigation = () => {
  return (
    <React.Fragment>
      {/* Footer Section Begin */}
      <footer className="footer-section">
        <div className="container footer-left footer-flex">
          <div className="centermyitems">
            <h5>Information</h5>

            <ul>
              <li>Chaussée de Wavre 214B, 1050 Ixelles</li>
              <li>admin@lapetiteportugaise.com </li>
            </ul>
            <div className="footer-social">
              <a href="https://www.facebook.com/lapetiteportugaisebxl/">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="https://www.instagram.com/lapetiteportugaise.bxl/">
                <i className="fab fa-instagram" />
              </a>
              <a href="https://github.com/hupratt/ecom">
                <i className="fab fa-github" />
              </a>
            </div>
          </div>
          <div className="centermyitems">
            <h5>Opening Times</h5>

            <ul>
              <li>Tuesday to Friday: 12:00 - 15:00</li>
              <li>Saturday: 13:00 - 17:00</li>
              <li>Sunday: 14:00 - 17:00 </li>
            </ul>
          </div>
          <div className="footer-widget centermyitems">
            <h5>Links</h5>
            <ul>
              <li>
                <a href="https://www.lapetiteportugaise.eu">About Us</a>
              </li>
              <li>
                <a href="https://www.lapetiteportugaise.eu">Events</a>
              </li>
              <li>
                <a href="https://www.lapetiteportugaise.eu">Contact</a>
              </li>
              <li>
                <a href="https://www.lapetiteportugaise.eu">Privacy Policy</a>
              </li>
              <li>
                <a href="https://www.lapetiteportugaise.eu">Terms of Use</a>
              </li>
            </ul>
          </div>
          <div className="newslatter-item centermyitems">
            <h5>Join Our Newsletter Now</h5>
            <p>Get E-mail updates about our latest shop and special offers.</p>
            <form action="#" className="subscribe-form">
              <input type="text" placeholder="Enter Your Mail" />
              <button type="button">Submit</button>
            </form>
          </div>
        </div>
        <div className="copyright-reserved">
          <div className="copyright-text">
            Copyright © All rights reserved | Made with
            <i
              className="fas fa-heart"
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                marginTop: "3px"
              }}
            />
            by a fellow member
          </div>
          <img
            src="https://bookshop-images-f1492f08-f236-4a55-afb7-70ded209cb24.s3.eu-west-2.amazonaws.com/resources/payment-details.png"
            alt="payment-details-icons"
          />
        </div>
      </footer>
      {/* Footer Section End */}
    </React.Fragment>
  );
};

export default BottomNavigation;
