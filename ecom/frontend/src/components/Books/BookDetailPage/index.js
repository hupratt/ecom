import React from "react";
import { fetchCart, handleAddToCart } from "../../../actions/cart";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchBook } from "../../../actions/book";
import BookDetail from "./BookDetail";
import { Container } from "semantic-ui-react";
import { withLoading, withError } from "../../../hoc/hoc";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
const propTypes = {
  book: PropTypes.object.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorCart: PropTypes.object,
  error: PropTypes.object
};
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faPinterest
} from "@fortawesome/free-brands-svg-icons";

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
      <React.Fragment>
        {" "}
        {/* Breadcrumb Section Begin */}
        <div className="breacrumb-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-text product-more">
                  <Link to="/">
                    <FontAwesomeIcon icon={faHome} /> Home
                  </Link>
                  <span
                    style={{
                      color: "#252525"
                    }}
                  >
                    Detail
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
          />
        </Container>
        {/* Footer Section Begin */}
        <footer className="footer-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="footer-left">
                  <div className="footer-logo">
                    <a href="#">
                      <img src="img/footer-logo.png" alt="" />
                    </a>
                  </div>
                  <ul>
                    <li>Address: 60-49 Road 11378 New York</li>
                    <li>Phone: +65 11.188.888</li>
                    <li>Email: hello@gmail.com</li>
                  </ul>
                  <div className="footer-social">
                    <a href="#">
                      <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a href="#">
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="#">
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="#">
                      <FontAwesomeIcon icon={faPinterest} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 offset-lg-1">
                <div className="footer-widget">
                  <h5>Information</h5>
                  <ul>
                    <li>
                      <a href="#">About Us</a>
                    </li>
                    <li>
                      <a href="#">Checkout</a>
                    </li>
                    <li>
                      <a href="#">Contact</a>
                    </li>
                    <li>
                      <a href="#">Serivius</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2">
                <div className="footer-widget">
                  <h5>My Account</h5>
                  <ul>
                    <li>
                      <a href="#">My Account</a>
                    </li>
                    <li>
                      <a href="#">Contact</a>
                    </li>
                    <li>
                      <a href="#">Shopping Cart</a>
                    </li>
                    <li>
                      <a href="#">Shop</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="newslatter-item">
                  <h5>Join Our Newsletter Now</h5>
                  <p>
                    Get E-mail updates about our latest shop and special offers.
                  </p>
                  <form action="#" className="subscribe-form">
                    <input type="text" placeholder="Enter Your Mail" />
                    <button type="button">Subscribe</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="copyright-reserved">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="copyright-text">
                    Copyright © All rights reserved | This template is made with{" "}
                    <i className="fa fa-heart-o" aria-hidden="true" /> by{" "}
                    <a href="#" target="_blank">
                      hello
                    </a>
                  </div>
                  <div className="payment-pic">
                    <img
                      src="https://bookshop-images-f1492f08-f236-4a55-afb7-70ded209cb24.s3.eu-west-2.amazonaws.com/resources/payment-details.png"
                      alt="payment-details-icons"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
        {/* Footer Section End */}
      </React.Fragment>
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
