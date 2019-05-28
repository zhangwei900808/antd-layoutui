import { createActions } from "redux-actions";

export const authTypes = {
  AUTH_REQUEST: "AUTH_REQUEST",
  AUTH_SUCCESS: "AUTH_SUCCESS",
  AUTH_FAILURE: "AUTH_FAILURE",

  SIGN_OUT: "SIGN_OUT",

  CHANGE_PASSWORD: "CHANGE_PASSWORD"
};

export default createActions({
  [authTypes.AUTH_REQUEST]: ({ username, password }) => ({ username, password }),
  [authTypes.AUTH_SUCCESS]: data => ({ data }),
  [authTypes.AUTH_FAILURE]: () => ({}),
  [authTypes.SIGN_OUT]: () => ({}),
  [authTypes.CHANGE_PASSWORD]: (oldPassword, newPassword) => ({ oldPassword, newPassword })
});
