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




Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(GlobalMethods);


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  //配置路由
  router,
  components: { App },
  template: '<App/>'
});
