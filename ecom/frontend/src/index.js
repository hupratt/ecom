import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { store } from "./reducers";

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
