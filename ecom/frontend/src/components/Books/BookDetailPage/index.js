import React from "react";
import { fetchCart, handleAddToCart } from "../../../actions/cart";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchBook } from "../../../actions/book";
import BookDetail from "./BookDetail";
import { Container } from "semantic-ui-react";
import { withLoading, withError } from "../../../hoc/hoc";

const propTypes = {
  book: PropTypes.object.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorCart: PropTypes.object,
  error: PropTypes.object
};
class BookDetailPage extends React.Component {
  componentDidMount() {
    this.props.fetchBook(
      this.props.match.params.bookID,
      this.props.dataIsCached
    );
    this.props.refreshCart();
  }

  render() {
    const { book, handleAddToCart, isAuthenticated } = this.props;
    return (
      <Container>
        <BookDetailWithLoadingAndErrorHandling
          handleAddToCart={handleAddToCart}
          book={book}
          isAuthenticated={isAuthenticated}
        />
      </Container>
    );
  }
}

const BookDetailWithLoading = withLoading(BookDetail);
const BookDetailWithLoadingAndErrorHandling = withError(BookDetailWithLoading);

const mapDispatchToProps = dispatch => {
  return {
    refreshCart: () => dispatch(fetchCart()),
    fetchBook: (id, dataIsCached) => dispatch(fetchBook(id, dataIsCached)),
    handleAddToCart: (id, isAuthenticated) =>
      dispatch(handleAddToCart(id, isAuthenticated))
  };
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.book.loading,
    error: state.book.error,
    errorCart: state.cart.error,
    data: state.book.data,
    book: state.book.book,
    dataIsCached: state.book.dataIsCached,
    shoppingCart: state.cart.shoppingCart
  };
};

BookDetailPage.propTypes = propTypes;

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BookDetailPage)
);
