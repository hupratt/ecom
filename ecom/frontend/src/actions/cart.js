import * as actionTypes from "../actions/actionTypes";
import { orderSummaryURL, addToCartURL } from "../constants";
import axios from "axios";

export const cartStart = () => {
  return {
    type: actionTypes.CART_START,
  };
};

export const cartSuccess = (data) => {
  return {
    type: actionTypes.CART_SUCCESS,
    data,
  };
};

export const cartFail = (error) => {
  return {
    type: actionTypes.CART_FAIL,
    error: error,
  };
};

export const fetchCart = () => {
  return (dispatch) => {
    dispatch(cartStart());
    const request = axios({
      method: "GET",
      url: orderSummaryURL,
      headers: { Authorization: "Token " + localStorage.getItem("token") },
    });
    return request.then(
      (res) => dispatch(cartSuccess(res.data)),
      (err) => dispatch(cartFail(err))
    );
  };
};

export const handleAddToCart = (id, isAuthenticated) => {
  return (dispatch) => {
    if (isAuthenticated) {
      dispatch(cartStart());
      const request = axios({
        method: "POST",
        url: addToCartURL,
        data: { id },
        headers: { Authorization: "Token " + localStorage.getItem("token") },
      });
      return request.then(
        (_) => dispatch(fetchCart()),
        (err) => dispatch(cartFail(err))
      );
    } else {
      dispatch(cartFail("Login in order to proceed"));
    }
  };
};
