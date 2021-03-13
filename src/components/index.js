import common from "./common"

 const components = [
   common
 ];


//vue.use使用时，必须要有install方法。参数就是vue。
/*const install  = (Vue)=>{
  for(var key in components){
    Vue.component(components[key].name,components[key])
  }
}*/
// 以上有误 修改以下install
const install  = (Vue)=>{
  for(var key in components){
    //console.log(components[key]);
    for(var k in components[key]) {
      //console.log(components[key][k]);
      Vue.component(components[key][k].name, components[key][k])
    }
  }
};


 export default {
   install,
   common
 }
