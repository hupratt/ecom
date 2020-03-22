import React from "react";
import { Link } from "react-router-dom";
import SearchNav from "./SearchNav";

const TopNavigationNoAuth = () => {
  return (
    <React.Fragment>
      <SearchNav />
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
