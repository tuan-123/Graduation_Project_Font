import MyComment from "./MyComment"
import MyIdleDetail from './MyIdleDetail'
import MyHelp from "./MyHelp";


MyComment.install = (Vue)=>{
  Vue.component(MyComment.name,MyComment);
};

MyIdleDetail.install = (Vue)=>{
  Vue.component(MyIdleDetail.name,MyIdleDetail);
};

MyHelp.install = (Vue)=>{
  Vue.component(MyHelp.name,MyHelp);
};


export default {
  MyComment,
  MyIdleDetail,
  MyHelp
};
