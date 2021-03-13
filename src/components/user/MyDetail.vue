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
            <!--<el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false">
              <img src="http://localhost:8087/userImg/defaultImg.jpg" class="avatar">
            </el-upload>-->
            <el-upload
              class="avatar-uploader"
              :data="data"
              :action="updateImgUrl"
              accept="image/*"
              :headers="headers"
              :limit="1"
              :show-file-list="false"
              :on-error="handleAvatarError"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
                <img v-if="userImg" :src="userImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <!--<van-uploader
              preview-size="60px"
              :max-count="1"
              accept="image/*"
              :after-read="afterRead"
              :preview-image="false"
              :show-upload="true"
            >
              <van-image
                width="60px"
                height="60px"
                :src="userImg"
              >
                <template v-slot:error>加载失败</template>
              </van-image>
            </van-uploader>-->
          </span>
        </div>
        <div @click="updateNickName">
          <span>昵&#9称</span>

          <span class="floatRight">
            {{nickName}}
            <span>&#9></span></span>
        </div>
        <div>
          <span>账&#9号</span>
          <span class="floatRight">
            {{userId}}
          </span>
        </div>
        <div>
          <span>邮&#9箱</span>
          <span class="floatRight">
            {{email}}
          </span>
        </div>
        <div @click="selectSchool">
          <span>学&#9校</span>
          <span class="floatRight" :style="{color:schoolNameColor}">
            {{schoolName}}
            <span v-show="toSelectSchool">&#9></span>
          </span>
        </div>
        <div @click="finishNum">
          <span>学&#9号</span>
          <span class="floatRight" :style="{color:numColor}">
            {{num}}
            <span v-show="toFinishNum">&#9></span>
          </span>
        </div>
        <div @click="finishFaceLogin">
          <span>人脸登录</span>
          <span class="floatRight" :style="{color:faceLoginColor}">
            {{faceLogin}}
            <span v-show="toFinishFaceLogin">&#9></span>
          </span>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
  import GLOBAL from '../../api/global_variable';
  import {Toast} from 'vant';
    export default {
        name: "MyDetail",
        data(){
            return{
                data:{
                    'userId': window.sessionStorage.getItem('userId')
                },
                headers:{
                    'Authorization': window.sessionStorage.getItem('token')
                },
                updateImgUrl: GLOBAL.httpBaseUrl + "/user/updateImage",
                nickName:'',
                userId:'',
                email: '',
                schoolName:'-1',
                schoolNameColor:'#808A87',
                toSelectSchool:true,
                num:'-1',
                numColor:'#808A87',
                toFinishNum: true,
                faceLoginColor: '#808A87',
                faceLogin: 0,
                toFinishFaceLogin: true,
                userImg: ''
            }
        },
        created(){
            let userId = window.sessionStorage.getItem('userId');
            this.userId = userId;
            let vm = this;
            //发送数据请求
            this.axios({
                url: '/user/getUserDetailInfo',
                method: 'get',
                params:{
                    userId: userId
                }
            }).then(function(res){
               if(res.data.code === 200) {
                   vm.userImg = GLOBAL.httpBaseUrl + res.data.data.image;
                   vm.nickName = res.data.data.nickName;
                   vm.schoolName = res.data.data.schoolName;
                   vm.email = res.data.data.email;
                   vm.num = res.data.data.schoolNum;
                   vm.faceLogin = res.data.data.faceLogin;

                   if(vm.schoolName === '-1'){
                       vm.schoolName = "未绑定";
                       vm.schoolNameColor = '#808A87';
                   }else{
                       vm.schoolNameColor = '#FFAAFF';
                       vm.toSelectSchool = false;
                   }
                   if(vm.num === '-1'){
                       vm.num = "未绑定";
                       vm.numColor = '#808A87';
                   }else{
                       vm.numColor = '#FFAAFF';
                       vm.toFinishNum = false;
                   }
                   if(vm.faceLogin === 0){
                       vm.faceLogin = "未开启";
                       vm.faceLoginColor = '#808A87';
                   }else if(vm.faceLogin === 1){
                       vm.faceLogin = "已开启";
                       vm.faceLoginColor = '#FFAAFF';
                       vm.toFinishFaceLogin = false;
                   }

               }else{
                   Toast.fail(res.data.msg);
               }
            });

            /*if(this.schoolName === '-1'){
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
            }*/
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
            },
            finishFaceLogin(){
                this.$router.push("/user/finishFaceLogin");
            },
            /*afterRead(file){
                //console.log(file);
                let vm = this;
                var formData = new FormData();
                formData.append("file",file);
                this.axios({
                    url: '/user/updateImage',
                    method: 'post',
                    data: formData,
                    processData: false, //默认为true。默认情况下，发送的数据将被转换为对象,这里要发送的是binary类型
                    //cache: false,
                    headers: {
                        'Content-Type': 'multipart/form-data'

                    }
                }).then(function (res) {
                    if(res.data.code === 200){
                        Toast.success("更换成功");
                    }else{
                        Toast.fail(res.data.msg);
                    }
                }).catch(function (error) {
                    Toast.fail("服务器异常");
                })
            },*/
            handleAvatarSuccess(response,file,fileList){
                console.log(response);
                //console.log(file);
                //console.log(fileList);
                if(response.code === 200){
                    this.userImg = GLOBAL.httpBaseUrl + response.data+"?timeout";
                    Toast.success("更新成功");
                }else{
                    Toast.fail(response.msg);
                }
            },
            handleAvatarError(response,file,fileList){
                Toast.fail("图片上传失败");
            },
            beforeAvatarUpload(file){
                //console.log(file);
                if(file.type.indexOf("image") === -1){
                    Toast.fail("请选择图片");
                    return false;
                }else if(file.size > 5242880){
                    Toast.fail("图片不能超过5兆");
                    return false
                }
                return true;

            },
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
    font-size: 40px;
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
    font-size: 50px;
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
    height: 100px;
    line-height: 100px;
    font-size: 35px;
    border-bottom: solid 1px #13ce66;
  }
  .main>div .img{
    height: 150px;
    line-height: 150px;
    padding-right: 5%;
  }
  .main>div .img .elAvatar{
    display: block;
    float: right;
    margin-top: 15px;
  }
  .main>div div .floatRight{
    float: right;
  }
  .avatar {
    width: 120px;
    height: 120px;
    float: right;
  }
  .img span>div{
    display: block;
    float: right;
    width: 90px;
    height: 90px;
    border: 0;
  }


</style>
