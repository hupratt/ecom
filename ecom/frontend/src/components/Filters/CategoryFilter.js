import React from "react";

const CategoryFilter = ({ handleSetActiveCategory }) => {
  return (
    <React.Fragment>
      <div className="ui form">
        <div className="filter-title">Category</div>
        <div className="book-category">
          <a href="javascript:void(0)" onClick={handleSetActiveCategory}>
            Romance
          </a>
          <a href="javascript:void(0)" onClick={handleSetActiveCategory}>
            História
          </a>
          <a href="javascript:void(0)" onClick={handleSetActiveCategory}>
            Poesia
          </a>
          <a href="javascript:void(0)" onClick={handleSetActiveCategory}>
            Contos
          </a>
          <a href="javascript:void(0)" onClick={handleSetActiveCategory}>
            Crónicas
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CategoryFilter;
