import axios from "axios";
import * as actionTypes from "./actionTypes";
import { bookListURL } from "../constants";

export const fetchBooks = (dataIsCached, bookPerPage) => {
  return dispatch => {
    dispatch({ type: actionTypes.LOADING });
    console.log("running axios to fetch first 12 books");
    axios
      .get(bookListURL(bookPerPage))
      .then(res => {
        dispatch({
          type: actionTypes.FETCH_SUCCESS,
          data: Object.values(res.data.results)
        });
      })
      .catch(err => {
        dispatch({ type: actionTypes.FETCH_FAIL, error: err });
      });
  };
};

export const onSelectRadio = event => {
  return dispatch => {
    console.log(`language ${event.currentTarget.value} selected`);
    dispatch({
      type: actionTypes.RADIO_BUTTON_CLICK,
      language: event.currentTarget.value
    });
  };
};

export const onPageChange = pageNumber => {
  return dispatch => {
    console.log(`${pageNumber} was called`);
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
        dispatch({
          type: actionTypes.LOAD_MORE,
          data: Object.values(res.data.results),
          offset: offset,
          bookPerPage: bookPerPage
        });
      })
      .catch(err => {
        dispatch({ type: actionTypes.FETCH_FAIL, error: err });
      });
  };
};
