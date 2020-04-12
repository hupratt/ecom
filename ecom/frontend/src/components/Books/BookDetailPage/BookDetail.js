import React from "react";
import PropTypes from "prop-types";
import { s3_base_url } from "../../../constants";
import EmailForm from "./EmailForm";

const propTypes = {
  handleAddToCart: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const BookDetail = ({ handleAddToCart, book, isAuthenticated }) => {
  const stars_number_inverse = 5 - book.note;
  console.log("stars_number_inverse", stars_number_inverse);
  console.log("book.note", book.note);
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
                              ...Array(stars_number_inverse || 0)
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
                          ...Array((book.langue_nom || "none").split("/"))
                        ].forEach(el => (
                          <div className="pd-lang-choose">
                            <div className="sc-lang">
                              <input type="radio" id="sm-size" />
                              <label htmlFor="sm-lang">{el}</label>
                            </div>
                          </div>
                        ))}
                        {Array((book.langue_nom || "none").split("/")).forEach(
                          el => (
                            <a>{el}</a>
                          )
                        )}

                        <EmailForm isbn={book.isbn} />
                        <ul className="pd-tags">
                          <li>
                            <span>CATEGORY</span>: {book.genre_nom}
                          </li>
                          <li>
                            <span>LANGUAGES</span>: {book.langue_nom}
                          </li>
                          <li>
                            <span>QUANTITY</span>: {book.get_quantity}
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
};

BookDetail.propTypes = propTypes;

export default BookDetail;
