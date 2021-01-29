<template>
  <div class="container">
    <div class="header">
      <span class="back" @click="toBack"> < </span>
        个人信息
    </div>
    <div class="main">
      <div>
        <!--<el-avatar src="http://localhost:8087/userImg/defaultImg.jpg" :size="60" shape="square"></el-avatar>-->
        <div class="img">
          <span>头&#9像</span>
          <span class="elAvatar">
            <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false">
              <img src="http://localhost:8087/userImg/defaultImg.jpg" class="avatar">
            </el-upload>
          </span>
        </div>
        <div>
          <span>昵&#9称</span>

          <span class="floatRight">
            {{nickName}}
            <span @click="updateNickName">&#9></span></span>
        </div>
        <div>
          <span>账&#9号</span>
          <span class="floatRight">
            {{userId}}
          </span>
        </div>
        <div>
          <span>学&#9校</span>
          <span class="floatRight" :style="{color:schoolNameColor}">
            {{schoolName}}
            <span v-show="toSelectSchool" @click="selectSchool">&#9></span>
          </span>
        </div>
        <div>
          <span>学&#9号</span>
          <span class="floatRight" :style="{color:numColor}">
            {{num}}
            <span v-show="toFinishNum" @click="finishNum">&#9></span>
          </span>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
  import GLOBAL from '../../api/global_variable';
    export default {
        name: "MyDetail",
        data(){
            return{
                nickName:'哈哈哈哈哈',
                userId:123,
                schoolName:'-1',
                schoolNameColor:'#808A87',
                toSelectSchool:true,
                num:'-1',
                numColor:'#808A87',
                toFinishNum: true,

            }
        },
        created(){
            //发送数据请求


            if(this.schoolName === '-1'){
                this.schoolName = "未绑定";
                this.schoolNameColor = '#808A87';
            }else{
                this.schoolNameColor = '#FFAAFF';
                this.toSelectSchool = false;
            }
            if(this.num === '-1'){
                this.num = "未绑定";
                this.numColor = '#808A87';
            }else{
                this.numColor = '#FFAAFF';
                this.toFinishNum = false;
            }
        },
        methods:{
            toBack(){
                this.$router.push({
                    path: '/main/myUser',
                    name: 'MainMyUser',
                    params: {
                        currentIndex: 2
                    }
                });
            },
            // 携带参数跳转页面   注意 必须要用name  而且在router的js文件也要配置name
            updateNickName(){
                this.$router.push({
                    path: '/user/updateNickName',
                    name: 'UserUpdateNickName',
                    params:{
                        nickName: this.nickName
                    }
                });

            },
            selectSchool(){
                this.$router.push("/user/finishSchool");
            },
            finishNum(){
                this.$router.push("/user/finishNum");
            }
        }
    }
</script>

<style scoped>
  .container{
    background-color: #5daf34;
    width: 100%;
    height: 100%;
  }
  .header{
    background-color: red;
    height: 5%;
    width: 100%;
    font-size: 35px;
    font-family: SimHei;
    padding-top: 5%;
    font-weight: bold;
    text-align: center;
  }
  .main{
    background-color: #3a8ee6;
    width: 100%;
    height: 92%;
  }
  .header .back{
    position: relative;
    left: 25px;
    top: -10px;
    font-size:60px;
    width: 5px;
    float:left;
  }
  .main>div{
    background-color: #795da3;
    position: relative;
    left: 4%;
    width: 92%;
    height: 100%;

  }
  .main>div div{
    background-color: #9a6e3a;
    height: 90px;
    line-height: 90px;
    font-size: 30px;
    border-bottom: solid 1px #13ce66;
  }
  .main>div .img{
    height: 150px;
    line-height: 150px;
  }
  .main>div .img .elAvatar{
    display: block;
    float: right;
    margin-top: 10px;
  }
  .main>div div .floatRight{
    float: right;
  }
  .avatar {
    width: 130px;
    height: 130px;
    float: right;
  }
  .img span>div{
    display: block;
    float: right;
    width: 130px;
    height: 130px;
    border: 0;
  }


</style>
