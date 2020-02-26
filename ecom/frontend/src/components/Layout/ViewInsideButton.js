import React from "react";

const handleViewInside = isbn => {
  let book = document.getElementById(isbn);
  let className = book.className;
  let image = document.querySelector(`div[id='${isbn}'] img`);
  let bookcoverinside = document.querySelector(".bk-cover-back");
  if (className === "bk-book bookdefault") {
    book.classList.remove("bk-bookdefault");
    book.classList.add("bk-viewinside");
    image.classList.add("whitebackground");
    bookcoverinside.classList.add("whitebackground");
    book.classList.add("whitebackground");
  } else {
    book.classList.add("bk-bookdefault");
    book.classList.remove("bk-viewinside");
    image.classList.remove("whitebackground");
    bookcoverinside.classList.remove("whitebackground");
    book.classList.remove("whitebackground");
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
