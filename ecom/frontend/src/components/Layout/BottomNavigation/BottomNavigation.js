import React from "react";
import { useTranslation } from "react-i18next";
import SubscriptionForm from "./SubscriptionForm";

const BottomNavigation = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      {/* Footer Section Begin */}
      <footer className="footer-section">
        <div className="container footer-left footer-flex">
          <div className="centermyitems">
            <h5> {t("Information")}</h5>

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
            <h5> {t("Opening Times")}</h5>

            <ul>
              <li> {t("T-F")}12:00 - 15:00</li>
              <li> {t("S")}13:00 - 17:00</li>
              <li> {t("Sun")}14:00 - 17:00 </li>
            </ul>
          </div>
          <div className="footer-widget centermyitems">
            <h5>Links</h5>
            <ul>
              <li>
                <a href="https://www.lapetiteportugaise.eu">{t("About Us")}</a>
              </li>
              <li>
                <a href="https://www.lapetiteportugaise.eu">{t("Events")}</a>
              </li>
              <li>
                <a href="https://www.lapetiteportugaise.eu">{t("Contact")}</a>
              </li>
              <li>
                <a href="https://www.lapetiteportugaise.eu">
                  {t("Privacy Policy")}
                </a>
              </li>
              <li>
                <a href="https://www.lapetiteportugaise.eu">
                  {t("Terms of Use")}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="copyright-reserved">
          <div className="copyright-text">
            {t("Copyright")}
            <i className="far fa-heart" />
            {t("Made By")}
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
