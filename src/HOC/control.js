import React from "react";
import { is, Map, fromJS } from "immutable";
import { from } from "rxjs";

const control = WrappedComponent =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        // 可视区高度和宽度
        document: {
          body: {
            width: 0,
            height: 0
          },
          //侧边栏高度和宽度
          sidebar: {
            width: 0,
            height: 0
          },
          //内容区域高度和宽度
          content: {
            width: 0,
            height: 0
          },
          header: Map({
            height: 64,
            width: 0,
            menu: Map({
              height: 0,
              width: 0
            })
          })
        }
      };
    }
    componentWillMount() {
      let cw = document.body.clientWidth;
      let ch = document.body.clientHeight;
      this.computedLayout(cw, ch);
    }
    componentDidMount() {
      window.addEventListener("resize", this.computedLayout);
    }
    componentWillUnmount() {
      window.removeEventListener("resize", this.computedLayout);
    }
    computedLayout = () => {
      let width = document.body.clientWidth;
      let height = document.body.clientHeight;

      this.setState((state, props) => ({
        //todo:
      }));
    };

    shouldComponentUpdate(nextProps, nextState) {
      const thisProps = this.props || {};
      const thisState = this.state || {};
      nextState = nextState || {};
      nextProps = nextProps || {};

      if (Object.keys(thisProps).length !== Object.keys(nextProps).length || Object.keys(thisState).length !== Object.keys(nextState).length) {
        return true;
      }

      for (const key in nextProps) {
        if (!is(thisProps[key], nextProps[key])) {
          return true;
        }
      }

      for (const key in nextState) {
        if (!is(thisState[key], nextState[key])) {
          return true;
        }
      }
      return false;
    }
    render() {
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  };

export default control;
