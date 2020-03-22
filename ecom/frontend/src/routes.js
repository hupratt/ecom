import React from "react";
import { Route } from "react-router-dom";
import { Hoc } from "./hoc/hoc";
import BookListWrapper from "./hoc/BookListWrapper";

import Login from "./components/User/Login";
import Signup from "./components/User/Signup";
import OrderSummary from "./components/Payment/OrderSummary";
import Checkout from "./components/Payment/Checkout";
import Profile from "./components/User/Profile";
import BookDetail from "./components/Books/BookDetailPage";

const BaseRouter = props => {
  console.log(props);
  return (
    <Hoc>
      <Route exact path="/books/:bookID" component={BookDetail} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/order-summary" component={OrderSummary} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/profile" component={Profile} />
      <Route exact path="/" component={BookListWrapper} />
    </Hoc>
  );
};

export default BaseRouter;
