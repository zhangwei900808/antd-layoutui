import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { LocaleProvider, message } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import * as serviceWorker from "./serviceWorker";
import "./assets/css/index.css";
import "./assets/css/base.scss";
import "./assets/css/override-antd.scss";
import "./service/mocks/1.0";
moment.locale("zh-cn");
message.config({
  duration: 2,
  maxCount: 1
});
//去掉所有页面的console.log
// console.log = function() {};
ReactDOM.render(
  //增加antd对中文的支持
  <LocaleProvider locale={zh_CN}>
    <App />
  </LocaleProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
