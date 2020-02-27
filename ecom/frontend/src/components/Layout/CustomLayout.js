import { React } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Container, Menu } from "semantic-ui-react";
import { logout } from "../../actions/auth";
import { withAuthentication } from "../../hoc/hoc";
import BottomNavigation from "./BottomNavigation";
import TopNavigationNoAuth from "./TopNavigationNoAuth";
import TopNavigationWithAuth from "./TopNavigationWithAuth";

class CustomLayout extends React.Component {
  render() {
    const { authenticated, cart, loading, logout } = this.props;
    return (
      <div>
        <Menu inverted>
          <Container>
            <Menu.Menu position="left">
              <Link to="/">
                <Menu.Item header>Home</Menu.Item>
              </Link>
            </Menu.Menu>
            <TopNavigationWithAuthenticationHandling authenticated={authenticated} cart={cart} loading={loading} logout={logout}/>
          </Container>
        </Menu>
        {this.props.children}
        <BottomNavigation />
      </div>
    );
  }
}

const TopNavigationWithAuthenticationHandling = withAuthentication(TopNavigationWithAuth, TopNavigationNoAuth);

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
