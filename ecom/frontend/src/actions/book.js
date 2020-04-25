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

export const addBookItem = (updatedBook, history) => {
  return (dispatch) => {
    const { id } = updatedBook;
    const formData = new FormData();
    formData.append("id", id);
    axios
      .post(`${endpoint}/bookitem/${id}/add/`, formData, {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      })
      // .then(history.push(`/books/${id}/`))
      .catch((err) => dispatch(addBookFail(err.response.data)));
  };
};

export const deleteBookItem = (updatedBook, history) => {
  return (dispatch) => {
    const { book_quantity, id } = updatedBook;
    if (book_quantity.length > 0) {
      const randBookid = book_quantity[0].id;
      axios
        .delete(`${endpoint}/bookitem/${randBookid}/delete/`, {
          headers: {
            Authorization: "Token " + localStorage.getItem("token"),
          },
        })
        // .then(history.push(`/books/${id}/`))
        .catch((err) => dispatch(addBookFail(err.response.data)));
    }
  };
};
