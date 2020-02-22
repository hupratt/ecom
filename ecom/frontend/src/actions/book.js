import axios from "axios";

import * as actionTypes from "./actionTypes";
import { bookDetailURL } from "../constants";

export const fetchBook = (id, dataIsCached) => {
  if (dataIsCached) {
    console.log(`fetching cache for book number ${id}`);
    return dispatch => {
      dispatch({
        type: actionTypes.FETCH_BOOK_LOCAL,
        bookID: id
      });
    };
  }
  return dispatch => {
    dispatch({ type: actionTypes.LOADING });
    console.log(`running axios to fetch book number ${id}`);
    axios
      .get(bookDetailURL(id))
      .then(res => {
        dispatch({ type: actionTypes.FETCH_BOOK, data: res.data });
      })
      .catch(err => {
        dispatch({ type: actionTypes.FETCH_FAIL, error: err });
      });
  };
};
