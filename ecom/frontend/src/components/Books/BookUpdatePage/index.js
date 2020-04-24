import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchBook } from "../../../actions/book";
import FileForm from "./FileForm";
import { endpoint, s3_base_url } from "../../../constants";
import axios from "axios";

class BookAdd extends React.Component {
  state = { updatedBook: { picture: null }, success: false, url: "" };

  componentDidMount() {
    this.setState({
      updatedBook: this.props.book,
    });
  }

  handleInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState((prevState) => {
      return {
        updatedBook: {
          ...prevState.updatedBook,
          [name]: value,
        },
      };
    });
  };
  addBookItem = (e) => {
    e.preventDefault();
    const { id } = this.state.updatedBook;
    axios
      .post(`${endpoint}/bookitem/${id}/add/`, {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      })
      .then(this.props.history.push(`/books/${id}/`))
      .catch((err) => console.log(err));
  };
  deleteBookItem = (e) => {
    e.preventDefault();
    const { book_quantity, id } = this.state.updatedBook;
    if (book_quantity.length > 0) {
      const randBookid = book_quantity[0].id;
      axios
        .delete(`${endpoint}/bookitem/${randBookid}/delete/`, {
          headers: {
            Authorization: "Token " + localStorage.getItem("token"),
          },
        })
        .then(this.props.history.push(`/books/${id}/`))
        .catch((err) => console.log(err));
    }
  };

  render() {
    const {
      auteur_nom,
      isbn,
      note,
      titre,
      prix,
      langue_nom,
      genre_nom,
      description,
      get_quantity,
    } = this.state.updatedBook;

    return (
      <div>
        <section className="product-shop spad page-details">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-6">
                    <img
                      className="product-big-img"
                      src={this.props.book.picture}
                      alt=""
                    />
                    <FileForm
                      book={this.state.updatedBook}
                      history={this.props.history}
                    />
                  </div>

                  <div className="col-lg-6">
                    <div className="product-update">
                      <span>In stock: {get_quantity}</span>
                      <button onClick={this.addBookItem}>+</button>
                      <button onClick={this.deleteBookItem}>-</button>
                      <Input
                        name={"auteur_nom"}
                        title={"Author"}
                        type={"text"}
                        value={auteur_nom}
                        handleChange={this.handleInput}
                        placeholder={auteur_nom}
                      />
                      <Input
                        name={"isbn"}
                        title={"ISBN"}
                        type={"text"}
                        value={isbn}
                        handleChange={this.handleInput}
                        placeholder={isbn}
                      />
                      <Input
                        name={"titre"}
                        title={"Titre"}
                        type={"text"}
                        value={titre}
                        handleChange={this.handleInput}
                        placeholder={titre}
                      />
                      <Input
                        name={"note"}
                        title={"Note"}
                        type={"text"}
                        value={note}
                        handleChange={this.handleInput}
                        placeholder={note}
                      />
                      <Input
                        name={"prix"}
                        title={"Prix"}
                        type={"text"}
                        value={prix}
                        handleChange={this.handleInput}
                        placeholder={prix}
                      />
                      <Input
                        name={"langue_nom"}
                        title={"Langue"}
                        type={"text"}
                        value={langue_nom}
                        handleChange={this.handleInput}
                        placeholder={langue_nom}
                      />
                      <Input
                        name={"genre_nom"}
                        title={"Genre"}
                        type={"text"}
                        value={genre_nom}
                        handleChange={this.handleInput}
                        placeholder={genre_nom}
                      />
                      <TextArea
                        name={"description"}
                        title={"Description"}
                        type={"text"}
                        value={description}
                        handleChange={this.handleInput}
                        placeholder={description}
                        rows={15}
                        cols={1}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        )
      </div>
    );
  }
}

const Input = (props) => (
  <div className="form-group">
    <label htmlFor={props.name} className="form-label">
      {props.title}
    </label>
    <input
      className="form-input"
      id={props.name}
      name={props.name}
      type={props.type}
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder}
      ref={props.ref}
    />
  </div>
);

const TextArea = (props) => (
  <div className="form-group">
    <label className="form-label">{props.title}</label>
    <textarea
      className="form-control"
      name={props.name}
      rows={props.rows}
      cols={props.cols}
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder}
    />
  </div>
);

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
  connect(mapStateToProps, mapDispatchToProps)(BookAdd)
);
