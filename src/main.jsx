import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/style.scss'
import App from "./App.jsx";
import {Provider} from "react-redux";
import {store} from "./store.js";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App/>
  </Provider>
);