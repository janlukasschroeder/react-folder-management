import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import "@fortawesome/fontawesome-free/js/all.js";

// ReactDOM.render(<Demo />, document.getElementById("container"));

// redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./src/reducer";

// import "antd/dist/antd.css";
// import "./styles.css";

import Demo from "./src/demo";

const store = createStore(rootReducer);

const rootElement = document.getElementById("container");
ReactDOM.render(
  <Provider store={store}>
    <Demo />
  </Provider>,
  rootElement
);
