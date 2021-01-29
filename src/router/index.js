import Vue from 'vue'
import Router from 'vue-router'

import Login from '../views/Login'
import Register from '../views/Register'
import Index from '../views/Index'
import MainMyUser from '../components/main/MyUser'
import MainMyIndex from '../components/main/MyIndex'
import MainMyApp from '../components/main/MyApp'
import UserDetail from '../components/user/MyDetail'
import UserUpdateNickName from '../components/user/UpdateNickName'
import UserFinishSchool from '../components/user/SelectSchool'
import UserFinishNum from '../components/user/FinishNum'
import UserModifyPassword from '../components/user/ModifyPassword'
import UserFindPassword from '../components/user/FindPassword'




//安装路由
Vue.use(Router);

//解决路由重复问题（报错），虽然对项目是为没有影响的
//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function (location) {
  return originalPush.call(this,location).catch(err => err);
};

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
      redirect: '/index',
    },

    {
      //路由路径
      path: '/login',
      //路由名称
      name: 'Login',
      //跳转到组件
      component: Login
    },

    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      redirect: '/main/myIndex',
      //子路由
      children: [
        {
          path: '/main/myIndex',
          component: MainMyIndex
        },
        {
          path: '/main/myApp',
          component: MainMyApp
        },
        {
          path: '/main/myUser',
          name: 'MainMyUser',
          component: MainMyUser
        }
      ]
    },
    {
      path:'/user/myDetail',
      component: UserDetail
    },
    {
      path: '/user/updateNickName',
      name: 'UserUpdateNickName',
      component: UserUpdateNickName
    },
    {
      path: '/user/finishSchool',
      component: UserFinishSchool
    },
    {
      path: '/user/finishNum',
      component: UserFinishNum
    },
    {
      path: '/user/modifyPassword',
      name: 'UserModifyPassword',
      component: UserModifyPassword
    },
    {
      path: '/user/findPassword',
      name: 'UserFindPassword',
      component: UserFindPassword
    }
  ]
});



export default router;
