import * as actionTypes from "./actionTypes";

export const fetchBook = id => {
  return dispatch => {
    dispatch({
      type: actionTypes.FETCH_BOOK,
      bookID: id
    });
  };
};
