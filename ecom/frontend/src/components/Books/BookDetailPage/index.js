import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { fetchBook } from "../../../actions/book";
import { fetchCart, handleAddToCart } from "../../../actions/cart";
import { withError, withLoading } from "../../../hoc/hoc";
import BookDetail from "./BookDetail";
import { fetchBooks } from "../../../actions/books";
import { Trans } from "react-i18next";

const propTypes = {
  book: PropTypes.object.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorCart: PropTypes.object,
  error: PropTypes.object,
};

class BookDetailPage extends React.Component {
  componentDidMount() {
    console.log(this.props.isAuthenticated);
    window.scrollTo(0, 0);
    this.props.fetchBook(
      this.props.match.params.bookID,
      this.props.dataIsCached
    );
    if (this.props.isAuthenticated == true) {
      this.props.refreshCart();
    }
  }

  render() {
    const {
      book,
      handleAddToCart,
      isAuthenticated,
      error,
      errorCart,
      history,
    } = this.props;
    return (
      <React.Fragment>
        {/* Breadcrumb Section Begin */}
        <div className="breacrumb-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-text product-more">
                  <Link to="/">
                    <i className="fas fa-home" /> <Trans i18nKey="Home" />
                  </Link>
                  <span
                    style={{
                      color: "#252525",
                    }}
                  >
                    <Trans i18nKey="Detail" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Breadcrumb Section End */}
        <Container>
          <BookDetailWithLoadingAndErrorHandling
            handleAddToCart={handleAddToCart}
            book={book}
            isAuthenticated={isAuthenticated}
            error={error}
            errorCart={errorCart}
            history={history}
          />
        </Container>
      </React.Fragment>
    );
  }
}

const BookDetailWithLoading = withLoading(BookDetail);
const BookDetailWithLoadingAndErrorHandling = withError(BookDetailWithLoading);

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBooks: (url_endpoint) => dispatch(fetchBooks(url_endpoint)),

    refreshCart: () => dispatch(fetchCart()),
    fetchBook: (id, dataIsCached) => dispatch(fetchBook(id, dataIsCached)),
    handleAddToCart: (id, isAuthenticated) =>
      dispatch(handleAddToCart(id, isAuthenticated)),
  };
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.book.loading,
    error: state.book.error,
    errorCart: state.cart.error,
    data: state.book.data,
    book: state.book.book,
    dataIsCached: state.book.dataIsCached,
    shoppingCart: state.cart.shoppingCart,
    offset: state.books.offset,
  };
};

BookDetailPage.propTypes = propTypes;

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BookDetailPage)
);
