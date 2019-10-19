import axios from 'axios';
import {baseURL} from "@/config";

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl;
    this.queue = {};
  }

  /**
   * 全局配置
   * @returns {{headers: {}, baseUrl: *}}
   */
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    };
    return config;
  }

  /**
   * 拦截器
   * @param instance
   * @param url
   */
  interceptors (instance, url) {
    instance.interceptors.request.use(config => {
      if(!Object.keys(this.queue).length) {
        // 队列中不存在请求
        // Spin.show();
        console.log('添加全局loading');
      }
      this.queue[url] = true;
      return config;
    }, error => {
      return Promise.reject(error)
    });
    instance.interceptors.response.use(res => {
      console.log('from filter', res);
      const {data, status} = res;
      delete this.queue[url];
      if(!Object.keys(this.queue).length) {
        // 队列中不存在请求
        // Spin.hide();
        console.log('隐藏全局loading');
      }
      return {data, status};
    }, error => {
      delete this.queue[url];
      if(!Object.keys(this.queue).length) {
        // 队列中不存在请求
        // Spin.hide();
        console.log('隐藏全局loading');
      }
      return Promise.reject(error);
    })
  }

  /**
   * 请求
   * @param options
   * @returns {*}
   */
  request (options) {
    let instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, options.url);
    return instance(options);
  }
}

export default HttpRequest
