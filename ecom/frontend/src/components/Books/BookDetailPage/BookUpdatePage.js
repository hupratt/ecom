import React from "react";
import { endpoint } from "../../../constants";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchBook } from "../../../actions/book";

class BookUpdate extends React.Component {
  state = { updatedBook: {} };
  componentDidMount() {
    console.log(this.props.isAuthenticated);
    this.setState({
      updatedBook: this.props.book,
    });
  }

  handleInput = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState((prevState) => {
      return {
        updatedBook: {
          ...prevState.updatedBook,
          [name]: value,
        },
      };
    });
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    const bookData = this.state.updatedBook;
    console.log(bookData);
    fetch(`${endpoint}/books/${this.props.book.id}/update/`, {
      method: "POST",
      body: JSON.stringify(bookData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        console.log(response);
      });
    });
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
    } = this.state.updatedBook;
    return (
      <div>
        <section className="product-shop spad page-details">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="product-details">
                      <form className="product-details">
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

                        <button type="button" onClick={this.handleFormSubmit}>
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
        )
      </div>
    );
  }
}

const Input = (props) => {
  return (
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
      />
    </div>
  );
};

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
  connect(mapStateToProps, mapDispatchToProps)(BookUpdate)
);
