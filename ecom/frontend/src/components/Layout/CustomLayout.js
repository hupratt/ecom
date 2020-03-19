import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Container, Menu } from "semantic-ui-react";
import { logout } from "../../actions/auth";
import { withAuthentication } from "../../hoc/hoc";
import BottomNavigation from "./BottomNavigation/BottomNavigation";
import TopNavigationNoAuth from "./TopNavigation/TopNavigationNoAuth";
import TopNavigationWithAuth from "./TopNavigation/TopNavigationWithAuth";
import PropTypes from "prop-types";

const propTypes = {
  authenticated: PropTypes.bool.isRequired,
  cart: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

class CustomLayout extends React.Component {
  render() {
    const { authenticated, cart, loading, logout } = this.props;
    return (
      <div>
        <Menu inverted>
          <Container>
            <Menu.Menu position="left" onClick={() => window.location.reload()}>
              <Link to="/">
                <Menu.Item header>Home</Menu.Item>
              </Link>
            </Menu.Menu>
            <TopNavigationWithAuthenticationHandling
              authenticated={authenticated}
              cart={cart}
              loading={loading}
              logout={logout}
            />
          </Container>
        </Menu>
        {this.props.children}
        <BottomNavigation />
      </div>
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
    cart: state.cart.shoppingCart,
    loading: state.cart.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomLayout)
);
