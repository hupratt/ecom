import React from "react";
import SearchNav from "./SearchNav";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const TopNavigationNoAuth = ({ onSearchChange }) => {
  // const { i18n } = useTranslation();

  // const changeLanguage = (lng) => i18n.changeLanguage(lng);

  return (
    <React.Fragment>
      <SearchNav onSearchChange={onSearchChange} />
      {/* <div className="col-lg-3 text-right col-md-3">
        <ul className="nav-right">
          <a onClick={() => changeLanguage("pt")}>PT</a>
          <a onClick={() => changeLanguage("de")}> / DE</a>
          <a onClick={() => changeLanguage("en")}> / EN</a>
          <a onClick={() => changeLanguage("fr")}> / FR</a>
        </ul>
      </div> */}
      <div className="col-lg-3 text-right col-md-3">
        <ul className="nav-right">
          <Link to="/login" className="hoverbtn">
            Log in
          </Link>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default TopNavigationNoAuth;
