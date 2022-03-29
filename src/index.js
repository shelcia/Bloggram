import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import rootReducers from "./redux/reducers";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const store = createStore(
  rootReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
