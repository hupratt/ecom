import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const TopNavigationNoAuth = () => {
  return (
    <React.Fragment>
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
          <Link to="/login" className="hoverbtn">
            Sign up
          </Link>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default TopNavigationNoAuth;
