import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  isbn: PropTypes.string.isRequired
};
const handleFlip = isbn => {
  let book = document.getElementById(isbn);
  let className = book.className;
  if (className === "bk-book bk-viewback") {
    book.classList.add("bk-bookdefault");
    book.classList.remove("bk-viewback");
  } else {
    book.classList.remove("bk-bookdefault");
    book.classList.add("bk-viewback");
  }
};
const FlipButton = ({ isbn }) => {
  return (
    <button
      onClick={() => {
        handleFlip(isbn);
      }}
    >
      Flip
    </button>
  );
};
FlipButton.propTypes = propTypes;

export default FlipButton;
