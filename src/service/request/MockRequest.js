import Mock from "mockjs";
import config from "../../config/base.conf";

export default class MockRequest {
  static hostPort() {
    return `${config.host}:${config.port}`;
  }
  static get(path, data = {}) {
    let url = `${MockRequest.hostPort()}${path}`;
    let datas = Mock.mock(url, "get", data);
  }
  static post(path, data = {}) {
    let url = `${MockRequest.hostPort()}${path}`;
    Mock.mock(url, "post", data);
  }
  static put(path, data = {}) {
    let url = `${MockRequest.hostPort()}${path}`;
    Mock.mock(url, "put", data);
  }
  static delete(path, data = {}) {
    let url = `${MockRequest.hostPort()}${path}`;
    Mock.mock(url, "delete", data);
  }
}
