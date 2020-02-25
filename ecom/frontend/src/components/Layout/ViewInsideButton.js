import React from "react";

class ViewInsideButton extends React.Component {
  state = {
    flip: false,
    className: "bk-bookdefault"
  };
  handleFlip = (flipState, isbn) => {
    this.setState({
      flip: !flipState,
      className: flipState ? "bk-viewinside" : "bk-bookdefault"
    });
    let book = document.getElementById(isbn);
    let image = document.querySelector(`div[id='${isbn}'] img`);
    let bookcoverinside = document.querySelector(".bk-cover-back");
    if (flipState) {
      book.classList.add("bk-bookdefault");
      book.classList.remove("bk-viewinside");
      image.classList.remove("whitebackground");
      bookcoverinside.classList.remove("whitebackground");
      book.classList.remove("whitebackground");
    } else {
      book.classList.remove("bk-bookdefault");
      book.classList.add("bk-viewinside");
      image.classList.add("whitebackground");
      bookcoverinside.classList.add("whitebackground");
      book.classList.add("whitebackground");
    }
  };
  render() {
    let { flip, className } = this.state;
    let { isbn } = this.props;

    return (
      <button
        className={className}
        onClick={() => {
          this.handleFlip(flip, isbn);
        }}
      >
        View Inside
      </button>
    );
  }
}

export default ViewInsideButton;
