import React from "react";
import BookList from "../components/Books/BookListPage/index";

class BookListWrapper extends React.Component {
  render() {
    {
      // console.log(this.props);
      return <BookList {...this.props} />;
    }
  }
}

export default BookListWrapper;
