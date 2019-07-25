import { createStore, compose, applyMiddleware } from "redux";
import { routerMiddleware } from "connected-react-router/immutable";

import { createMigrate, persistStore, persistReducer } from "redux-persist";
import createEncryptor from "redux-persist-transform-encrypt";
import immutableTransform from "redux-persist-transform-immutable";
import storage from "redux-persist/es/storage";

import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { createBrowserHistory } from "history";
import createRootReducer from "../reducers";
import rootSaga from "../sagas";
import config from "../../config/base.conf";
import { authTokenMiddleware } from "../middleware/authTokenMiddleware";

export const history = createBrowserHistory();
// create the router history middleware
const historyRouterMiddleware = routerMiddleware(history);
// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// 组合middleware
const middleWares = [sagaMiddleware, historyRouterMiddleware, logger];

const migrations = {
  0: state => {
    return {
      ...state,
      device: undefined
    };
  },
  2: state => {
    return {
      device: state.device
    };
  }
};

const encryptor = createEncryptor({
  secretKey: "hiynn",
  onError: function(error) {}
});

const persistConfig = {
  transforms: [
    immutableTransform()
    // encryptor
  ],
  key: config.persist,
  storage,
  version: 2,
  migrate: createMigrate(migrations, { debug: false })
};

const finalReducer = persistReducer(persistConfig, createRootReducer(history));
export default function configureStore(preloadedState) {
  const store = createStore(finalReducer, preloadedState, compose(applyMiddleware(...middleWares)));
  let persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return { persistor, store };
}
