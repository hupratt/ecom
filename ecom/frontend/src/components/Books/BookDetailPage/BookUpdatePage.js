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
  handleChange = () => {};
  handleSubmit = () => {};
  render() {
    const { book } = this.props;
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
                        <form className="product-details">
                          <input
                            type="text"
                            placeholder={book.auteur_nom}
                            value={book.auteur_nom}
                            onChange={this.handleChange}
                          />
                          <input
                            type="text"
                            placeholder={book.isbn}
                            value={book.isbn}
                            onChange={this.handleChange}
                          />
                          <input
                            type="text"
                            placeholder={book.titre}
                            value={book.titre}
                            onChange={this.handleChange}
                          />
                          <input
                            type="text"
                            placeholder={book.note}
                            value={book.note}
                            onChange={this.handleChange}
                          />
                          <input
                            type="text"
                            placeholder={book.prix}
                            value={book.prix}
                            onChange={this.handleChange}
                          />
                          <input
                            type="text"
                            placeholder={book.langue_nom}
                            value={book.langue_nom}
                            onChange={this.handleChange}
                          />
                          <input
                            type="text"
                            placeholder={book.genre_nom}
                            value={book.genre_nom}
                            onChange={this.handleChange}
                          />
                          <textarea
                            type="text"
                            placeholder={book.langue_nom}
                            value={book.langue_nom}
                            onChange={this.handleChange}
                          />
                          <button type="button" onClick={this.handleSubmit}>
                            Submit
                          </button>
                        </form>
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
