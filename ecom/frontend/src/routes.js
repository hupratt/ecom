import React from "react";
import { Route } from "react-router-dom";
import { Hoc } from "./hoc/hoc";

import Login from "./components/User/Login";
import Signup from "./components/User/Signup";
import OrderSummary from "./components/Payment/OrderSummary";
import Checkout from "./components/Payment/Checkout";
import Profile from "./components/User/Profile";
import BookDetail from "./components/Books/BookDetailPage";
import BookListPage from "./components/Books/BookListPage";
import BookUpdate from "./components/Books/BookUpdatePage/";

const BaseRouter = (props) => {
  return (
    <Hoc>
      <Route
        exact
        path="/books/:bookID"
        render={() => <BookDetail {...props} />}
      />
      <Route
        exact
        path="/books/:bookID/edit"
        render={() => <BookUpdate {...props} />}
      />
      <Route exact path="/books/add" render={() => <BookUpdate {...props} />} />
      <Route exact path="/login" render={() => <Login {...props} />} />
      <Route exact path="/signup" render={() => <Signup {...props} />} />
      <Route
        exact
        path="/order-summary"
        render={() => <OrderSummary {...props} />}
      />
      <Route exact path="/checkout" render={() => <Checkout {...props} />} />
      <Route exact path="/profile" render={() => <Profile {...props} />} />
      <Route exact path="/" render={() => <BookListPage {...props} />} />
    </Hoc>
  );
};

export default BaseRouter;
