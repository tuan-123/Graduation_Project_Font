<template>
  <div class="container">
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="footer">
      <div>
        <span class="footer_span" @click="footer_clickIndex">
          <i class="icon iconfont" :style="{color:indexColor}">&#xe601;</i>
        </span>
        <span class="footer_span" @click="footer_clickApp">
          <i class="icon iconfont" :style="{color:appColor}">&#xe602;</i>
        </span>
        <span class="footer_span" @click="footer_clickUser">
          <i class="icon iconfont" :style="{color:userColor}">&#xe63a;</i>
        </span>
      </div>
    </div>
  </div>

</template>

<script>
  import GLOBAL from '../api/global_variable';
    export default {
        name: "Index",
        data(){
            return{
                indexColor: '',
                appColor: '',
                userColor: '',
                footer_click_color:{
                    clicked: 'skyblue',
                    unClicked: ''
                },
                wsCreateHandler:'',
            }
        },
        created(){
            var currentIndex = this.$route.params.currentIndex;
            if(currentIndex === undefined || currentIndex === 0){
                this.indexColor = this.footer_click_color.clicked;
            }else if(currentIndex === 1){
                this.appColor = this.footer_click_color.clicked;
            }else if(currentIndex === 2){
                this.userColor = this.footer_click_color.clicked;
            }
            this.createWebSocket(window.sessionStorage.getItem("userId"));
        },
        methods: {
            footer_clickIndex(){
                var vm = this;
                //console.log(123);
                //切换颜色
                this.indexColor = this.footer_click_color.clicked;
                this.appColor = this.footer_click_color.unClicked;
                this.userColor = this.footer_click_color.unClicked;
                this.$router.push('/main/myIndex');
            },
            footer_clickApp(){
                var vm = this;
                //切换颜色
                this.indexColor = this.footer_click_color.unClicked;
                this.appColor = this.footer_click_color.clicked;
                this.userColor = this.footer_click_color.unClicked;
                this.$router.push('/main/myApp');
            },
            footer_clickUser(){
                var vm = this;
                //切换颜色
                this.indexColor = this.footer_click_color.unClicked;
                this.appColor = this.footer_click_color.unClicked;
                this.userColor = this.footer_click_color.clicked;
                this.$router.push('/main/myUser');
            },

            createWebSocket(userId){
                try{
                    if(GLOBAL.webSocket === null){
                        if('WebSocket' in window){
                            GLOBAL.webSocket = new WebSocket("ws://localhost:8087/webSocket/" + userId);
                        }else if('MozWebSocket' in window){
                            GLOBAL.webSocket = new MozWebSocket("ws://localhost:8087/webSocket/" + userId);
                        }else{
                            GLOBAL.webSocket = new SocketJs("ws://localhost:8087/webSocket/" + userId);
                        }
                        this.init();
                        GLOBAL.lockReconnect = false;
                    }
                }catch (e) {
                    this.reconnect();
                }
            },
            init(){
                try {
                    //监听socket连接
                    GLOBAL.webSocket.onopen = this.webSocketOpen;
                    //监听socket错误信息
                    GLOBAL.webSocket.onerror = this.webSocketError;
                    //监听socket消息
                    GLOBAL.webSocket.onmessage = this.webSocketGetMessage;
                    GLOBAL.webSocket.onclose = this.webSocketClose;
                }catch (e) {
                    this.reconnect();
                }
            },
            webSocketOpen(){
                console.log("socket连接成功");
                this.start();
                //this.sendMessage("嗯哼“);
                //this.sendMessageToUserId("中午好",666)
            },
            webSocketError(){
                console.log("socket连接错误");
                this.reconnect();
            },
            webSocketGetMessage(msg){
                console.log(msg);
                //alert(msg.data);
                this.start();
            },
            sendMessageToUserId(message,userId){
                let data = {"fromUserId": this.userId, "toUserId": userId, "message": message};
                GLOBAL.webSocket.send(JSON.stringify(data));
            },
            sendMessage(msg){
                GLOBAL.webSocket.send(msg);
            },
            webSocketClose(){
                console.log("socket已关闭");
                this.reconnect();
                //手动清除
                //this.clear();
            },


            reconnect(){
                if(GLOBAL.lockReconnect){
                    return;
                }
                let vm = this;
                console.log("1秒后重连");
                GLOBAL.lockReconnect = true;
                this.wsCreateHandler && clearTimeout(this.wsCreateHandler);
                this.wsCreateHandler = setTimeout(function () {
                    console.log("重连..."  + "假设这是url");
                    vm.createWebSocket();
                    GLOBAL.lockReconnect = false;
                },1000)
            },


            //心跳检测
            reset() {
                clearTimeout(GLOBAL.webSocketTimeOutObj);
                clearTimeout(GLOBAL.webSocketServerTimeOutObj);
                this.start();
            },
            start() {
                let vm = this;
                GLOBAL.webSocketTimeOutObj && clearTimeout(GLOBAL.webSocketTimeOutObj);
                GLOBAL.webSocketServerTimeOutObj && clearTimeout(GLOBAL.webSocketServerTimeOutObj);
                GLOBAL.webSocketTimeOutObj = setTimeout(function () {
                    console.log("发送ping到后台")
                    try {
                        GLOBAL.webSocket.send("ping");
                    }catch (e) {
                        console.log("发送ping异常");
                    }
                    GLOBAL.webSocketServerTimeOutObj = setTimeout(function () {
                        console.log("没有收到后台的数据，关闭连接");
                        vm.reconnect();
                    },GLOBAL.webSocketTimeOut);
                }, GLOBAL.webSocketTimeOut);
            },
        }
    }
</script>

<style scoped>

  .container{
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
  }
  .main {
    background-color: blue;
    height: 92%;
    color: #333;
    padding: 0 0 0 0;
  }
  .footer {
    background-color: red;
    height: 8%;
    color: #333;
    text-align: center;
    padding: 0 0 0 0;
  }
  .footer div{
    background-color: #795da3;
    height: 100%;
    line-height: 100%;
    padding: 0 0 0 0;
  }
  .footer_span{
    height: 100%;
    line-height: 100%;
    width: 32.6%;
    /*在高度为100%的情况下垂直中*/
    display:inline-flex;
    justify-content:center;
    align-items:center;
  }
  .footer_span i{
    font-size: 50px;
  }
</style>
