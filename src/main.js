// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'  //全局使用路由模块
//导入路由表
import router from './router'

//使用element-ui模块
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入全局样式表
import './assets/css/global.css'
//导入字体图标
import './assets/fonts/iconfont.css'
//导入flexible
import 'lib-flexible'
//导入自定义全局函数模块
import GlobalMethods from './api/global_methods'

//导入vant所有组件
import Vant from 'vant'
import 'vant/lib/index.css'
import {Lazyload} from 'vant'

//导入NutUi
import NutUI from '@nutui/nutui'
import '@nutui/nutui/dist/nutui.css'

NutUI.install(Vue);

import MyUi from './components'
Vue.use(MyUi);

//不手动引入地图不显示
import 'echarts/map/js/china'
import 'echarts/map/js/world'

import axios from 'axios'
import VueAxios from 'vue-axios'

import VueScroller from 'vue-scroller'
Vue.use(VueScroller);
Vue.use(VueAxios,axios);
Vue.config.productionTip = false;
//配置请求的根路径
//axios.defaults.baseURL = 'http://127.0.0.1:8087';
axios.defaults.baseURL = 'http://192.168.43.143:8087';

//通过axios的拦截器添加token验证
axios.interceptors.request.use(config =>{
  //console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config;
});



Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(GlobalMethods);
Vue.use(Vant);
Vue.use(Lazyload);

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  //配置路由
  router,
  components: { App },
  template: '<App/>'
});
