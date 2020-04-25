import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { store } from "./reducers";
import ReactGA from "react-ga";
import "./i18n";

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

if (process.env.GOOGLE_ANALYTICS) {
  ReactGA.initialize(process.env.GOOGLE_ANALYTICS);
  ReactGA.pageview("/");
}

/* Allows caching, push notifications and queues offline actions
This action fires a seperate thread to install on
When changed, the old service worker remains active if there are tabs open
This means that in order to use the latest SW after a change you'll need to close the tab */
registerServiceWorker();
