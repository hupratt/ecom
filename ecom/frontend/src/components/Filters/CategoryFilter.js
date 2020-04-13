import React from "react";
import { useTranslation } from "react-i18next";

const CategoryFilter = ({ handleSetActiveCategory }) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <div className="ui form">
        <div className="filter-title"> {t("Category")}</div>
        <div className="book-category">
          <a href="#" onClick={handleSetActiveCategory}>
            {t("Romance")}
          </a>
          <a href="#" onClick={handleSetActiveCategory}>
            {t("História")}
          </a>
          <a href="#" onClick={handleSetActiveCategory}>
            {t("Poesia")}
          </a>
          <a href="#" onClick={handleSetActiveCategory}>
            {t("Contos")}
          </a>
          <a href="#" onClick={handleSetActiveCategory}>
            {t("Crónicas")}
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CategoryFilter;
