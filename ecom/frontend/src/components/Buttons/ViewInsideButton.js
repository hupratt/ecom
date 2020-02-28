import React from "react";

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

export default ViewInsideButton;
