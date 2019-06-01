import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Switch } from "react-router";
import { NavLink, withRouter, Route } from "react-router-dom";
import { renderRoutes, matchRoutes } from "react-router-config";
import { Layout, Menu, Icon, Avatar, Dropdown, Spin } from "antd";
import baseConfig from "../../config/base.conf";
import layoutPageAction from "../../redux/actions/layoutPageAction";
import authAction from "../../redux/actions/authAction";
import SideMenu from "./SideMenu";
import NoFound from "../../pages/NoFound";
import NoPermission from "../../pages/NoPermission";
import routes from "../../router";

import "./layoutPage.scss";
const { Header, Content, Sider } = Layout;

@withRouter
@connect(
  ({ layoutPageReducer, authReducer }) => ({ layoutPageReducer, authReducer }),
  {
    saveMenuCollapsed: layoutPageAction.saveMenuCollapsed,
    saveMenuIndex: layoutPageAction.saveMenuIndex,
    signOut: authAction.signOut
  }
)
class LayoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toggle = () => {
    this.props.saveMenuCollapsed(!this.props.layoutPageReducer.collapsed);
  };

  clickDropdownMenu = ({ item, key, keyPath }) => {
    if (key === "signout") {
      this.props.signOut();
    } else if (key === "password") {
      this.props.saveMenuIndex([""]);
      this.props.history.push("/system/password");
    }
  };

  componentDidMount() {}

  render() {
    const { layoutPageReducer, authReducer } = this.props;

    const ddMenu = (
      <Menu onClick={this.clickDropdownMenu} style={{ lineHeight: "63px", fontSize: "14px" }}>
        <Menu.Item key="password" style={{ width: "150px" }}>
          <Icon type="setting" />
          <span>修改密码</span>
        </Menu.Item>
        <Menu.Item key="signout" style={{ width: "150px" }}>
          <Icon type="logout" />
          <span>退出登录</span>
        </Menu.Item>
      </Menu>
    );

    return (
      <Layout className="layout-container">
        <Sider theme="light" trigger={null} collapsible collapsed={layoutPageReducer.collapsed} width={218} breakpoint="lg" className="sider-container">
          <div className="logo">
            <img src={baseConfig.logo} width="32" alt="" />
            {!layoutPageReducer.collapsed ? <span className="title">{baseConfig.company}</span> : ""}
          </div>
          <SideMenu />
        </Sider>
        <Layout className="layout-page-right-container">
          <Header className="right-header">
            <div className="right-header-left">
              <Icon className="trigger" type={layoutPageReducer.collapsed ? "menu-unfold" : "menu-fold"} onClick={this.toggle} />
              {/* <img src={baseConfig.logo} alt="" width="28" height="28" /> */}
              <span>{baseConfig.title}</span>
            </div>
            <div className="right-header-right">
              {/* <div>通知</div> */}
              <Dropdown overlay={ddMenu} placement="bottomRight" className="right-header-right-dropdown">
                <div>
                  <Avatar size="default" style={{ backgroundColor: "#87d068" }} icon="user" />
                  <span style={{ marginLeft: 8 }}>{authReducer.get("user") ? authReducer.getIn(["user", "name"]) : "用户"}</span>
                </div>
              </Dropdown>
            </div>
          </Header>
          <Content className="layout-page-right-content">
            <Switch>{authReducer.get("token") ? renderRoutes(routes) : <Redirect to="/login" />}</Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default LayoutPage;
