import React from "react";
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import {Route, Switch} from "react-router-dom";
import "assets/vendors/style";
import "styles/wieldy.less";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import configureStore, { history } from './appRedux/store';
import App from "./containers/App/index";
import store from "./appRedux/store/index"
export const persistor = persistStore(store);

const NextApp = () =>
  <Provider store={store}>
    <ConnectedRouter history={history}>
    <PersistGate loading={null} persistor={persistor}>
      <Switch>
        <Route path="/" component={App}/>
      </Switch>
    </PersistGate>
    </ConnectedRouter>
  </Provider>;


export default NextApp;
