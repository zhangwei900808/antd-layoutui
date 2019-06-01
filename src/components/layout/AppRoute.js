import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Redirect } from "react-router";
import { BrowserRouter as Router, HashRouter, Route } from "react-router-dom";
import Login from "../../pages/login/Login";
import LayoutPage from "./LayoutPage";
import NoFound from "../../pages/NoFound";

@connect(store => ({
  store
}))
class AppRoute extends Component {
  // 用户认证
  Authentication() {
    return this.props.store.authReducer.get("token") ? <Redirect to="/" /> : <Login />;
  }
  render() {
    return (
      <>
        {/* 解决github gh-pages发布必须以Hash浏览否则history模式就会报错问题，
      如果想使用history模式去掉下面的HashRouter即可 */}
        <HashRouter>
          <Switch>
            <Route path="/login" render={() => this.Authentication()} />
            <Route path="/" component={LayoutPage} />
            <Route component={NoFound} />
          </Switch>
        </HashRouter>
      </>
    );
  }
}

export default AppRoute;
