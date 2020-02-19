import axios from "axios";
import * as actionTypes from "./actionTypes";
import { localhost } from "../constants";

export const fetchBooks = () => {
  console.log("fetching");
  //   this.setState({ loading: true });
  //   axios
  //     .get(bookListURL)
  //     .then(res => {
  //       this.setState({ data: res.data, loading: false });
  //     })
  //     .catch(err => {
  //       this.setState({ error: err, loading: false });
  //     });
};

// onSelectRadio = event => {
//   this.setState({
//     language: event.currentTarget.value
//   });
// };
// onPageChange = pageNumber => {
//   this.setState({ currentPage: pageNumber });
// };
