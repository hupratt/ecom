import axios from "axios";
import * as actionTypes from "./actionTypes";
import { bookListURL } from "../constants";

export const fetchBooks = dataIsCached => {
  if (dataIsCached) {
    console.log("fetching cache for all books");
    return dispatch => {
      dispatch({ type: actionTypes.FETCH_CACHE });
    };
  }
  return dispatch => {
    dispatch({ type: actionTypes.LOADING });
    console.log("running axios to fetch all books");
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
  return dispatch => {
    console.log(`language ${event.currentTarget.value}`);
    dispatch({
      type: actionTypes.RADIO_BUTTON_CLICK,
      language: event.currentTarget.value
    });
  };
};

export const onPageChange = pageNumber => {
  return dispatch => {
    console.log(`${pageNumber} is called`);
    dispatch({ type: actionTypes.PAGE_CHANGED, currentPage: pageNumber });
  };
};

export const loadmoar = bookPerPage => {
  return dispatch => {
    let newbookPerPage = bookPerPage + 12;
    dispatch({
      type: actionTypes.LOAD_MORE,
      bookPerPage: newbookPerPage
    });
  };
};
