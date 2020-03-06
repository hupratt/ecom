import * as actionTypes from "./actionTypes";
import axios from "axios";
import { orderSummaryURL, addressListURL } from "../constants";

export const shippingSuccess = (shippingAddresses, selectedShippingAddress) => {
  return {
    type: actionTypes.FETCH_SHIPPING_ADD,
    shippingAddresses: shippingAddresses,
    selectedShippingAddress: selectedShippingAddress,
    loading: false
  };
};

export const billingSuccess = (billingAddresses, selectedBillingAddress) => {
  return {
    type: actionTypes.FETCH_BILLING_ADD,
    selectedShippingAddress: billingAddresses,
    selectedBillingAddress: selectedBillingAddress,
    loading: false
  };
};

export const paymentSuccess = () => {
  return {
    success: true,
    loading: false
  };
};

export const checkoutFail = error => {
  return {
    type: actionTypes.CART_FAIL,
    error: error
  };
};

export const start = () => {
  return {
    type: actionTypes.START
  };
};

export const error = err => {
  return {
    type: actionTypes.ERROR,
    error: err
  };
};

handleGetDefaultAddress = addresses => {
  const filteredAddresses = addresses.filter(el => el.default === true);
  if (filteredAddresses.length > 0) {
    return filteredAddresses[0].id;
  }
  return "";
};

export const handleFetchBillingAddresses = () => {
  return dispatch => {
    dispatch(start());
    axios
      .get(addressListURL("B"))
      .then(res => {
        const billingAddresses = res.data.map(a => {
          return {
            key: a.id,
            text: `${a.street_address}, ${a.apartment_address}, ${a.country}`,
            value: a.id
          };
        });
        const selectedBillingAddress = handleGetDefaultAddress(res.data);
        dispatch(billingSuccess(billingAddresses, selectedBillingAddress));
      })
      .catch(err => {
        dispatch(error(err));
      });
  };
};

export const handleFetchShippingAddresses = () => {
  return dispatch => {
    dispatch(start());
    axios
      .get(addressListURL("S"))
      .then(res => {
        const shippingAddresses = res.data.map(a => {
          return {
            key: a.id,
            text: `${a.street_address}, ${a.apartment_address}, ${a.country}`,
            value: a.id
          };
        });
        const selectedShippingAddress = handleGetDefaultAddress(res.data);
        dispatch(shippingSuccess(shippingAddresses, selectedShippingAddress));
      })
      .catch(err => {
        dispatch(error(err));
      });
  };
};

export const handleFetchOrder = history => {
  return dispatch => {
    dispatch(start());
    axios
      .get(orderSummaryURL)
      .then(res => {
        dispatch({
          type: actionTypes.FETCH_ORDER,
          data: res.data,
          loading: false
        });
      })
      .catch(err => {
        if (err.response.status === 404) {
          history.push("/products");
        } else {
          dispatch(error(err));
        }
      });
  };
};

export const handleSelectChange = (name, value) => {
  return dispatch => {
    dispatch({ type: actionTypes.SELECT_CHANGE, name: name, value: value });
  };
};

export const submit = (
  e,
  stripe,
  selectedBillingAddress,
  selectedShippingAddress
) => {
  return dispatch => {
    e.preventDefault();
    dispatch(start());
    if (stripe) {
      stripe.createToken().then(result => {
        if (result.error) {
          dispatch(error(result.error.message));
        } else {
          axios
            .post(checkoutURL, {
              stripeToken: result.token.id,
              selectedBillingAddress: selectedBillingAddress,
              selectedShippingAddress: selectedShippingAddress
            })
            .then(res => {
              dispatch(paymentSuccess());
            })
            .catch(err => {
              dispatch(error(err));
            });
        }
      });
    } else {
      dispatch(error("Stripe is not loaded"));
    }
  };
};
