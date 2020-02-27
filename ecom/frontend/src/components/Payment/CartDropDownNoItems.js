import React from "react";
import { Dropdown } from "semantic-ui-react";

const CartDropDownNoItems = () => {
  return (
    <React.Fragment>
        <Dropdown.Item>No items in your cart</Dropdown.Item>
    </React.Fragment>
  );
};

export default CartDropDownNoItems;
