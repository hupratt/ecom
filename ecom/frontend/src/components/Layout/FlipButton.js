import React from "react";

class FlipButton extends React.Component {
  state = {
    flip: false,
    className: "bk-bookdefault"
  };
  handleFlip = (flipState, isbn) => {
    this.setState({
      flip: !flipState,
      className: flipState ? "bk-viewback" : "bk-bookdefault"
    });
    let book = document.getElementById(isbn);
    if (flipState) {
      book.classList.add("bk-bookdefault");
      book.classList.remove("bk-viewback");
    } else {
      book.classList.remove("bk-bookdefault");
      book.classList.add("bk-viewback");
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
        Flip
      </button>
    );
  }
}

export default FlipButton;
