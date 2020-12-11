import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import reducer from "./redux/reducers/reducer";
import reduxThunk from "redux-thunk";
import App from "./App";

import "./assets/style/tailwind.css";
import "./assets/style/main.css";

const store = createStore(reducer, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
