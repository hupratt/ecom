import axios from "axios";
import * as actionTypes from "./actionTypes";
import { bookListURL } from "../constants";

export const fetchBooks = (offset, language) => {
  return dispatch => {
    dispatch({ type: actionTypes.LOADING });
    console.log("running axios to fetch first 12 books");
    if (language == "All") {
      axios
        .get(bookListURL(offset, ""))
        .then(res => {
          dispatch({
            type: actionTypes.FETCH_SUCCESS,
            data: Object.values(res.data.results),
            _length: res.data.count
          });
        })
        .catch(err => {
          dispatch({ type: actionTypes.FETCH_FAIL, error: err });
        });
    } else {
      axios
        .get(bookListURL(offset, language))
        .then(res => {
          dispatch({
            type: actionTypes.FETCH_SUCCESS,
            data: Object.values(res.data.results),
            _length: res.data.count
          });
        })
        .catch(err => {
          dispatch({ type: actionTypes.FETCH_FAIL, error: err });
        });
    }
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

export const loadmoar = (offset, bookPerPage, loading) => {
  return dispatch => {
    if (loading == false) {
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
    }
  };
};
