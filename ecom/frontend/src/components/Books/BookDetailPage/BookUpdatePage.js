import React from "react";
import { s3_base_url } from "../../../constants";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchBook } from "../../../actions/book";

class BookUpdate extends React.Component {
  componentDidMount() {
    if (this.props.isAuthenticated == true) {
      this.props.fetchBook(this.props.match.params.bookID);
    }
  }
  render() {
    const { book, isAuthenticated } = this.props;
    const stars_number_inverse = 5 - book.note;
    return (
      <div>
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
                        {Array((book.langue_nom || "none").split("/")).forEach(
                          (el) => (
                            <a>{el}</a>
                          )
                        )}

                        <ul className="pd-tags">
                          <li>
                            <span>CATEGORY</span>: {book.genre_nom}
                          </li>
                          <li>
                            <span>LANGUAGES</span>: {book.langue_nom}
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
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBook: (id, dataIsCached) => dispatch(fetchBook(id, dataIsCached)),
  };
};

const mapStateToProps = (state) => {
  return {
    book: state.book.book,
    isAuthenticated: state.auth.token !== null,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BookUpdate)
);
