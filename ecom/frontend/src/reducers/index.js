import authReducer from "./auth";
import cartReducer from "./cart";
import booksReducer from "./books";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  books: booksReducer
});

export const store = createStore(
  rootReducer,
  composeEnhances(applyMiddleware(thunk))
);
