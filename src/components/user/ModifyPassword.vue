<template>
  <div class="container">
    <div class="header">
      <span class="back" @click="toBack">
        <van-icon name="arrow-left" size="25"/>
      </span>
      修改密码
    </div>
    <div class="main">
      <div>
        <div class="userName">
          <span>账号</span>
          <span id="userName">{{userName}}</span>
        </div>
        <!--<div class="width50">
          <span>原密码</span>
          <el-input
            v-model="currentPassword"
            type="password"
            :show-password="true"
            @focus="currentPasswordFocus"
            @blur="currentPasswordBlur"
            minlength="6"
            maxlength="12"
            placeholder="填写原密码"
          ></el-input>
        </div>
        <div class="width50">
          <span>新密码</span>
          <el-input
            v-model="newPassword"
            type="password"
            :show-password="true"
            @focus="newPasswordFocus"
            @blur="newPasswordBlur"
            minlength="6"
            maxlength="12"
            placeholder="填写新密码"
          ></el-input>
        </div>
        <div class="width50">
          <span>确认密码</span>
          <el-input
            v-model="confirmPassword"
            type="password"
            :show-password="true"
            @focus="confirmPasswordFocus"
            @blur="confirmPasswordBlur"
            minlength="6"
            maxlength="12"
            placeholder="再次填写确认"
          ></el-input>
        </div>-->

        <!--<div class="tips">
          <span>密码必须是6-12位</span>
          <span id="forgottenPassword" @click="findPassword">忘记密码?</span>
        </div>-->

        <van-form @submit="onSubmit">
          <van-field class="ml4"
            v-model="currentPassword"
            name="currentPassword"
            type="password"
            label="原密码"
            placeholder="原密码"
            :rules="cpwRules"
          />
          <van-field class="ml4"
            v-model="newPassword"
            type="password"
            name="newPassword"
            label="新密码"
            placeholder="新密码"
            :rules="npwRules"
          />
          <van-field class="ml4"
           v-model="confirmPassword"
           type="password"
           name="confirmPassword"
           label="确认密码"
           placeholder="再次输入密码"
           :rules="conPwRules"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>

      </div>
      <!--<div class="btn">
        &lt;!&ndash;<el-button type="success" @click="modifyPassword">更&#9改</el-button>&ndash;&gt;
        <van-button type="primary" text="更改" @click="modifyPassword"/>
      </div>-->
      <div id="forgottenPassword">
        <span @click="findPassword">忘记密码?</span>
      </div>

    </div>
  </div>
</template>

