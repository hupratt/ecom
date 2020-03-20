import React from "react";

const CategoryFilter = ({ handleSetActiveCategory }) => {
  return (
    <React.Fragment>
      <div className="ui form">
        <div className="filter-title">Category</div>
        <div className="book-category">
          <a href="#" onClick={handleSetActiveCategory}>
            Romance
          </a>
          <a href="#" onClick={handleSetActiveCategory}>
            História
          </a>
          <a href="#" onClick={handleSetActiveCategory}>
            Poesia
          </a>
          <a href="#" onClick={handleSetActiveCategory}>
            Contos
          </a>
          <a href="#" onClick={handleSetActiveCategory}>
            Crónicas
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CategoryFilter;
