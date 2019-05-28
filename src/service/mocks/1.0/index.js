import MockRequest from "../../request/MockRequest";
import { urls } from "../../apis/1.0/urls";
import testData from "./testMock";

class MockAPi {
  constructor() {
    this.initMock();
  }
  initMock() {
    MockRequest.get(urls.API_TEST, testData);
    MockRequest.post(urls.USER_ORG_INSERT, testData);
  }
}

export default new MockAPi();
