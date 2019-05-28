import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Spin } from "antd";

const loading = WrappedComponent =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false
      };
    }
    componentDidMount() {}
    componentDidUpdate() {}
    render() {
      const { layoutPageReducer } = this.props;
      return (
        <>
          {!this.state.loading ? (
            <WrappedComponent {...this.props} />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                margin: "auto",
                paddingTop: 50,
                textAlign: "center"
              }}
            >
              <Spin tip="加载中..." size="large" />
            </div>
          )}
        </>
      );
    }
  };

function mapStateToProps(state) {
  return {
    layoutPageReducer: state.layoutPageReducer
  };
}

const withLoading = compose(
  connect(mapStateToProps),
  loading
);
export default withLoading;
