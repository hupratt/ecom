import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { withAuthentication } from "../../hoc/hoc";
import TopNavigationNoAuth from "./TopNavigation/TopNavigationNoAuth";
import TopNavigationWithAuth from "./TopNavigation/TopNavigationWithAuth";
import PropTypes from "prop-types";
import BottomNavigation from "../Layout/BottomNavigation/BottomNavigation";
// debounce so that each state change of the search query does not DDOS our backend
import { debounce } from "throttle-debounce";

const propTypes = {
  authenticated: PropTypes.bool.isRequired,
  cart: PropTypes.object
};

class CustomLayout extends React.Component {
  state = { searchTerm: "" };
  constructor(props) {
    super(props);
    this.autocompleteSearchDebounced = debounce(500, this.autocompleteSearch);
  }
  onSearchChange = event => {
    this.setState({ searchTerm: event.target.value }, () => {
      this.autocompleteSearchDebounced(this.state.searchTerm);
    });
  };
  autocompleteSearch = () => console.log("hello");
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
  }
  componentWillUnmount = () => {
    document.removeEventListener("scroll", this.trackScrolling);
  };
  render() {
    const { authenticated, cart } = this.props;

    return (
      <React.Fragment>
        {/* Header Section Begin */}
        <header className="header-section" id="fixed-header">
          <div className="wrap-menu-header">
            <div className="container">
              <div className="inner-header">
                <div className="row">
                  <div className="col-lg-2 col-md-2">
                    <Link to="/">
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
        {this.props.children}
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

CustomLayout.propTypes = propTypes;

const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null,
    cart: state.cart.shoppingCart
  };
};

export default withRouter(connect(mapStateToProps)(CustomLayout));
