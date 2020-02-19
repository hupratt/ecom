import { updateObject } from "./utility";
import * as actionTypes from "../actions/actionTypes";

const initState = {
  loading: false,
  error: null,
  data: [],
  currentPage: 1,
  setPage: 1,
  bookPerPage: 12,
  language: "No filter"
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

const fetchItemsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};
const pageChanged = (state, action) => {
  return updateObject(state, {
    currentPage: action.pageNumber
  });
};
const radioButtonClick = (state, action) => {
  return updateObject(state, {
    language: action.language
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
    case actionTypes.PAGE_CHANGED:
      return pageChanged(state, action);
    case actionTypes.RADIO_BUTTON_CLICK:
      return radioButtonClick(state, action);
    default:
      return state;
  }
};

export default reducer;
