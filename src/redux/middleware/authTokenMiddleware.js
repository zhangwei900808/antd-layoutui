import { REHYDRATE } from "redux-persist/lib/constants";
import ApiRequest from "../../service/request/ApiRequest";
import { authTypes } from "../actions/authAction";
import { fromJS } from "immutable";

/**保存token中间件 */
export const authTokenMiddleware = store => next => action => {
  /**当刷新页面 persist会触发 action = REHYDRATE*/
  if (action.type === REHYDRATE) {
    if (typeof action.payload !== "undefined") {
      let authReducer = action.payload.authReducer;
      if (authReducer) {
        const token = authReducer.get("token");
        ApiRequest.setToken(token ? token : null);
      }
    }
  }
  /**当登录成功会触发 action = AUTH_SUCCESS*/
  if (action.type === authTypes.AUTH_SUCCESS) {
    ApiRequest.setToken(action.data.token);
  }
  return next(action);
};
