import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const TopNavigationNoAuth = () => {
  return (
    <React.Fragment>
      <Menu.Menu position="right">
        <Link to="/login">
          <Menu.Item header>Login</Menu.Item>
        </Link>
        <Link to="/signup">
          <Menu.Item header>Signup</Menu.Item>
        </Link>
      </Menu.Menu>
    </React.Fragment>
  );
};

export default TopNavigationNoAuth;
