import React from 'react';
import ReactDOM from 'react-dom';
// import './styles.less';
import './index.css'
import App from './App';
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorBoundary from "./components/error-boundary";
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
    <Provider store={store}>
      <ErrorBoundary>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </ErrorBoundary>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
