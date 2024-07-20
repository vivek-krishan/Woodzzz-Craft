import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./Components/Utils/Store.js";
import "./index.css";
import { ToastContainer } from "react-custom-alert";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <ToastContainer floatingTime={3000} />
      <App />
    </Router>
  </Provider>
);
