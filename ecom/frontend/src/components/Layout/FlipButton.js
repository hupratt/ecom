import React from "react";

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

export default FlipButton;
