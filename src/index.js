import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'; 
import { Provider } from "react-redux";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from "./reducer";

// Reference to root div
var destination = document.querySelector("#root");

// Create Store for cart
var store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    destination
);
registerServiceWorker();
