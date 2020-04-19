import React from "react";
import PropTypes from "prop-types";
import EmailForm from "./EmailForm";
import { shortDescr } from "../../utility";
import { withTranslation } from "react-i18next";
import { endpoint } from "../../../constants";
import axios from "axios";
const propTypes = {
  handleAddToCart: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

class BookDetail extends React.Component {
  state = {
    bookDetailClicked: false,
    user_name: undefined,
    user_staff: false,
  };

  componentDidMount() {
    if (this.props.isAuthenticated) {
      axios
        .get(`${endpoint}/user-staff/`)
        .then((res) => {
          const { user_name, user_staff } = res.data;
          this.setState({ user_name, user_staff });
        })
        .catch((err) => console.log(err));
    }
  }

  showFullDescription = () => {
    this.setState({ bookDetailClicked: true });
  };
  visitEditPage = (id) => {
    this.props.history.push(`/books/${id}/edit`);
  };
  render() {
    const { handleAddToCart, book, isAuthenticated } = this.props;
    const { user_name, user_staff } = this.state;
    const stars_number_inverse = 5 - book.note;
    return (
      <div>
        {/* Product Shop Section Begin */}
        <React.Fragment>
          {book && (
            <section className="product-shop spad page-details">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="product-pic-zoom">
                          <img
                            className="product-big-img"
                            src={book.picture}
                            alt=""
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="product-details">
                          <div className="pd-title">
                            <span>{book.auteur_nom}</span>
                            <h3>{book.titre}</h3>
                          </div>
                          <div className="pd-rating">
                            {book.note &&
                              [...Array(book.note)].map((e, i) => (
                                <i
                                  className="fas fa-star"
                                  key={i}
                                  style={{ color: "#252525" }}
                                />
                              ))}
                            {book.note &&
                              [
                                ...Array(stars_number_inverse || 0),
                              ].map((e, i) => (
                                <i
                                  className="far fa-star"
                                  key={i}
                                  style={{ color: "#252525" }}
                                />
                              ))}
                          </div>
                          <div className="pd-desc">
                            <h4>
                              {book.prix} €
                              <span>
                                {" "}
                                {book.prix_barre} {book.prix_barre && "€"}
                              </span>
                            </h4>
                          </div>

                          {[
                            ...Array((book.langue_nom || "none").split("/")),
                          ].forEach((el) => (
                            <div className="pd-lang-choose">
                              <div className="sc-lang">
                                <input type="radio" id="sm-size" />
                                <label htmlFor="sm-lang">{el}</label>
                              </div>
                            </div>
                          ))}
                          {Array(
                            (book.langue_nom || "none").split("/")
                          ).forEach((el) => (
                            <a>{el}</a>
                          ))}
                          <div className="addcart">
                            <a
                              href="#"
                              className="primary-btn pd-cart"
                              onClick={() =>
                                handleAddToCart(book.id, isAuthenticated)
                              }
                            >
                              {this.props.t("Add To Cart")}
                            </a>
                          </div>
                          <EmailForm
                            isbn={book.isbn}
                            placeholder={this.props.t("Would buy")}
                          />
                          {user_name && user_staff && (
                            <React.Fragment>
                              <h1>Olá {user_name},</h1>
                              <button
                                className="primary-btn red"
                                onClick={() => this.visitEditPage(book.id)}
                              >
                                {this.props.t("Edit")}
                              </button>
                            </React.Fragment>
                          )}
                          <ul className="pd-tags">
                            <li>
                              <span>{this.props.t("CATEGORY")}</span>:{" "}
                              {book.genre_nom}
                            </li>
                            <li>
                              <span>{this.props.t("LANGUAGES")}</span>:{" "}
                              {book.langue_nom}
                            </li>
                          </ul>
                          <div className="pd-desc">
                            <p>{book.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </React.Fragment>
      </div>
    );
  }
}

BookDetail.propTypes = propTypes;

const BookDetailWithTranslation = withTranslation()(BookDetail);

export default BookDetailWithTranslation;
