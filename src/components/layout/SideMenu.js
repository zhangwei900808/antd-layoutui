import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter, Route } from "react-router-dom";
import { Layout, Menu, Icon, Avatar, Dropdown, Spin } from "antd";
import layoutPageAction from "../../redux/actions/layoutPageAction";
import Loading from "./Loading";

const SubMenu = Menu.SubMenu;

@connect(
  ({ layoutPageReducer, authReducer }) => ({ layoutPageReducer, authReducer }),
  {
    saveMenuIndex: layoutPageAction.saveMenuIndex
  }
)
class MenuPage extends Component {
  constructor(props) {
    super(props);
  }
  clickSidebarMenu = ({ item, key, keyPath }) => {
    this.props.saveMenuIndex(keyPath);
  };
  // 判断菜单children是否存在子菜单
  hasMenus(menus) {
    let hasMenus = false;
    menus.map(menu => {
      if (menu.resourceType == "html") {
        hasMenus = true;
      }
    });
    return hasMenus;
  }

  render() {
    const { layoutPageReducer, authReducer } = this.props;
    let menus = layoutPageReducer.get("menus");

    let newMenus = <Loading />;
    if (menus && menus.length > 0) {
      newMenus = menus.map(menu =>
        menu.children && this.hasMenus(menu.children) ? (
          <SubMenu
            key={menu.id}
            title={
              <div>
                <Icon type={menu.icon} />
                <span>{menu.resourceName}</span>
              </div>
            }
          >
            {menu.children.map(children => {
              return children.resourceType == "html" && children.isShow == "1" ? (
                <Menu.Item key={children.id}>
                  <NavLink to={children.url}>{children.resourceName}</NavLink>
                </Menu.Item>
              ) : null;
            })}
          </SubMenu>
        ) : (
          menu.isShow == "1" && (
            <Menu.Item key={menu.id}>
              <NavLink to={menu.url}>
                <Icon type={menu.icon} />
                <span>{menu.resourceName}</span>
              </NavLink>
            </Menu.Item>
          )
        )
      );
    }

    return (
      <>
        <Menu
          theme="light"
          defaultSelectedKeys={[layoutPageReducer.get("index")]}
          selectedKeys={[layoutPageReducer.get("index")]}
          defaultOpenKeys={[layoutPageReducer.get("subIndex")]}
          mode="inline"
          className="sider-menu-container"
          inlineCollapsed={layoutPageReducer.get("collapsed")}
          onClick={this.clickSidebarMenu}
        >
          {newMenus}
        </Menu>
      </>
    );
  }
}
export default MenuPage;
