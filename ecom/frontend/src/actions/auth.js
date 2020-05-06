import axios from "axios";
import * as actionTypes from "./actionTypes";
import { base, endpoint } from "../constants";
import { posthogCookieDistinctId } from "../components/utility";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const grabTokenDistinctId = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.AUTH_GRAB_TOKEN_DISTINCT_ID,
      data: posthogCookieDistinctId(),
    });
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const userIsStaff = () => {
  return (dispatch) => {
    axios
      .get(`${endpoint}/user-staff/`)
      .then((res) => {
        const { user_name, user_staff, email } = res.data;
        const data = { user_name, user_staff, email };
        dispatch({ type: actionTypes.USER_STAFF, data });
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${base}/rest-auth/login/`, {
        username: username,
        password: password,
      })
      .then((res) => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 10000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(36000));

        /* FIX ME, changing the state 
        is not showing the edit 
        ²and add page buttons */
        window.location.reload();
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
    dispatch(userIsStaff());
  };
};

export const authSignup = (username, email, password1, password2) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${base}/rest-auth/registration/`, {
        username: username,
        email: email,
        password1: password1,
        password2: password2,
      })
      .then((res) => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 10000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        dispatch(authSuccess(token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
