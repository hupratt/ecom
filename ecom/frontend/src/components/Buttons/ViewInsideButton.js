import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  isbn: PropTypes.string
};

const handleViewInside = isbn => {
  let book = document.getElementById(isbn);
  let className = book.className;
  if (className == "bk-book bk-bookdefault") {
    book.classList.remove("bk-bookdefault");
    book.classList.add("bk-viewinside");
  } else {
    book.classList.add("bk-bookdefault");
    book.classList.remove("bk-viewinside");
  }
};

const ViewInsideButton = ({ isbn }) => {
  return (
    <button
      onClick={() => {
        handleViewInside(isbn);
      }}
    >
      View Inside
    </button>
  );
};

ViewInsideButton.propTypes = propTypes;

export default ViewInsideButton;
