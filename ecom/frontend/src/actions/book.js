import axios from "axios";
import * as actionTypes from "./actionTypes";
import { bookDetailURL } from "../constants";

export const fetchBook = id => {
  return dispatch => {
    dispatch({
      type: actionTypes.FETCH_BOOK,
      bookID: id
    });
  };
};

// export const fetchBook = bookID => {
//   return dispatch => {
//     dispatch({ type: actionTypes.LOADING });
//     axios
//       .get(bookDetailURL(bookID))
//       .then(res => {
//         dispatch({ type: actionTypes.FETCH_SUCCESS, data: res.data });
//       })
//       .catch(err => {
//         dispatch({ type: actionTypes.FETCH_FAIL, error: err });
//       });
//   };
// };
