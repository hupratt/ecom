import React from "react";
import { Route } from "react-router-dom";
import { Hoc } from "./hoc/hoc";

import Login from "./components/User/Login";
import Signup from "./components/User/Signup";
import BookList from "./components/Book/BookListPage";
import OrderSummary from "./components/Payment/OrderSummary";
import Checkout from "./components/Payment/Checkout";
import Profile from "./components/User/Profile";
import BookDetail from "./components/Book/BookDetailPage";

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/books/:bookID" component={BookDetail} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/order-summary" component={OrderSummary} />
    <Route path="/checkout" component={Checkout} />
    <Route path="/profile" component={Profile} />
    <Route exact path="/" component={BookList} />
  </Hoc>
);

export default BaseRouter;
