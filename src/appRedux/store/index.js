import {applyMiddleware, createStore} from 'redux'
import {routerMiddleware} from 'connected-react-router'
import thunk from 'redux-thunk';
import createRootReducer from '../reducers'
import Settings from "../reducers/Settings";
import Auth from "../reducers/Auth";
import Common from "../reducers/Common";
import {connectRouter} from 'connected-react-router'
import roles from "../reducers/Role";
import sale from "../reducers/Sale"
import Courses from "../reducers/Courses";
import programs from "../reducers/programs";
import currentUser from "../reducers/currentUser"

import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
  compose
} from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const createBrowserHistory = require('history').createBrowserHistory;


export const history = createBrowserHistory();
const reducers=combineReducers({
  router: connectRouter(history),
  settings: Settings,
  auth: Auth,
  common: Common,
  roles:roles,
  sale:sale,
  Courses:Courses,
  programs:programs,
  currentUser:currentUser,
});

const routeMiddleware = routerMiddleware(history);

const middlewares = [thunk, routeMiddleware];
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    },
    composeEnhancers(applyMiddleware(thunk))),
});
export default store;
