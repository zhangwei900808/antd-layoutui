import { handleActions } from "redux-actions";
import { layoutPageTypes } from "../actions/layoutPageAction";
import { Map, fromJS, merge, List } from "immutable";

const initState = fromJS({
  index: "126",
  subIndex: "",
  collapsed: false,
  menus: List()
});

const layoutPageReducer = handleActions(
  {
    [layoutPageTypes.SAVE_MENU_INDEX]: (state, action) => {
      const { keyPath } = action.payload;
      let index = keyPath[0];
      let subIndex = null;
      if (keyPath.length === 2) {
        subIndex = keyPath[1];
      }
      return state.merge({
        index: index,
        subIndex: subIndex
      });
    },
    [layoutPageTypes.SAVE_MENU_COLLAPSED]: (state, action) => {
      const { collapsed } = action.payload;
      return state.merge({
        collapsed: collapsed
      });
    },
    [layoutPageTypes.GET_MENUS]: (state, action) => {
      const { menus } = action;
      return state.merge({
        menus: menus
      });
    }
  },
  initState
);

export default layoutPageReducer;
