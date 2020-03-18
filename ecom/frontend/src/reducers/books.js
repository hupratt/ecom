import { updateObject } from "./utility";
import * as actionTypes from "../actions/actionTypes";

const initState = {
  loading: false,
  error: null,
  data: [],
  currentPage: 1,
  setPage: 1,
  bookPerPage: 12,
  language: "All",
  dataIsCached: false,
  offset: 0,
  _length: 0
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
    loading: false,
    _length: action._length
  });
};

const fetchCache = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    dataIsCached: true
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
    currentPage: action.currentPage
  });
};
const loadMoar = (state, action) => {
  return updateObject(state, {
    offset: action.offset,
    data: [...state.data, ...action.data],
    error: null,
    bookPerPage: action.bookPerPage,
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
    case actionTypes.PAGE_CHANGED:
      return pageChanged(state, action);
    case actionTypes.LOAD_MORE:
      return loadMoar(state, action);
    case actionTypes.FETCH_CACHE:
      return fetchCache(state, action);
    default:
      return state;
  }
};

export default reducer;
