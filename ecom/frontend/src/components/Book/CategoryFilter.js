import React from "react";

const CategoryFilter = () => {
  return (
    <React.Fragment>
      <div className="ui form">
        <div className="filter-title">Category</div>
        <div className="book-category">
          <a href="#">Towel</a>
          <a href="#">Shoes</a>
          <a href="#">Coat</a>
          <a href="#">Dresses</a>
          <a href="#">Trousers</a>
          <a href="#">Men's hats</a>
          <a href="#">Backpack</a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CategoryFilter;
