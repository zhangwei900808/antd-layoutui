import { handleActions } from "redux-actions";
import { layoutPageTypes } from "../actions/layoutPageAction";

const initState = {
  index: "126",
  subIndex: "",
  collapsed: false,
  menus: [],
  loading: false
};

const layoutPageReducer = handleActions(
  {
    [layoutPageTypes.SAVE_MENU_INDEX]: (state, action) => {
      const { keyPath } = action.payload;
      let index = keyPath[0];
      let subIndex = null;
      if (keyPath.length === 2) {
        subIndex = keyPath[1];
      }
      return Object.assign({}, state, {
        index: index,
        subIndex: subIndex
      });
    },
    [layoutPageTypes.SAVE_MENU_COLLAPSED]: (state, action) => {
      const { collapsed } = action.payload;
      return Object.assign({}, state, {
        collapsed: collapsed
      });
    },
    [layoutPageTypes.GET_MENUS]: (state, action) => {
      const { menus } = action;
      return Object.assign({}, state, {
        menus: menus
      });
    },
    [layoutPageTypes.SET_LOADING]: (state, action) => {
      const { loading } = action.payload;
      return Object.assign({}, state, {
        loading: loading
      });
    }
  },
  initState
);

export default layoutPageReducer;
