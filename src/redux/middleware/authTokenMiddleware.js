import { REHYDRATE } from "redux-persist/lib/constants";
import ApiRequest from "../../service/request/ApiRequest";
import { authTypes } from "../actions/authAction";

/**保存token中间件 */
export const authTokenMiddleware = store => next => action => {
  /**当刷新页面 persist会触发 action = REHYDRATE*/
  if (action.type === REHYDRATE) {
    if (action.payload && action.payload.authReducer && action.payload.authReducer.token) {
      ApiRequest.setToken(action.payload.authReducer.token);
    }
  }
  /**当登录成功会触发 action = AUTH_SUCCESS*/
  if (action.type === authTypes.AUTH_SUCCESS) {
    ApiRequest.setToken(action.data.token);
  }
  return next(action);
};
