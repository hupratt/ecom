import axios from "axios";
import * as actionTypes from "./actionTypes";
import { bookListURL } from "../constants";

export const fetchBooks = () => {
  // thunk provides the dispatch
  return dispatch => {
    dispatch({ type: actionTypes.LOADING });
    axios
      .get(bookListURL)
      .then(res => {
        dispatch({ type: actionTypes.FETCH_SUCCESS, data: res.data });
      })
      .catch(err => {
        dispatch({ type: actionTypes.FETCH_FAIL, error: err });
      });
  };
};

export const onSelectRadio = event => {
  console.log("onSelectRadio");
  return dispatch => {
    dispatch({
      type: actionTypes.RADIO_BUTTON_CLICK,
      data: event.currentTarget.value
    });
  };
};

export const onPageChange = pageNumber => {
  return dispatch => {
    console.log("onSelectRadio");
    dispatch({ type: actionTypes.PAGE_CHANGED, currentPage: pageNumber });
  };
};
