<template>
  <div class="container">
    <div class="header">
      <span class="back" @click="toBack"> < </span>
      修改密码
    </div>
    <div class="main">
      <div>
        <div class="userName">
          <span>账号</span>
          <span id="userName">{{userName}}</span>
        </div>
        <div class="width50">
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
        </div>
        <div class="tips">
          <span>密码必须是6-12位</span>
          <span id="forgottenPassword" @click="findPassword">忘记密码?</span>
        </div>
      </div>
      <div class="btn">
        <el-button type="success" @click="modifyPassword">更&#9改</el-button>
      </div>
    </div>
  </div>
</template>

<script>
    import {Dialog} from 'vant';
    import {Toast} from 'vant';

    var currentPasswordElement = document.getElementsByClassName("el-input");
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
              }
          }
      },
      created() {
          this.userName = this.$route.params.userName;
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
          modifyPassword(){
              Dialog.confirm({
                  title: '提示',
                  message: "是否确认更改密码"
              }).then(()=>{
                  //确定
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
                      }
                  }
              }).catch(()=>{
                 //取消
              });
              /*this.$confirm('是否确认更改密码','提示',{
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
              });*/
          },
          currentPasswordFocus(){
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
          },
          findPassword(){
              this.$router.push({
                  path: '/user/findPassword',
                  name: 'UserFindPassword',
                  params: {
                      userName: this.userName
                  }
              });
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
    font-size: 26px;
    font-family: SimHei;
    padding-top: 5%;
    font-weight: bold;
    text-align: center;
  }
  .main{
    background-color: #3a8ee6;
    width: 100%;
    height: 92%;
    font-size: 22px;
  }
  .header .back{
    position: relative;
    left: 25px;
    top: -10px;
    font-size:30px;
    width: 5px;
    float:left;
    margin-right: 30px;
  }
  .main .el-button{
    font-size: 22px;
  }
  .main .btn{
    margin-top: 30px;
    width: 100%;
    text-align: center;
  }
  .main div .width50{
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

  }
  .main .userName{
    width: 90%;
    border-bottom: solid 1px mediumvioletred;
    padding-top: 50px;
    margin-bottom: 20px;
  }
  .main :first-child div{
    margin-left: 20px;
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
    margin-left: 15px;
  }
  #userName{
    padding-left: 30px;
  }
  .tips{
    font-size: 18px;
    margin-top: 25px;
  }
</style>

