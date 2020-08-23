import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import "antd/dist/antd.css";
import './css/custom-antd.css';
import './css/index.css';
import Header from './views/header';
import Forms from './views/form';
import * as serviceWorker from './serviceWorker';
import { showAlert } from './js/alert';
ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<Forms />, document.getElementById('root'));

showAlert();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
