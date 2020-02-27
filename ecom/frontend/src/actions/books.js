import axios from "axios";
import * as actionTypes from "./actionTypes";
import { bookListURL } from "../constants";

export const fetchBooks = (dataIsCached, bookPerPage) => {
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
      .get(bookListURL(bookPerPage))
      .then(res => {
        console.log(res.data.results);

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

export const loadmoar = (offset, bookPerPage) => {
  return dispatch => {
    dispatch({ type: actionTypes.LOADING });
    console.log("axios to fetch more books offset:" + offset);
    console.log("bookPerPage:" + bookPerPage);
    axios
      .get(bookListURL(offset))
      .then(res => {
        console.log(res.data);
        dispatch({
          type: actionTypes.LOAD_MORE,
          data: res.data,
          offset: offset,
          bookPerPage: bookPerPage
        });
      })
      .catch(err => {
        dispatch({ type: actionTypes.FETCH_FAIL, error: err });
      });
  };
};
