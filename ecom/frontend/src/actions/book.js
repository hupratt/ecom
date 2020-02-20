import * as actionTypes from "./actionTypes";

export const fetchBook = (id, state) => {
  return dispatch => {
    dispatch({
      type: actionTypes.FETCH_BOOK,
      bookID: id
    });
  };
};
