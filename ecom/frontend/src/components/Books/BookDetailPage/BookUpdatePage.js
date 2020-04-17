import React from "react";
import { s3_base_url } from "../../../constants";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchBook } from "../../../actions/book";

class BookUpdate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      updatedBook: {
        auteur_nom: "",
        isbn: "",
        note: "",
        titre: "",
        prix: "",
        langue_nom: "",
        genre_nom: "",
      },

      genderOptions: ["Male", "Female", "Others"],
      skillOptions: ["Programming", "Development", "Design", "Testing"],
    };
  }
  componentDidMount() {
    console.log(this.props.isAuthenticated);
    if (this.props.isAuthenticated == true) {
      this.props.fetchBook(this.props.match.params.bookID);
      console.log(this.props.book);
    }
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      (prevState) => {
        return {
          newUser: {
            ...prevState.newUser,
            [name]: value,
          },
        };
      },
      () => console.log(this.state.newUser)
    );
  }
  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newUser;

    fetch("http://example.com", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        console.log("Successful" + data);
      });
    });
  }

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
                        <form
                          className="product-details"
                          onSubmit={this.handleFormSubmit}
                        >
                          <Input
                            name={"auteur_nom"}
                            title={"Author"}
                            type={"text"}
                            value={book.auteur_nom}
                            handleChange={this.handleInput}
                            placeholder={book.auteur_nom}
                          />
                          <Input
                            name={"isbn"}
                            title={"ISBN"}
                            type={"text"}
                            value={book.isbn}
                            handleChange={this.handleInput}
                            placeholder={book.isbn}
                          />
                          <Input
                            name={"titre"}
                            title={"Titre"}
                            type={"text"}
                            value={book.titre}
                            handleChange={this.handleInput}
                            placeholder={book.titre}
                          />
                          <Input
                            name={"note"}
                            title={"Note"}
                            type={"text"}
                            value={book.note}
                            handleChange={this.handleInput}
                            placeholder={book.note}
                          />
                          <Input
                            name={"prix"}
                            title={"Prix"}
                            type={"text"}
                            value={book.prix}
                            handleChange={this.handleInput}
                            placeholder={book.prix}
                          />
                          <Input
                            name={"langue_nom"}
                            title={"Langue"}
                            type={"text"}
                            value={book.langue_nom}
                            handleChange={this.handleInput}
                            placeholder={book.langue_nom}
                          />
                          <Input
                            name={"genre_nom"}
                            title={"Genre"}
                            type={"text"}
                            value={book.genre_nom}
                            handleChange={this.handleInput}
                            placeholder={book.genre_nom}
                          />
                          <TextArea
                            name={"description"}
                            title={"Description"}
                            type={"text"}
                            value={book.description}
                            handleChange={this.handleInput}
                            placeholder={book.description}
                            rows={15}
                            cols={1}
                          />

                          <button type="button">Submit</button>
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
