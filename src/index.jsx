// REACT MODULES
import React from "react";
import ReactDOM from "react-dom";

// REDUX
//import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import reducer from "./redux/reducers/reducer";
import reduxThunk from "redux-thunk";

// COMPONENTS
import App from "./App";

// STYLESHEETS
import "./assets/style/tailwind.css";
import "./assets/style/main.css";

// STORE

// WITHOUT DEV CONSOLE
const store = createStore(reducer, applyMiddleware(reduxThunk));
// WITH DEV CONSOLE

// MIDLEWARES
//const middlewares = [reduxThunk];

// STORE
// const store = createStore(
//   reducer,
//   composeWithDevTools(applyMiddleware([...middlewares]))
// );

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
