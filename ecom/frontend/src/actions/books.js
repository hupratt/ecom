import axios from "axios";
import * as actionTypes from "./actionTypes";
import { bookListURL } from "../constants";

export const fetchBooks = () => {
  return dispatch => {
    dispatch({ type: actionTypes.LOADING });
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

// onSelectRadio = event => {
//   this.setState({
//     language: event.currentTarget.value
//   });
// };
// onPageChange = pageNumber => {
//   this.setState({ currentPage: pageNumber });
// };

// export const fetchCart = () => {
//   return dispatch => {
//     dispatch(cartStart());
//     axios
//       .get(orderSummaryURL)
//       .then(res => {
//         dispatch(cartSuccess(res.data));
//       })
//       .catch(err => {
//         dispatch(cartFail(err));
//       });
//   };
// };
