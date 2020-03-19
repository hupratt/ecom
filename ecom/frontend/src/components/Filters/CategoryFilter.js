import React from "react";

const CategoryFilter = ({ handleSetActiveCategory }) => {
  return (
    <React.Fragment>
      <div className="ui form">
        <div className="filter-title">Category</div>
        <div className="book-category">
          <a onClick={handleSetActiveCategory}>Romance</a>
          <a onClick={handleSetActiveCategory}>História</a>
          <a onClick={handleSetActiveCategory}>Poesia</a>
          <a onClick={handleSetActiveCategory}>Contos</a>
          <a onClick={handleSetActiveCategory}>Crónicas</a>
          <a onClick={handleSetActiveCategory}>Cozinha</a>
          <a onClick={handleSetActiveCategory}>Biografia</a>
          <a onClick={handleSetActiveCategory}>Viagens</a>
          <a onClick={handleSetActiveCategory}>Arte</a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CategoryFilter;
