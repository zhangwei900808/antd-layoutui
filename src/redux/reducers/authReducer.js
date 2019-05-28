import { handleActions } from "redux-actions";
import { authTypes } from "../actions/authAction";
import moment from "moment";

const initState = {
  user: null,
  token: ""
};

const authReducer = handleActions(
  {
    [authTypes.AUTH_SUCCESS]: (state, action) => {
      return Object.assign({}, state, { user: action.data.user, token: action.data.token });
    },
    [authTypes.SIGN_OUT]: (state, action) => {
      return Object.assign({}, state, {
        user: null,
        token: ""
      });
    }
  },
  initState
);

export default authReducer;
