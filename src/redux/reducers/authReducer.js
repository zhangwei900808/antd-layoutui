import { handleActions } from "redux-actions";
import { authTypes } from "../actions/authAction";
import moment from "moment";
import { Map, fromJS, merge } from "immutable";

const initState = fromJS({
  user: null,
  token: ""
});

const authReducer = handleActions(
  {
    [authTypes.AUTH_SUCCESS]: (state, action) => {
      return state.merge({
        user: action.data.user,
        token: action.data.token
      });
    },
    [authTypes.SIGN_OUT]: (state, action) => {
      return state.merge({
        user: null,
        token: ""
      });
    }
  },
  initState
);

export default authReducer;
