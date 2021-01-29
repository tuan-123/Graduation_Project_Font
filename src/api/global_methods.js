export default {
  install(Vue){
    Vue.prototype.test = function(param){
      console.log(param);
    }
  }
}
