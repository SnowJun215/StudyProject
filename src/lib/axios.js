import axios from 'axios';
import {baseURL} from "@/config";
import {getToken} from "@/lib/util";
import Vue from 'vue'
let v = new Vue();

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
        v.$Spin.show();
        console.log('添加全局loading');
      }
      this.queue[url] = true;
      config.headers.Authorization = getToken();
      return config;
    }, error => {
      return Promise.reject(error)
    });
    instance.interceptors.response.use(res => {
      // console.log('from filter', res);
      const {data} = res;
      delete this.queue[url];
      if(!Object.keys(this.queue).length) {
        // 队列中不存在请求
        // Spin.hide();
        v.$Spin.hide();
        console.log('隐藏全局loading');
      }
      return data;
    }, error => {
      delete this.queue[url];
      if(!Object.keys(this.queue).length) {
        // 队列中不存在请求
        // Spin.hide();
        v.$Spin.hide();
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
