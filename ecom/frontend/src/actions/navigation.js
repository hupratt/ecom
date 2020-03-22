import * as actionTypes from "./actionTypes";

export const searchThis = (e, callback) => {
  return dispatch => {
    callback(dispatch({ type: actionTypes.SEARCH, event: e }));
  };
};
