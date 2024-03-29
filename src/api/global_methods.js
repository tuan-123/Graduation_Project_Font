export default {
  install(Vue){
    Vue.prototype.test = function(param){
      console.log(param);
    };
    Vue.prototype.timeAgo = function(date){
      var minute = 1000 * 60;
      var hour = minute * 60;
      var day = hour * 24;
      var week = day * 7;
      var month = day * 30;

      var now = new Date().getTime();
      var diffValue = now - new Date(date).getTime();

      if(diffValue < 0)
        return ;

      var minC = diffValue / minute;
      var hourC = diffValue / hour;
      var dayC = diffValue / day;
      var weekC = diffValue / week;
      var monthC = diffValue / month;

      var result = '';
      if(monthC > 12){
        return date + "";
      }else if(monthC >= 1){
        result = "" + parseInt(monthC) + "月前";
      }else if(weekC >= 1){
        result = "" + parseInt(weekC) + "周前";
      }else if(dayC >= 1){
        result = "" + parseInt(dayC) + "天前";
      }else if(hourC >= 1){
        result = "" + parseInt(hourC) + "小时前";
      }else if(minC >= 1){
        result = "" + parseInt(minC) + "分钟前";
      }else
        result = "刚刚";
      return result;
    };
  }
}
