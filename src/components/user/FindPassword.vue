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
        <div class="width70">
          <span>新&#9密&#9码</span>
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
        <div class="width70">
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
        <div class="width70">
          <span>邮&#9箱</span>
          <el-input
            v-model="email"
            @focus="emailFocus"
            @blur="emailBlur"
            placeholder="填写绑定的邮箱"
          ></el-input>
        </div>
        <div class="width70" id="code">
          <span>验&#9证&#9码</span>
          <el-input
            v-model="codeNum"
            @focus="codeFocus"
            @blur="codeBlur"
            minlength="6"
            maxlength="6"
            placeholder="填写6位验证码"
            v-bind:disabled="canInput"
          ></el-input>
          <el-button type="success" @click="getCode" v-bind:disabled="canClick">{{content}}</el-button>
        </div>
        <div class="tips">
          <span>密码必须是6-12位</span>
        </div>
      </div>
      <div>
        <el-button type="success" @click="findPassword">确&#9定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
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
            modifyPassword(){
                this.$confirm('是否确认更改密码','提示',{
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warming'
                }).then(_=>{
                    if(this.newPassword.includes(' ')){
                        this.$message.error('密码不能含有空格');
                    }else{
                        if(this.newPassword.length < 6 || this.confirmPassword.length < 6 ){
                            this.$message.error('请检查密码长度');
                        }else if(this.newPassword !== this.confirmPassword){
                            this.$message.error('两次密码输入不一致');
                        }else{
                            //请求修改密码
                        }
                    }
                }).catch(_=>{
                    //取消
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
                    this.$message.error("请输入正确的邮箱");
                }
            },
            findPassword(){
                if(!isNaN(this.codeNum) && !this.codeNum.includes(' ') && this.codeNum.length === 6){

                    if(this.newPassword.includes(' ') || this.newPassword.length < 6){
                        this.$message.error("请检查密码格式");
                    }else if(this.newPassword !== this.confirmPassword){
                        this.$message.error("两次输入的密码不一致");
                    }else{
                        //发送请求
                    }
                }else{
                    this.$message.error("验证码为6位数字");
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
    font-size: 35px;
  }
  .header .back{
    position: relative;
    left: 25px;
    top: -10px;
    font-size:60px;
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
  .main div .width70{
    width: 90%;
    height: 80px;
    line-height: 70px;
  }
  .main .el-input{
    width: 72%;
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
    margin-left: 40px;
  }
  .main /deep/ .el-input__inner{
    background-color: #13ce66;
    border: 0;
    height: 50px;
    line-height: 50px;
    font-size: 30px;
  }
  #userName{
    padding-left: 30px;
  }
  #code .el-input{
    width: 35%;
    float: none;
  }
  #code .el-button{
    width: 35%;
    float: right;
    margin-left: 0;
    margin-top: 10px;
  }
  .tips{
    margin-top: 25px;
  }
</style>


