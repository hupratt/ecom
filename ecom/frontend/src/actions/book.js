import axios from "axios";

import * as actionTypes from "./actionTypes";
import { bookDetailURL, endpoint } from "../constants";

export const fetchBook = (id, dataIsCached = false) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });
    console.log(`running axios to fetch book number ${id}`);
    axios
      .get(bookDetailURL(id))
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_BOOK, data: res.data });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.FETCH_FAIL, error: err });
      });
  };
};

export const addBookFail = (error) => {
  return {
    type: actionTypes.ADDBOOK_FAIL,
    error: error,
  };
};

export const handleAddBook = (book, history, setUploadPercentage) => {
  return (dispatch) => {
    const formData = new FormData();

    for (var key in book) {
      if (book[key] !== undefined && key !== "picture") {
        formData.append(key, book[key]);
      }
    }
    axios
      .post(`${endpoint}/book/add/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Token " + localStorage.getItem("token"),
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      })
      .then((res) => {
        history.push(`/books/${res.data.id}/`);
      })
      .catch((err) => dispatch(addBookFail(err.response.data)));
  };
};
