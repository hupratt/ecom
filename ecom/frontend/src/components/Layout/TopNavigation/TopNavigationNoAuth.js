import React from "react";
import SearchNav from "./SearchNav";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ReactFlagsSelect from "react-flags-select";
import "react-flags-select/css/react-flags-select.css";

const TopNavigationNoAuth = ({ onSearchChange }) => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => i18n.changeLanguage(lng);
  const pt = t("Portuguese");
  const fr = t("French");
  const de = t("German");
  const en = t("English");
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
          <ReactFlagsSelect
            countries={["PT", "EN", "FR", "DE"]}
            customLabels={{
              PT: pt,
              GB: en,
              FR: fr,
              DE: de,
            }}
            placeholder="Select Language"
            showSelectedLabel={false}
          />
        </ul>
      </div>
    </React.Fragment>
  );
};

export default TopNavigationNoAuth;
