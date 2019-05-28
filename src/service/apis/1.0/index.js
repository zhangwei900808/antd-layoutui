import ApiRequest from "../../request/ApiRequest";
import { urls } from "./urls";

class Apis {
  constructor() {}
  login = data => ApiRequest.post(urls.LOGIN, data);
  getTree = data => ApiRequest.get(`${urls.USER_TREERESOURCE}?deepNum=10&pid=0`);
}

export default new Apis();
