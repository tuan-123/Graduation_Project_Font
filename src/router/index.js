import Vue from 'vue'
import Router from 'vue-router'

import Login from '../views/Login'
import Register from '../views/Register';
import Index from '../views/Index'

//安装路由
Vue.use(Router);

/**
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
 **/

const router = new Router({
  routes: [

    {
      path: '/',
      redirect: '/Index',
    },

    {
      //路由路径
      path: '/Login',
      //路由名称
      name: 'Login',
      //跳转到组件
      component: Login
    },

    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index
    }
  ]
});



export default router;
