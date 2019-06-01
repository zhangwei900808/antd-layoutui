import { call, put, takeLatest, select } from "redux-saga/effects";
import { push } from "connected-react-router";
import authAction, { authTypes } from "../actions/authAction";
import { layoutPageTypes } from "../actions/layoutPageAction";
import { message } from "antd";
import Apis from "../../service/apis/1.0";
import config from "../../config/base.conf";

function strokeItem(name, value) {
  localStorage.setItem(name, value);
}

function clearItem(name) {
  localStorage.removeItem(name);
}

function* test() {
  yield put({
    type: authTypes.AUTH_SUCCESS,
    data: {
      user: {
        name: "Awbeci"
      },
      token: "awbeci token"
    }
  });
  yield put({
    type: layoutPageTypes.GET_MENUS,
    menus: [
      {
        icon: "radar-chart",
        id: 1,
        isShow: "1",
        resourceName: "综合态势",
        url: "/"
      },
      {
        icon: "fund",
        id: 2,
        isShow: "1",
        resourceName: "部门管理",
        url: "/departmentManage"
      },
      {
        icon: "table",
        id: 3,
        isShow: "1",
        resourceName: "用户管理",
        url: "/userManage"
      }
    ]
  });
  yield put({
    type: layoutPageTypes.SAVE_MENU_INDEX,
    payload: {
      keyPath: ["1"]
    }
  });
  yield put(push("/"));
}

function* signout(action) {
  yield call(clearItem, "token");
  yield call(clearItem, `persist:${config.persist}`);

  //清除token
  // 设置选中第一个菜单
  yield put({
    type: layoutPageTypes.SAVE_MENU_INDEX,
    payload: {
      keyPath: ["126"]
    }
  });
  yield put({
    type: layoutPageTypes.SAVE_MENU_COLLAPSED,
    payload: {
      collapsed: false
    }
  });
  yield put({
    type: layoutPageTypes.GET_MENUS,
    menus: []
  });
  //跳转到登录页面
  yield put(push("/login"));
}

function* signin(action) {
  try {
    // yield put({
    //   type: layoutPageTypes.SET_LOADING,
    //   payload: {
    //     loading: true
    //   }
    // });
    // const res = yield call(Apis.login, action.payload);

    //if (res.success) {
    // yield put({ type: authTypes.AUTH_SUCCESS, data: res.data });
    // let res_menus = yield call(Apis.getTree);
    // yield put({ type: layoutPageTypes.GET_MENUS, menus: res_menus.result.list });
    // const state = yield select();
    // let layoutPageReducer = state.layoutPageReducer;
    // let menus = layoutPageReducer.menus;

    // /* 菜单按照sortId排序 start */
    // if (menus.length > 0) {
    //   menus.sort((a, b) => {
    //     return a.sortId - b.sortId;
    //   });
    //   menus.forEach(menu => {
    //     if (menu.children && menu.children.length > 0) {
    //       menu.children.forEach((children, index) => {
    //         if (children.resourceType == "html") {
    //           menu.hasMenus = true;
    //         }
    //       });
    //       if (menu.hasMenus) {
    //         menu.children.sort((a, b) => {
    //           return a.sortId - b.sortId;
    //         });
    //       }
    //     }
    //   });
    //   /* 菜单按照sortId排序 end */

    //   /**
    //    * 获取第一栏菜单并选中
    //    * 1、有二级菜单 选中二级菜单
    //    * 2、只有一级菜单，选中一级菜单
    //    */
    //   let url = "",
    //     menuIndex = "",
    //     subIndex = "";
    //   if (menus[0].hasMenus) {
    //     menus[0].children.forEach(child => {
    //       if (child.resourceType === "html" && subIndex == "") {
    //         url = child.url;
    //         menuIndex = menus[0].id;
    //         subIndex = child.id;
    //       }
    //     });
    //   } else {
    //     url = menus[0].url;
    //     menuIndex = menus[0].id;
    //   }
    //   yield put({
    //     type: layoutPageTypes.SAVE_MENU_INDEX,
    //     payload: {
    //       keyPath: subIndex !== "" ? [`${subIndex}`, `${menuIndex}`] : [`${menuIndex}`]
    //     }
    //   });
    //   yield put(push(url));
    // }
    //}
    // 正式使用的时候把上面放开即可，去掉下面一行
    yield call(test);
  } catch (error) {
    message.info("用户名或密码错误");
    yield call(clearItem, "token");
  } finally {
    // yield put({
    //   type: layoutPageTypes.SET_LOADING,
    //   payload: {
    //     loading: false
    //   }
    // });
  }
}

export default function* watchAuthRoot() {
  yield takeLatest(authTypes.AUTH_REQUEST, signin);
  yield takeLatest(authTypes.SIGN_OUT, signout);
}
