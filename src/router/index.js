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
import AppsIdle from '../components/apps/idle/Idle'
import AppsIdleDetail from '../components/apps/idle/IdleDetail'
import EpidemicMap from '../components/apps/epidemic/Map'
import UserIdle from '../components/user/MyIdle'
import UserComment from '../components/user/Comment'
import IssueIdle from '../components/issue/IdleIssue'
import IssueAsk from '../components/issue/AskIssue'
import IssueHelp from "../components/issue/HelpIssue";
import AppsHelp from "../components/apps/help/Help";
import UserHelp from "../components/user/MyHelp";
import LinkBlank from "../components/blankPage/Link";
import FaceLogin from "../views/FaceLogin";
import FinishFaceLogin from "../components/user/FinishFaceLogin";
import Test from "../test/Test";



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
      path:'/test',
      component: Test
    },
    {
      path: '/',
      redirect: '/login',
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
          name: 'MainMyIndex',
          component: MainMyIndex
        },
        {
          path: '/main/myApp',
          name: 'MainMyApp',
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
      path: '/faceLogin',
      component: FaceLogin
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
    },
    {
      path: '/apps/idle',
      name: 'AppsIdle',
      component: AppsIdle
    },
    {
      path: '/apps/idleDetail',
      name: 'AppsIdleDetail',
      component: AppsIdleDetail
    },
    {
      path: '/epidemic/map',
      name: "EpidemicMap",
      component: EpidemicMap
    },
    {
      path: '/user/idle',
      name: 'UserIdle',
      component: UserIdle
    },
    {
      path: '/user/comment',
      name: 'UserComment',
      component: UserComment
    },
    {
      path: '/user/myHelp',
      component: UserHelp
    },
    {
      path: '/issue/idleIssue',
      component: IssueIdle
    },
    {
      path: '/issue/askIssue',
      component: IssueAsk
    },
    {
      path: '/issue/helpIssue',
      component: IssueHelp
    },
    {
      path: '/apps/help',
      component: AppsHelp
    },
    {
      path: '/link/blank',
      name: 'linkBlank',
      component: LinkBlank
    },
    {
      path: '/user/finishFaceLogin',
      component: FinishFaceLogin
    }

  ]
});
//挂载路由导航卫士
router.beforeEach((to,from,next) => {
  if(to.path === '/login' || to.path === '/register' || to.path === '/faceLogin' || to.path === '/test' || to.path === '/test2'){
    return next();
  }
  const tokenStr = window.sessionStorage.getItem('token');
  if(!tokenStr) return next('/login');
  return next();
});


export default router;
