import React from "react";

const SearchNav = () => {
  return (
    <React.Fragment>
      <div className="col-lg-7 col-md-7">
        <div className="advanced-search">
          <button type="button" className="category-btn">
            All Categories
          </button>
          <form action="#" className="input-group">
            <input
              type="text"
              placeholder="What are you looking for?"
              style={{ color: "#0f0f0f" }}
            />
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchNav;
