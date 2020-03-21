import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faPinterest
} from "@fortawesome/free-brands-svg-icons";

const BottomNavigation = () => {
  return (
    <React.Fragment>
      {/* Footer Section Begin */}
      <footer className="footer-section">
        <div className="container footer-left footer-flex">
          <div>
            <div>
              <h5>Information</h5>

              <ul>
                <li>Address: 60-49 Road 11378 New York</li>
                <li>Phone: +65 11.188.888</li>
                <li>Email: hello@gmail.com</li>
              </ul>
              <div className="footer-social">
                <a href="#">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="#">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="#">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="#">
                  <FontAwesomeIcon icon={faPinterest} />
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="footer-widget">
              <h5>Links</h5>
              <ul>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Checkout</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">Serivius</a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="newslatter-item">
              <h5>Join Our Newsletter Now</h5>
              <p>
                Get E-mail updates about our latest shop and special offers.
              </p>
              <form action="#" className="subscribe-form">
                <input type="text" placeholder="Enter Your Mail" />
                <button type="button">Submit</button>
              </form>
            </div>
          </div>
        </div>
        <div className="copyright-reserved">
          <div className="container">
            <div className="row">
              <div>
                <div className="copyright-text">
                  Copyright © All rights reserved | This template is made with
                  <i className="fa fa-heart-o" aria-hidden="true" /> by a fellow
                  member
                  <a href="#" target="_blank">
                    hello
                  </a>
                </div>
                <div className="payment-pic">
                  <img
                    src="https://bookshop-images-f1492f08-f236-4a55-afb7-70ded209cb24.s3.eu-west-2.amazonaws.com/resources/payment-details.png"
                    alt="payment-details-icons"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* Footer Section End */}
    </React.Fragment>
  );
};

export default BottomNavigation;
