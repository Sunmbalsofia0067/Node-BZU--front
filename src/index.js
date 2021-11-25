import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import NextApp from './NextApp';
import * as serviceWorker from './registerServiceWorker';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

axios.defaults.baseURL = "http://localhost:3001/";

ReactDOM.render(<NextApp />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
