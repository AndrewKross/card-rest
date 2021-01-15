import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import 'antd/dist/antd.css';
import axios from "axios";
import { ApiConfig } from "./const"

export const api = axios.create({
  baseURL: ApiConfig.URL,
  timeout: ApiConfig.timeout,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
