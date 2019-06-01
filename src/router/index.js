import React from "react";
import loadable from "@loadable/component";
import RouterView from "../components/layout/RouterView";
import NoFound from "../pages/NoFound";
import NoPermission from "../pages/NoPermission";
import Loading from "../components/layout/Loading";
const Index = loadable(() => import("../pages/Index"), { fallback: <Loading /> });
const DepartmentManage = loadable(() => import("../pages/DepartmentManage"), { fallback: <Loading /> });
const UserManage = loadable(() => import("../pages/UserManage"), { fallback: <Loading /> });

// 注意区分前端路由和前端菜单是两个不同的东西
// 注：菜单和路由都是基于该路由数据生成
// 菜单可以不全部展示在页面上(隐藏)，但路由必须全部要定义
// 后期可以加入权限控制
const routes = [
  {
    key: "1",
    name: "首页",
    path: "/",
    exact: true,
    component: Index
  },
  {
    key: "2",
    name: "部门管理",
    path: "/departmentManage",
    component: DepartmentManage
  },
  {
    key: "3",
    name: "用户管理",
    path: "/userManage",
    component: UserManage
  }
];

export default routes;
