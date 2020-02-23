import * as actionTypes from "../actions/actionTypes";
import { orderSummaryURL, addToCartURL } from "../constants";
import axios from "axios";

export const cartStart = () => {
  return {
    type: actionTypes.CART_START
  };
};

export const cartSuccess = data => {
  return {
    type: actionTypes.CART_SUCCESS,
    data
  };
};

export const cartFail = error => {
  console.log("action failed");
  return {
    type: actionTypes.CART_FAIL,
    error: error
  };
};

export const fetchCart = () => {
  return dispatch => {
    dispatch(cartStart());
    axios
      .get(orderSummaryURL)
      .then(res => {
        dispatch(cartSuccess(res.data));
      })
      .catch(err => {
        dispatch(cartFail(err));
      });
  };
};

export const handleAddToCart = (id, isAuthenticated) => {
  return dispatch => {
    if (isAuthenticated) {
      axios
        .post(addToCartURL, { id })
        .then(res => {
          dispatch(cartStart());
          axios
            .get(orderSummaryURL)
            .then(res => {
              dispatch(cartSuccess(res.data));
            })
            .catch(err => {
              dispatch(cartFail(err));
            });
        })
        .catch(err => {
          dispatch(cartFail(err));
        });
    } else {
      dispatch(cartFail("Login in order to proceed"));
    }
  };
};
