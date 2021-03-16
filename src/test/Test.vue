<template>
    <div>
      TestWebSocket
      {{userId}}
    </div>
</template>

<script>
  import GLOBAL from '../api/global_variable'
    export default {
        name: "Test",
        data(){
            return{
                webSocket: "",
                wsCreateHandler: null,
                timeout: 15000,
                timeoutObj: null,
                serverTimeoutObj: null,
                userId: 123,
                lockReconnect: false,
            }
        },
        mounted() {
            this.createWebSocket();
        },
        destroyed(){

        },
        methods:{
            createWebSocket(){
                // 实例化socket
                try{
                    if('WebSocket' in window){
                        this.webSocket = new WebSocket("ws://localhost:8087/webSocket/" + this.userId);
                    }else if('MozWebSocket' in window){
                        this.webSocket = new MozWebSocket("ws://localhost:8087/webSocket/" + this.userId);
                    }else{
                        this.webSocket = new SocketJs("ws://localhost:8087/webSocket/" + this.userId);
                    }
                    this.init();
                    GLOBAL.webSocket = this.webSocket;
                }catch (e) {
                    this.reconnect();
                }
            },
            init(){
                try {
                    //监听socket连接
                    this.webSocket.onopen = this.webSocketOpen;
                    //监听socket错误信息
                    this.webSocket.onerror = this.webSocketError;
                    //监听socket消息
                    this.webSocket.onmessage = this.webSocketGetMessage;
                    this.webSocket.onclose = this.webSocketClose;
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
                this.webSocket.send(JSON.stringify(data));
            },
            sendMessage(msg){
                this.webSocket.send(msg);
            },
            webSocketClose(){
                console.log("socket已关闭");
                this.reconnect();
                //手动清除
                //this.clear();
            },


            reconnect(){
                if(this.lockReconnect){
                    return;
                }
                let vm = this;
                console.log("1秒后重连");
                this.lockReconnect = true;
                this.wsCreateHandler && clearTimeout(this.wsCreateHandler);
                this.wsCreateHandler = setTimeout(function () {
                    console.log("重连..."  + "假设这是url");
                    vm.createWebSocket();
                    vm.lockReconnect = false;
                },1000)
            },


            //心跳检测
            reset() {
                clearTimeout(this.timeoutObj);
                clearTimeout(this.serverTimeoutObj);
                this.start();
            },
            start() {
                let vm = this;
                this.timeoutObj && clearTimeout(this.timeoutObj);
                this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
                this.timeoutObj = setTimeout(function () {
                    console.log("发送ping到后台")
                    try {
                        vm.webSocket.send("ping");
                    }catch (e) {
                        console.log("发送ping异常");
                    }
                    vm.serverTimeoutObj = setTimeout(function () {
                        console.log("没有收到后台的数据，关闭连接");
                        vm.reconnect();
                    },vm.timeout);
                }, this.timeout);
            },
            clear(){
                clearTimeout(this.timeoutObj);
                clearTimeout(this.serverTimeoutObj);
            }
        },
    }
</script>

<style scoped>

</style>