<script>
    import {Dialog} from 'vant';
    import {Toast} from 'vant';
    import GLOBAL from "../../api/global_variable";

    /*var currentPasswordElement = document.getElementsByClassName("el-input");*/
  export default {
      name: 'ModifyPassword',
      data(){
          return {
              userName: '',
              currentPassword: '',
              confirmPassword: '',
              newPassword: '',
              inputBorderBottomColor:{
                  focus:'blue',
                  blur:'red'
              },
              cpwRules:[
                  {
                      required:true,message:'请填写原密码',trigger: 'onBlur'
                  },
                  {
                      validator: value => {
                          return /^[\w]{6,12}$/.test(value);
                      },
                      message: "请输入6-12位密码",
                      trigger: 'onBlur'
                  }
              ],
              npwRules:[
                  {
                      required: true, message:'请填写新密码',trigger: 'onBlur'
                  },
                  {
                      validator: value => {
                          return /^[\w]{6,12}$/.test(value);
                      },
                      message: "请输入6-12位密码",
                      trigger: 'onBlur'
                  }
              ],
              conPwRules:[
                  {
                      required: true, message:'请再次输入密码',trigger: 'onBlur'
                  },
                  {
                      validator: value => {
                          return /^[\w]{6,12}$/.test(value);
                      },
                      message: "请输入6-12位密码",
                      trigger: 'onBlur'
                  },
                  {
                      validator: value => {
                          return value === this.newPassword;
                      },
                      message: "两次密码输入不一致",
                      trigger: 'onBlur'
                  }
              ]
          }
      },
      created() {
          //this.userName = this.$route.params.userName;
          this.userName = window.sessionStorage.getItem('userId');
      },
      methods:{
          toBack(){
              this.$router.push({
                  path: '/main/myUser',
                  name: 'MainMyUser',
                  params:{
                      currentIndex: 2
                  }
              });
          },
          /*modifyPassword(){
              if(this.currentPassword.includes(' ') || this.newPassword.includes(' ')){
                  //this.$message.error('密码不能含有空格');
                  Toast.fail("密码不能含有空格");
              }else{
                  if(this.currentPassword.length < 6 || this.newPassword.length < 6 || this.confirmPassword.length < 6 ){
                      Toast.fail('请检查密码长度');
                  }else if(this.newPassword !== this.confirmPassword){
                      Toast.fail('两次密码输入不一致');
                  }else{
                      //请求修改密码
                      Dialog.confirm({
                          title: '提示',
                          message: "是否确认更改密码"
                      }).then(()=> {
                          //确定
                      }).catch(()=>{

                      });
                  }
              }
              /!*this.$confirm('是否确认更改密码','提示',{
                  confirmButtonText: '确认',
                  cancelButtonText: '取消',
                  type: 'warming'
              }).then(_=>{
                  if(this.currentPassword.includes(' ') || this.newPassword.includes(' ')){
                      //this.$message.error('密码不能含有空格');
                      Toast.fail("密码不能含有空格");
                  }else{
                      if(this.currentPassword.length < 6 || this.newPassword.length < 6 || this.confirmPassword.length < 6 ){
                          this.$message.error('请检查密码长度');
                      }else if(this.newPassword !== this.confirmPassword){
                          this.$message.error('两次密码输入不一致');
                      }else{
                          //请求修改密码
                      }
                  }
              }).catch(_=>{
                  //取消
              });*!/
          },*/
          /*currentPasswordFocus(){
              //console.log(currentPasswordElement);
              currentPasswordElement[0].style.borderBottomColor = this.inputBorderBottomColor.focus;
          },
          currentPasswordBlur(){
              currentPasswordElement[0].style.borderBottomColor = this.inputBorderBottomColor.blur;
          },
          newPasswordFocus(){
              currentPasswordElement[1].style.borderBottomColor = this.inputBorderBottomColor.focus;
          },
          newPasswordBlur(){
              currentPasswordElement[1].style.borderBottomColor = this.inputBorderBottomColor.blur;
          },
          confirmPasswordFocus(){
              currentPasswordElement[2].style.borderBottomColor = this.inputBorderBottomColor.focus;
          },
          confirmPasswordBlur(){
              currentPasswordElement[2].style.borderBottomColor = this.inputBorderBottomColor.blur;
          },*/
          findPassword(){
              this.$router.push({
                  path: '/user/findPassword',
                  name: 'UserFindPassword',
                  params: {
                      userName: this.userName
                  }
              });
          },
          onSubmit(value){
              let vm = this;
              Dialog.confirm({
                  title: '提示',
                  message: '是否确认更改密码'
              }).then(()=>{
                  //确认
                  return new Promise((resolve) => {
                      //Toast.loading('提交中...');
                      Toast({
                          type: 'loading',
                          message: '提交中...',
                          duration: 0
                      });
                      this.axios({
                          url: '/user/updatePassword',
                          method: 'post',
                          data:{
                              userId: window.sessionStorage.getItem('userId'),
                              oldPassword: value.currentPassword,
                              newPassword: value.newPassword
                          }
                      }).then(function (res) {
                          Toast.clear();
                          if(res.data.code === 200){
                              Toast.success("修改成功，请重新登录");
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
                      }).catch(function (error) {
                          Toast.clear();
                          Toast.fail("故障啦");
                      })
                  });
              }).catch(()=>{

              });

          }
      }


  }
</script>

<style scoped>
  .container{
    /*background-color: #5daf34;*/
    width: 100%;
    height: 100%;
  }
  .header{
    background-color: #ffffff;
    /*height: 5%;*/
    height: 70px;
    width: 100%;
    font-size: 40px;
    font-family: SimHei;
    padding-top: 5%;
    font-weight: bold;
    text-align: center;
  }
  .main{
    background-color: #ededed;
    width: 100%;
    height: 92%;
    font-size: 35px;
  }
  .header .back{
    position: relative;
    left: 25px;
    top: -10px;
    font-size: 50px;
    width: 5px;
    float:left;
  }
  /*.main .el-button{
    font-size: 22px;
  }*/
  /*.main .btn{
    margin-top: 30px;
    width: 100%;
    text-align: center;
  }*/
  /*.main .btn{
    display: block;
    width: 100%;
    text-align: center;
    padding-top: 10%;
  }*/
  /*.main div .width50{
    width: 90%;
    height: 50px;
    line-height: 50px;
    margin-bottom: 5px;
  }
  .main .el-input{
    width: 70%;
    border: 0;
    border-bottom: solid 2px red;
    float: right;

  }*/
  .main .userName{
    width: 90%;
    border-bottom: solid 1px greenyellow;
    padding-top: 50px;
    margin-bottom: 20px;
    margin-left: 4%;
  }
  .main .ml4{
    padding-left: 4%;
  }
  .main /deep/ .el-input__inner{
    background-color: #13ce66;
    border: 0;
    height: 30px;
    line-height: 30px;
    font-size: 20px;
  }
  #forgottenPassword {
    color: blue;
    text-decoration: underline;
    width: 100%;
    text-align: center;
    padding-top: 10%;
  }
  #userName{
    padding-left: 30px;
  }
  /*.tips{
    font-size: 30px;
    margin-top: 25px;
  }*/

</style>

