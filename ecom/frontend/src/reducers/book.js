import { updateObject } from "./utility";
import * as actionTypes from "../actions/actionTypes";

const initState = {
  loading: false,
  error: null,
  data: []
};

const loading = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const fetchItemsSuccess = (state, action) => {
  return updateObject(state, {
    data: action.data,
    error: null,
    loading: false
  });
};
const fetchBook = (state, action) => {
  return updateObject(state, {
    data: state.data.find(post => post.id == action.bookID),
    loading: false
  });
};

const fetchItemsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.LOADING:
      return loading(state, action);
    case actionTypes.FETCH_SUCCESS:
      return fetchItemsSuccess(state, action);
    case actionTypes.FETCH_FAIL:
      return fetchItemsFail(state, action);
    case actionTypes.FETCH_BOOK:
      return fetchBook(state, action);

    default:
      return state;
  }
};

export default reducer;
