import axios from "axios";
import { message } from "antd";
import config from "../../config/base.conf";

/**
 * Http服务类
 * get
 * post
 * upload
 * put
 * patch
 * delete
 */
class ApiRequest {
  constructor() {
    //创建axios实例
    this.instance = axios.create({
      baseURL: `${config.host}:${config.port}`
    });
  }

  /**
   * 通过authTokenMiddleware中间件监听action=REHYDRATE|AUTH_SUCCESS来设置token
   */
  setToken = token => {
    this.instance.defaults.headers.common["Authorization"] = token;
  };

  authentication = str => {
    let errJson = JSON.parse(str);
    if (errJson.response && errJson.response.status === 401) {
      message.error("用户认证出错，正在跳转登录页面！");
      setTimeout(() => {
        localStorage.removeItem(`persist:${config.persist}`);
        window.location.href = "/login";
      }, 1500);
    }
  };

  upload(url, formData) {
    return new Promise((resolve, reject) => {
      this.instance
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(({ data }) => {
          resolve(data);
        })
        .catch(error => {
          let errStr = JSON.stringify(error);
          this.authentication(errStr);
          reject(errStr);
        });
    });
  }

  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      this.instance
        .get(url, { params: { ...params } })
        .then(({ data }) => {
          resolve(data);
        })
        .catch(error => {
          let errStr = JSON.stringify(error);
          this.authentication(errStr);
          reject(errStr);
        });
    });
  }

  delete(url, params = {}) {
    return new Promise((resolve, reject) => {
      this.instance
        .delete(url, { params: { ...params } })
        .then(({ data }) => {
          resolve(data);
        })
        .catch(error => {
          let errStr = JSON.stringify(error);
          this.authentication(errStr);
          reject(errStr);
        });
    });
  }

  post(url, params = {}) {
    return new Promise((resolve, reject) => {
      this.instance
        .post(url, { ...params })
        .then(({ data }) => {
          resolve(data);
        })
        .catch(error => {
          let errStr = JSON.stringify(error);
          if (url.includes("login")) {
            reject(errStr);
          } else {
            this.authentication(errStr);
          }
        });
    });
  }

  put(url, params = {}) {
    return new Promise((resolve, reject) => {
      this.instance
        .put(url, { ...params })
        .then(({ data }) => {
          resolve(data);
        })
        .catch(error => {
          let errStr = JSON.stringify(error);
          this.authentication(errStr);
          reject(errStr);
        });
    });
  }

  patch(url, params = {}) {
    return new Promise((resolve, reject) => {
      this.instance
        .patch(url, { ...params })
        .then(({ data }) => {
          resolve(data);
        })
        .catch(error => {
          let errStr = JSON.stringify(error);
          this.authentication(errStr);
          reject(errStr);
        });
    });
  }
}

export default new ApiRequest();
