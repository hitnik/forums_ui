import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import "semantic-ui-css/semantic.min.css";
import './styles/App.css';
import { HashRouter as Router} from "react-router-dom";
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import { combineReducers } from 'redux';
import forumsSlice from './store/slices/forumsSlice';
import { connectRouter } from 'connected-react-router';
import { routerMiddleware } from 'connected-react-router';
import { ConnectedRouter } from 'connected-react-router';

import history from './components/main/history';


const rootReducer = (history) => combineReducers({
  forumsSlice: forumsSlice,
  router : connectRouter(history)
});


const sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware(), 
                    sagaMiddleware, 
                    routerMiddleware(history),
]

const store = configureStore({
  reducer:rootReducer(history),
  middleware:middleware
});

sagaMiddleware.run(rootSaga);

const Root = ({ store }) => (
    <Provider store={store}>
      <ConnectedRouter history={history}>
          <Router>
              <App />
          </Router>
        </ConnectedRouter>
    </Provider>
  )  

ReactDOM.render((<Root store={store}/>), document.getElementById("root"));


export default store;