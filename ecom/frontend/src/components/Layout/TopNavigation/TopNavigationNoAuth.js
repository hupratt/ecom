import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";

const TopNavigationNoAuth = () => {
  return (
    <div>
      {/* Header Section Begin */}
      <header className="header-section">
        <div className="container">
          <div className="inner-header">
            <div className="row">
              <div className="col-lg-2 col-md-2">
                <Link to="/">
                  <img
                    src="https://bookshop-images-f1492f08-f236-4a55-afb7-70ded209cb24.s3.eu-west-2.amazonaws.com/resources/logo-petite-portugaise-300.png"
                    alt="la petite portugaise's logo"
                  />
                </Link>
              </div>
              <div className="col-lg-7 col-md-7">
                <div className="advanced-search">
                  <button type="button" className="category-btn">
                    All Categories
                  </button>
                  <form action="#" className="input-group">
                    <input type="text" placeholder="What do you need?" />
                    <button type="button" className="search-button">
                      <span className="ti-search" />
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-lg-3 text-right col-md-3">
                <ul className="nav-right">
                  <Link to="/login">
                    <li className="user-icon">
                      <FontAwesomeIcon icon={faUser} /> <span></span>
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Header End */}
    </div>
  );
};

export default TopNavigationNoAuth;
