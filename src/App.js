import React, { Component } from "react";
import { Spin } from "antd";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import { ConnectedRouter } from "connected-react-router/immutable";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore, { history } from "./redux/store";
import AppRoute from "./components/layout/AppRoute";

const { persistor, store } = configureStore();
store.subscribe(() => {
  // console.log("subscript", store.getState());
});

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const customContext = React.createContext(null);
    return (
      <Provider store={store}>
        <PersistGate loading={<Spin />} persistor={persistor}>
          <ConnectedRouter history={history}>
            <AppRoute />
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
