import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { withAuthentication } from "../../hoc/hoc";
import TopNavigationNoAuth from "./TopNavigation/TopNavigationNoAuth";
import TopNavigationWithAuth from "./TopNavigation/TopNavigationWithAuth";
// import PropTypes from "prop-types";
import BottomNavigation from "../Layout/BottomNavigation/BottomNavigation";
// debounce so that each state change of the search query does not DDOS our backend
import { debounce } from "throttle-debounce";
import { searchThis } from "../../actions/navigation";
import BaseRouter from "../../routes";
import { bookListURL } from "../../constants";

import { fetchBooks, loadmoar } from "../../actions/books";
import { fetchCart } from "../../actions/cart";
import queryString from "query-string";

// const propTypes = {
//   authenticated: PropTypes.bool.isRequired,
//   cart: PropTypes.object
// };

class CustomLayout extends React.Component {
  state = {
    language: "",
    authors: new Map(),
    category: "",
    sliderValues: [0, 100],
    search: ""
  };
  constructor(props) {
    super(props);
    this.autocompleteSearchDebounced = debounce(500, this.autocompleteSearch);
  }
  onSearchChange = event => {
    this.props.searchThis(event, () => {
      this.autocompleteSearchDebounced();
    });
  };
  autocompleteSearch = () => {
    const { offset, fetchBooks, history, searchTerm } = this.props;
    const { language, category, authors, sliderValues } = this.state;
    const authors_array = Array.from(authors.entries()).join(",");

    const endpoint = bookListURL(
      offset,
      language,
      authors_array,
      category,
      sliderValues,
      searchTerm
    );
    history.push(endpoint.slice(endpoint.indexOf("?limit"), endpoint.length));
    fetchBooks(endpoint);
  };
  trackScrolling = () => {
    const el = document.getElementById("fixed-header");
    if (el.getBoundingClientRect().top < -100) {
      el.classList.add("header-fixed");
    } else {
      el.classList.remove("header-fixed");
    }
  };
  componentDidMount() {
    document.addEventListener("scroll", this.trackScrolling);
    const q = queryString.parse(this.props.location.search);
    if (Object.keys(q).length == 0) {
      this.props.fetchBooks(bookListURL());
    } else {
      this.mapUrlToState(q);
    }
    if (this.props.isAuthenticated == true) {
      this.props.refreshCart();
    }
  }

  mapUrlToState = queryMap => {
    const authors_param = queryMap.authors;
    var queryMap = queryMap;
    if (authors_param !== undefined) {
      let urlAuthorMap = new Map();
      let result = [];
      for (var i = 0; i < authors_param.split(",").length; i += 2) {
        result.push([
          authors_param.split(",")[i],
          authors_param.split(",")[i + 1]
        ]);
      }
      result.forEach(element => {
        urlAuthorMap.set(element[0], element[1] === "true");
      });
      queryMap = { ...queryMap, authors: urlAuthorMap };
    }
    console.log("queryMap", queryMap);

    this.setState(queryMap, () => {
      // queryMap Map { "Eça de Queirós" → true }
      const { offset, fetchBooks, searchTerm } = this.props;
      const { language, category, authors, sliderValues } = this.state;
      let authors_array = "";
      // Eça de Queirós,true
      if (queryMap.authors) {
        authors_array = Array.from(queryMap.authors.entries()).join(",");
      }

      const endpoint = bookListURL(
        offset,
        language,
        authors_array,
        category,
        sliderValues,
        searchTerm
      );
      fetchBooks(endpoint);
    });
  };

  componentWillUnmount = () => {
    document.removeEventListener("scroll", this.trackScrolling);
  };

