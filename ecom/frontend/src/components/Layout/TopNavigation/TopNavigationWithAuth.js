import React from "react";
import { Dropdown, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import CartDropDownNoItems from "./CartDropDownNoItems";
import CartDropDownWithItems from "./CartDropDownWithItems";
import { withItemsInTheCart } from "../../../hoc/hoc";
import PropTypes from "prop-types";

const propTypes = {
  cart: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

const TopNavigationWithAuth = ({ cart, loading, logout }) => {
  return (
    <React.Fragment>
      <Menu.Menu position="right">
        <Link to="/profile">
          <Menu.Item>Profile</Menu.Item>
        </Link>
        <Dropdown
          icon="cart"
          loading={loading}
          text={`${cart !== null ? cart.order_items.length : 0}`}
          pointing
          className="link item"
        >
          <Dropdown.Menu>
            <CartDropDownWithItemsAndNoItems cart={cart} />
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item header onClick={() => logout()}>
          Logout
        </Menu.Item>
      </Menu.Menu>
    </React.Fragment>
  );
};

export default TopNavigationWithAuth;

TopNavigationWithAuth.propTypes = propTypes;

const CartDropDownWithItemsAndNoItems = withItemsInTheCart(
  CartDropDownWithItems,
  CartDropDownNoItems
);
