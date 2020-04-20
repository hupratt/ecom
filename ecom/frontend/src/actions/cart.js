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
    axios
      .get(orderSummaryURL)
      .then((res) => {
        dispatch(cartSuccess(res.data));
      })
      .catch((err) => {
        dispatch(
          cartFail({
            request: { status: 404, statusText: err },
          })
        );
      });
  };
};

export const handleAddToCart = (id, isAuthenticated) => {
  return (dispatch) => {
    if (isAuthenticated) {
      axios
        .post(addToCartURL, { id })
        .then((res) => {
          dispatch(cartStart());
          axios
            .get(orderSummaryURL)
            .then((res) => {
              dispatch(cartSuccess(res.data));
            })
            .catch((err) => {
              dispatch(cartFail(err));
            });
        })
        .catch((err) => {
          dispatch(cartFail(err));
        });
    } else {
      dispatch(
        cartFail({
          request: { status: 400, statusText: "Login in order to proceed" },
        })
      );
    }
  };
};
