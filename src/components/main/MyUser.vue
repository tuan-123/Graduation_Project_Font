<template>
  <div style="height: 100%">
    <div class="myUserHeader">
      <div class="img">
        <el-avatar
          :size="100"
          :src="userHeaderImg">
        </el-avatar>

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
        <div>
          <span>
          <i class="icon iconfont" style="color:#1296db;">&#xe604;</i>
        </span>
          <span id="passwordText" class="mySomeThings noBottomBorder">
            修改密码
            <span class="toSomeThings" @click="toModifyPassword"> > </span>
          </span>
        </div>
      </div>
      <div>
        <span>
          <i class="icon iconfont" style="color:#1afa29;">&#xe605;</i>
        </span>
        <span class="mySomeThings">
          我的闲置
          <span class="toSomeThings"> > </span>
        </span>

      </div>
      <div>
        <span>
          <i class="icon iconfont" style="color:#1296db">&#xe609;</i>
        </span>
        <span class="mySomeThings">
          我的提问
          <span class="toSomeThings"> > </span>
        </span>
      </div>
      <div>
        <span>
          <i class="icon iconfont" style="color:#f3ca7e">&#xe606;</i>
        </span>
        <span class="mySomeThings noBottomBorder">
          我的收藏
          <span class="toSomeThings"> > </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import GLOBAL from '../../api/global_variable'
    export default {
        name: "MyUser",
        data(){
            return{
                userHeaderImg: GLOBAL.httpBaseUrl + "/userImg/defaultImg.jpg",
                nickName: '哈哈哈哈',
                userName: '15362941466'
            }
        },
        created(){
            //请求数据
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
    width: 35%;
  }
  .myUserHeader .img .el-avatar{
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
  }
  .myUserHeader .content{
    /*background-color: skyblue;*/
    float:right;
    height: 100%;
    width: 65%;
  }
  .myUserHeader .content .nickName{
    font-size: 30px;
    font-family: SimHei;
    padding-top: 30px;
  }

  .myUserHeader .content .more{
    font-size: 40px;
    float: right;
    padding-top: 10%;
    padding-right: 5%;
  }
  .myUserHeader .content .userName{
    padding-top: 10px;
    font-size: 20px;
    width: 100%;
  }
  .myUserBody{
    background-color: beige;
    height: 80%;
    width: 100%;
  }
  .myUserBody>div{
    width: 95%;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    padding-left: 5%;
    background-color: white;
  }
  .myUserBody div span i{
    font-size: 25px;
  }
  .myUserBody #password{
    background-color: #13ce66; /*得跟大背景颜色一样*/
    height: 70px;
    margin-bottom: 20px;
    padding-left: 0;
    width: 100%;
  }
  #password>div{
    position: relative;
    top: 20px;
    background-color: skyblue;
    height: 50px;
    padding-left: 5%;
  }
  .mySomeThings{
    display: inline-block;
    width: 85%;
    margin-left: 4%;
    border-bottom: solid 1px red;
  }
  .noBottomBorder{
    border-bottom: 0;
  }
  .toSomeThings{
    font-size: 25px;
    float: right;
  }

</style>
