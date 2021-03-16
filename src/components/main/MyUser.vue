<template>
  <div style="height: 100%">
    <div class="myUserHeader">
      <div class="img">
        <van-image
          round
          width="2.5rem"
          height="2.5rem"
          :src="userHeaderImg"
        >
          <template v-slot:error>加载失败</template>
        </van-image>

      </div>
      <div class="content">
        <div class="nickName">
          {{nickName}}
          <span class="more" @click="toDetail"> > </span>
        </div>
        <div class="userName">账号: {{userName}}</div>
      </div>
    </div>

    <div class="myUserBody">
      <div id="password">
        <div @click="toModifyPassword">
          <span>
          <i class="icon iconfont" style="color:#1296db;">&#xe604;</i>
        </span>
          <span id="passwordText" class="mySomeThings noBottomBorder">
            密&#9码
            <span class="toSomeThings"> > </span>
          </span>
        </div>
      </div>
      <div @click="toMyIdle">
        <span>
          <i class="icon iconfont" style="color:#1afa29;">&#xe605;</i>
        </span>
        <span class="mySomeThings">
          闲&#9置
          <span class="toSomeThings"> > </span>
        </span>
      </div>
      <div @click="toMyComment">
        <span>
          <i class="icon iconfont" style="color:#1296db">&#xe609;</i>
        </span>
        <span class="mySomeThings">
          提&#9问
          <span class="toSomeThings"> > </span>
        </span>
      </div>
      <div @click="toMyHelp">
        <span>
          <i class="icon iconfont" style="color:#1296db">&#xe609;</i>
        </span>
        <span class="mySomeThings">
          帮&#9代
          <span class="toSomeThings"> > </span>
        </span>
      </div>
      <div>
        <span>
          <i class="icon iconfont" style="color:#f3ca7e">&#xe606;</i>
        </span>
        <span class="mySomeThings noBottomBorder">
          收&#9藏
          <span class="toSomeThings"> > </span>
        </span>
      </div>
    </div>
    <div style="width: 80%;margin: 0 auto;">
      <nut-button block shape="circle" @click="logout">退出登录</nut-button>
    </div>
  </div>
</template>

<script>
  import GLOBAL from '../../api/global_variable';
  import {Toast} from 'vant';
    export default {
        name: "MyUser",
        data(){
            return{
                userHeaderImg: '',
                nickName: '',
                userName: ''
            }
        },
        created(){
            let userId = window.sessionStorage.getItem('userId');
            this.userName = userId;
            //请求数据
            let vm = this;
            this.axios({
                url: '/user/getNameAndHImg',
                method: 'get',
                params:{
                    userId: userId
                }
            }).then(function (res) {
                if(res.data.code === 200){
                    vm.userHeaderImg = GLOBAL.httpBaseUrl + res.data.data.image;
                    vm.nickName = res.data.data.nickName;
                }else{
                    Toast.fail(res.data.msg);
                }
            })
        },
        methods:{
            toDetail(){
                this.$router.push('/user/myDetail');
            },
            toModifyPassword(){
                this.$router.push({
                    path: '/user/modifyPassword',
                    name: 'UserModifyPassword',
                    params:{
                        userName: this.userName
                    }
                });
            },
            toMyIdle(){
                this.$router.push('/user/idle');
            },
            toMyComment(){
                this.$router.push('/user/comment');
            },
            toMyHelp(){
                this.$router.push('/user/myHelp');
            },
            logout(){
                Toast({
                    type: 'loading',
                    message: '退出中...',
                    duration: 0
                });
                let vm = this;
                this.axios({
                    url: '/user/logout',
                    method: 'get',
                }).then(function(res){
                    Toast.clear();
                    if(res.data.code === 200){
                        Toast.success("退出");
                        if(GLOBAL.webSocket !== null){
                            GLOBAL.lockReconnect = true;
                            GLOBAL.webSocket.close();
                            clearTimeout(GLOBAL.webSocketTimeOutObj);
                            clearTimeout(GLOBAL.webSocketServerTimeOutObj);
                            GLOBAL.webSocket = null;
                        }
                        window.sessionStorage.clear();
                        vm.$router.push("/login");
                    }else{
                        Toast.fail(res.data.msg);
                    }
                }).catch(function(err){
                    Toast.clear();
                    Toast.fail("故障啦");
                });
                // 发送请求 成功之后清空缓存
            }
        }
    }

</script>

<style scoped>
  .myUserHeader{
    background-color: whitesmoke;
    height: 20%;
    width: 100%;
  }
  .myUserHeader .img{
    /*background-color: brown;*/
    float:left;
    height: 100%;
    /*高度100%时的垂直居中*/
    display:inline-flex;
    justify-content:center;
    align-items:center;
    margin-left: 5%;
  }
  .myUserHeader .content{
    /*background-color: skyblue;*/
    float:right;
    height: 100%;
    width: 65%;
  }
  .myUserHeader .content .nickName{
    font-size: 45px;
    font-family: SimHei;
    padding-top: 15%
  }

  .myUserHeader .content .more{
    font-size: 50px;
    float: right;
    padding-top: 5%;
    padding-right: 10%;
  }
  .myUserHeader .content .userName{
    padding-top: 10px;
    font-size: 30px;
    width: 100%;
  }
  .myUserBody{
    background-color: beige;
    height: 70%;
    width: 100%;
  }
  .myUserBody>div{
    width: 95%;
    height: 100px;
    line-height: 100px;
    font-size: 35px;
    padding-left: 5%;
    background-color: white;
  }
  .myUserBody div span i{
    font-size: 40px;
  }
  .myUserBody #password{
    background-color: #13ce66; /*得跟大背景颜色一样*/
    height: 120px;
    margin-bottom: 20px;
    padding-left: 0;
    width: 100%;
  }
  #password>div{
    position: relative;
    top: 20px;
    background-color: skyblue;
    height: 100px;
    padding-left: 5%;
  }
  .mySomeThings{
    display: inline-block;
    width: 80%;
    margin-left: 4%;
    border-bottom: solid 1px red;
  }
  .noBottomBorder{
    border-bottom: 0;
  }
  .toSomeThings{
    font-size: 35px;
    float: right;
  }

</style>
