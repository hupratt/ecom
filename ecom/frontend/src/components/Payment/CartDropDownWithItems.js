import React from "react";
import { Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";

const CartDropDownWithItems = ({ cart }) => {
  return (
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
        <Dropdown.Item icon="arrow right" text="Checkout" />
      </Link>
    </React.Fragment>
  );
};

export default CartDropDownWithItems;
