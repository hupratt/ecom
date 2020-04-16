import React from "react";
import PropTypes from "prop-types";
import { s3_base_url } from "../../../constants";
import EmailForm from "./EmailForm";
import { shortDescr } from "../../utility";
import { withTranslation } from "react-i18next";

const propTypes = {
  handleAddToCart: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

class BookDetail extends React.Component {
  state = {
    bookDetailClicked: false,
  };
  showFullDescription = () => {
    this.setState({ bookDetailClicked: true });
  };
  visitEditPage = (id) => {
    this.props.history.push(`/books/${id}/edit`);
  };
  render() {
    const { handleAddToCart, book, isAuthenticated } = this.props;
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
                        {isAuthenticated && (
                          <button onClick={() => this.visitEditPage(book.id)}>
                            Edit
                          </button>
                        )}
                        <div className="product-pic-zoom">
                          <img
                            className="product-big-img"
                            src={s3_base_url + book.isbn + ".jpg"}
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

                          <EmailForm
                            isbn={book.isbn}
                            placeholder={this.props.t("Would buy")}
                          />
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
                            {this.state.bookDetailClicked ? (
                              <p>{book.description}</p>
                            ) : (
                              <React.Fragment>
                                <p>{shortDescr(book.description)}</p>
                                <a
                                  style={{ fontStyle: "italic" }}
                                  onClick={() => this.showFullDescription()}
                                >
                                  {this.props.t("Read More")}
                                </a>
                              </React.Fragment>
                            )}
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
