import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { TaroAdapter } from "axios-taro-adapter";

// 创建 Axios 实例
const axiosInstance: AxiosInstance = axios.create({
  baseURL: '', // 你的 API 地址
  timeout: 10000, // 请求超时
  adapter: TaroAdapter, // 添加这一行替换默认的适配器
});

// 请求拦截
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在请求发送之前做些什么，比如添加 token
    const token = wx.getStorageSync('token'); // 从存储中获取 token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // 设置请求头
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么
    return response.data; // 直接返回数据
  },
  (error) => {
    // 对响应错误做点什么
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.error('Error Response:', error.response.data);
      wx.showToast({
        title: '请求错误',
        icon: 'none',
      });
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error('Error Request:', error.request);
      wx.showToast({
        title: '网络错误',
        icon: 'none',
      });
    } else {
      // 发生了其他错误
      console.error('Error Message:', error.message);
    }
    return Promise.reject(error);
  }
);

// 导出封装的 axios 实例
export default axiosInstance;
