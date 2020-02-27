import React from "react";
import { Dropdown, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

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
        {cart !== null ? (
            <React.Fragment>
            {cart.order_items.map(order_item => {
                return (
                <Dropdown.Item key={order_item.id}>
                    {order_item.quantity} x {order_item.livre.titre}
                </Dropdown.Item>
                );
            })}
            {cart.order_items.length < 1 ? (
                <Dropdown.Item>No items in your cart</Dropdown.Item>
            ) : null}
            <Dropdown.Divider />
            <Link to="/order-summary">
                <Dropdown.Item icon="arrow right" text="Checkout"/>
            </Link>
            </React.Fragment>
        ) : (
            <Dropdown.Item>No items in your cart</Dropdown.Item>
        )}
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
