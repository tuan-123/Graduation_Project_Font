<template>
  <div class="container">
    <div class="header">
      <span class="back" @click="toBack"> < </span>
      找回密码
    </div>
    <div class="main">
      <div>
        <div class="userName">
          <span>账&#9号</span>
          <span id="userName">{{userName}}</span>
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
        <div class="width50">
          <span>邮&#9箱</span>
          <el-input
            v-model="email"
            @focus="emailFocus"
            @blur="emailBlur"
            placeholder="填写绑定的邮箱"
          ></el-input>
        </div>
        <div class="width50" id="code">
          <span>验证码</span>
          <el-input
            v-model="codeNum"
            @focus="codeFocus"
            @blur="codeBlur"
            minlength="6"
            maxlength="6"
            placeholder="6位验证码"
            v-bind:disabled="canInput"
          ></el-input>
          <el-button type="success" @click="getCode" v-bind:disabled="canClick">{{content}}</el-button>
        </div>
        <div class="tips">
          <span>密码必须是6-12位</span>
        </div>
      </div>
      <div class="btn">
        <el-button type="success" @click="findPassword">确&#9定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
    import {Toast} from 'vant';
    import {Dialog} from 'vant';
    var currentPasswordElement = document.getElementsByClassName("el-input");
    //正则校验邮箱规则
    //var emailRule = /^[A-Za-z\d]+[A-Za-z\d\-_\.]*@([A-Za-z\d]+[A-Za-z\d\-]*\\.)+[A-Za-z]{2,4}$/;
    var emailRule = /^[A-Za-z\d]+[A-Za-z\d\-_\.]*@([A-Za-z\d]+[A-Za-z\d\-]*\.)+[A-Za-z]{2,4}$/;
    //var emailRule = new RegExp(/^[A-Za-z\d]+[A-Za-z\d\-_\.]*@([A-Za-z\d]+[A-Za-z\d\-]*\.)+[A-Za-z]{2,4}$/);
    export default {
        name: 'FindPassword',
        data(){
            return {
                userName: '',
                newPassword: '',
                confirmPassword: '',
                email: '',
                codeNum:'',
                canClick: false,
                content:'获取验证码',
                totalTime: 60,
                canInput:true,
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
                    path: '/user/modifyPassword',
                    name: 'UserModifyPassword',
                    params: {
                        userName: this.userName
                    }
                });
            },
            newPasswordFocus(){
                currentPasswordElement[0].style.borderBottomColor = this.inputBorderBottomColor.focus;
            },
            newPasswordBlur(){
                currentPasswordElement[0].style.borderBottomColor = this.inputBorderBottomColor.blur;
            },
            confirmPasswordFocus(){
                currentPasswordElement[1].style.borderBottomColor = this.inputBorderBottomColor.focus;
            },
            confirmPasswordBlur(){
                currentPasswordElement[1].style.borderBottomColor = this.inputBorderBottomColor.blur;
            },
            emailFocus(){
                //console.log(currentPasswordElement);
                currentPasswordElement[2].style.borderBottomColor = this.inputBorderBottomColor.focus;
            },
            emailBlur(){
                currentPasswordElement[2].style.borderBottomColor = this.inputBorderBottomColor.blur;
            },
            codeFocus(){
                currentPasswordElement[3].style.borderBottomColor = this.inputBorderBottomColor.focus;
            },
            codeBlur(){
                currentPasswordElement[3].style.borderBottomColor = this.inputBorderBottomColor.blur;
            },
            getCode(){
              //先验证邮箱是否正确
              //后端判断邮箱和账号是否匹配，若匹配就发送验证码，若不匹配返回该邮箱为非账号绑定邮箱
                //test() 是 正则校验
                //console.log(this.email);
                //console.log(emailRule);
                var vm = this;
                if(emailRule.test(this.email)){
                    //请求接口
                    vm.canInput = false;
                    vm.canClick = true;
                    vm.content = vm.totalTime + "s重新发送";
                    let clock = window.setInterval(() =>{
                        vm.totalTime--;
                        vm.content = vm.totalTime + "s重新发送";
                        if(vm.totalTime < 0){
                            window.clearInterval(clock);
                            vm.content = "获取验证码";
                            vm.totalTime = 60;
                            vm.canClick = false;
                        }
                    },1000);
                }else{
                    Toast.fail("请输入正确的邮箱");
                }
            },
            findPassword(){
                if(!isNaN(this.codeNum) && !this.codeNum.includes(' ') && this.codeNum.length === 6){
                    if(this.newPassword.includes(' ') || this.newPassword.length < 6){
                        Toast.fail("请检查密码格式");
                    }else if(this.newPassword !== this.confirmPassword){
                        Toast.fail("两次输入的密码不一致");
                    }else{
                        //发送请求
                        Dialog.confirm({
                            title: '提示',
                            message: '是否更改密码'
                        }).then(()=>{
                            //确认
                        }).catch(()=>{
                            //取消
                        });
                    }
                }else{
                    Toast.fail("验证码为6位数字");
                }
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
    font-size: 30px;
    width: 5px;
    float:left;
    margin-right: 30px;
  }
  .main .el-button{
    width: 30%;
    height: 60px;
    font-size: 36px;
    margin-left: 35%;
    margin-top: 80px;
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
    font-size: 18px;
  }
  #userName{
    padding-left: 30px;
  }
  #code .el-input{
    width: 33%;
    float: none;
  }
  #code .el-button{
    float: right;
    width: 38%;
    height: auto;
    margin-left: 0;
    margin-top: 10px;
    font-size: 20px;
  }
  .main .el-button{
    margin-top: 30px;
    height: auto;
    font-size: 22px;
  }
  .main .btn{
    width: 100%;
  }
  .tips{
    font-size: 18px;
    margin-top: 25px;
  }
</style>