  onSelectAuthor = (e, data) => {
    const item = e.target.textContent;
    const isChecked = data.checked;
    this.setState(
      prevState => ({
        authors: prevState.authors.set(item, isChecked)
      }),
      () => {
        const { offset, fetchBooks, history, searchTerm } = this.props;
        const { language, category, authors, sliderValues } = this.state;
        const authors_array = Array.from(authors.entries()).join(",");

        const endpoint = bookListURL(
          offset,
          language,
          authors_array,
          category,
          sliderValues,
          searchTerm
        );
        history.push(
          endpoint.slice(endpoint.indexOf("?limit"), endpoint.length)
        );
        fetchBooks(endpoint);
      }
    );
  };
  handleSetActiveCategory = event => {
    this.setState({ category: event.currentTarget.text }, () => {
      const { offset, fetchBooks, history, searchTerm } = this.props;
      const { language, category, authors, sliderValues } = this.state;
      const authors_array = Array.from(authors.entries()).join(",");
      const endpoint = bookListURL(
        offset,
        language,
        authors_array,
        category,
        sliderValues,
        searchTerm
      );
      history.push(endpoint.slice(endpoint.indexOf("?limit"), endpoint.length));
      fetchBooks(endpoint);
    });
  };

  onSelectRadio = event => {
    this.setState({ language: event.currentTarget.value }, () => {
      const { offset, fetchBooks, history, searchTerm } = this.props;
      const { language, category, authors, sliderValues } = this.state;
      const authors_array = Array.from(authors.entries()).join(",");
      const endpoint = bookListURL(
        offset,
        language,
        authors_array,
        category,
        sliderValues,
        searchTerm
      );
      history.push(endpoint.slice(endpoint.indexOf("?limit"), endpoint.length));
      fetchBooks(endpoint);
    });
  };
  onSliderChange = sliderValues => {
    this.setState({ sliderValues: sliderValues }, () => {
      const { offset, fetchBooks, history, searchTerm } = this.props;
      const { language, category, authors, sliderValues } = this.state;
      const authors_array = Array.from(authors.entries()).join(",");
      const endpoint = bookListURL(
        offset,
        language,
        authors_array,
        category,
        sliderValues,
        searchTerm
      );
      history.push(endpoint.slice(endpoint.indexOf("?limit"), endpoint.length));
      fetchBooks(endpoint);
    });
  };

  render() {
    const { authenticated, cart, error, errorCart } = this.props;
    const { language, sliderValues, authors, category } = this.state;

    return (
      <React.Fragment>
        {/* Header Section Begin */}
        <header className="header-section" id="fixed-header">
          <div className="wrap-menu-header">
            <div className="container">
              <div className="inner-header">
                <div className="row">
                  <div className="col-lg-2 col-md-2">
                    <Link
                      to="/"
                      onClick={() => {
                        new Promise(resolve =>
                          resolve(this.props.history.push("/"))
                        ); //.then(window.location.reload());
                      }}
                    >
                      <img
                        className="logo"
                        src="https://bookshop-images-f1492f08-f236-4a55-afb7-70ded209cb24.s3.eu-west-2.amazonaws.com/resources/logo-petite-portugaise-300.png"
                        alt="la petite portugaise's logo"
                      />
                    </Link>
                  </div>
                  <TopNavigationWithAuthenticationHandling
                    authenticated={authenticated}
                    cart={cart}
                    onSearchChange={this.onSearchChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>
        <BaseRouter
          onSelectAuthor={this.onSelectAuthor}
          onSliderChange={this.onSliderChange}
          onSelectRadio={this.onSelectRadio}
          handleSetActiveCategory={this.handleSetActiveCategory}
          language={language}
          sliderValues={sliderValues}
          authors={authors}
          category={category}
          error={error}
          errorCart={errorCart}
        />
        <BottomNavigation />

        {/* Header End */}
      </React.Fragment>
    );
  }
}

const TopNavigationWithAuthenticationHandling = withAuthentication(
  TopNavigationWithAuth,
  TopNavigationNoAuth
);

// CustomLayout.propTypes = propTypes;

const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null,
    cart: state.cart.shoppingCart,
    searchTerm: state.navigation.searchTerm,
    offset: state.books.offset,
    error: state.book.error,
    errorCart: state.cart.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchThis: (e, callback) => dispatch(searchThis(e, callback)),
    loadMoar: (url_endpoint, bookPerPage, offset) =>
      dispatch(loadmoar(url_endpoint, bookPerPage, offset)),
    fetchBooks: url_endpoint => dispatch(fetchBooks(url_endpoint)),
    refreshCart: () => dispatch(fetchCart()),
    searchThis: (e, callback) => dispatch(searchThis(e, callback))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomLayout)
);
