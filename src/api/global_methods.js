exports.install = function (Vue,options) {
  Vue.prototype.test = function () {
    console.log(123);
  };
};
