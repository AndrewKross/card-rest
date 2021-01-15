import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import 'antd/dist/antd.css';
import axios from "axios";

const URL = 'http://localhost:4000'

export const api = axios.create({
  baseURL: URL,
  timeout: 5000,
});

ReactDOM.render(
  <React.StrictMode>
    <App  />
  </React.StrictMode>,
  document.getElementById('root')
);
