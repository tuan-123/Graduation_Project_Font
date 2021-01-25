<template>
  <div class="register_container">
    <div class="register_box">
      <!--注册表单区域-->
      <el-form ref="form" :model="form" :rules="rules" class="register_form" label-position="left">

        <h3 align="center" style="padding-bottom: 20px; font-size:27px">注册页面</h3>
        <el-form-item prop="name" >
          <el-input nprefix-ico="iconfont icon-user" v-model="form.name" placeholder="请输入手机号码"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input type="password" prefix-icon="iconfont icon-3702mima" v-model="form.password" placeholder="请输入密码" ></el-input>
        </el-form-item>

        <el-form-item prop="passwordCheck" >
          <el-input type="password" prefix-icon="iconfont icon-3702mima" v-model="form.passwordCheck" placeholder="请再次输入密码" ></el-input>
        </el-form-item>

        <el-form-item prop="email">
          <el-input prefix-icon="el-icon-s-comment" v-model="form.email" placeholder="请输入邮箱" ></el-input>
        </el-form-item>

        <el-form-item prop="code" >
          <el-input v-bind:disabled="form.isInput" prefix-icon="el-icon-circle-check" v-model="form.code" placeholder="请输入六位验证码" ></el-input>
        </el-form-item>
        <el-form-item class="sendCode">
          <el-button type="primary" @click="send()" v-bind:disabled="form.canClick">{{form.content}}</el-button>
        </el-form-item>


        <el-form-item class="btns">
          <el-button type="primary" @click="onRegister('form')">注册</el-button>
          <el-button type="info" @click="resetForm('form')">重置</el-button>
        </el-form-item>
        <div class="toLogin" style="font-size: 20px">
          已有账号，
          <el-link type="primary" @click="toLogin()" style="font-size:17px">去登录</el-link>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            var checkPassword = (rule,value,callback) =>{
                if(value !== this.form.password){
                    callback(new Error("两次输入密码不一致！"));
                }else{
                    callback();
                }
            };
            return{
                form: {
                    name: '',
                    password: '',
                    email: '',
                    code: '',
                    isInput: true,
                    content:'发送验证码',
                    totalTime: 60,
                    canClick: false

                },
                rules:{
                    name:[
                        { required:true,message: '请输入手机号码',trigger:'blur'},
                        { pattern: /^1[3|4|5|7|8][0-9]{9}$/,min:11,max:11,message: '请输入正确的手机号码',trigger: 'blur'},
                    ],
                    password: [
                        { required:true,message: '请输入密码',trigger:'blur'},
                        { min:6,max:12,message: '长度在6到12个字符',trigger: 'blur'}
                    ],
                    passwordCheck:[
                        {required:true,message:'请再次输入密码',trigger:'blur'},
                        { min:6,max:12,message: '长度在6到12个字符',trigger: 'blur'},
                        {validator: checkPassword,trigger: 'blur'}
                    ],
                    email:[
                        {required:true,message:'请输入邮箱',trigger:'blur'},
                        {pattern: /^[A-Za-z\d]+[A-Za-z\d\-_\.]*@([A-Za-z\d]+[A-Za-z\d\-]*\.)+[A-Za-z]{2,4}$/,message: '请输入正确的邮箱',trigger: 'blur'}
                    ],
                    code:[
                        {required:true,message:'请输入邮箱',trigger:'blur'},
                        {min:6,max:6,message:'请输入六位的验证码',trigger:'blur'},
                    ]
                }
            }
        },
        methods:{
            onRegister(formName){
                var vm = this;
                this.$refs[formName].validate((valid) =>{
                    if(valid){
                        this.axios({
                            method: 'post',
                            url: 'http://localhost:8081/user/register',
                            data: {
                                userId: vm.form.name,
                                password: vm.form.password,
                                email: vm.form.email,
                                code: vm.form.code
                            }
                        }).then(function (response) {
                            //console.log(response);
                            if(response.data.code == 200){
                                //注册成功
                                vm.$router.push("/Login");
                            }else if(response.data.code == 1001){
                                //alert(response.data.msg);;
                                vm.$message.error(response.data.msg);
                            }
                        })
                    }else{
                        this.$message.error("请重新检查哦！");
                        return false;
                    }
                });

            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            toLogin(){
                this.$router.push("/Login");
            },
            send(){
                var vm = this;
                if(this.form.email === '' || this.form.name === ''){
                    this.$message.error("请先输入手机号码和邮箱！");
                }else{
                    this.axios({
                        url: 'http://localhost:8081/user/sendCode',
                        method: 'get',

                        params: {
                            email: vm.form.email,
                            userId: vm.form.name
                        }

                    }).then(function (response) {
                        //console.log(response);
                        if(response.data.code == 200){
                            vm.form.isInput = false;
                            vm.form.canClick = true;
                            vm.form.content = vm.form.totalTime + "s重新发送";
                            let clock = window.setInterval(() =>{
                                vm.form.totalTime--;
                                vm.form.content = vm.form.totalTime + "s重新发送";
                                if(vm.form.totalTime < 0){
                                    window.clearInterval(clock);
                                    vm.form.content = "重新发送验证码";
                                    vm.form.totalTime = 60;
                                    vm.form.canClick = false;
                                }
                            },1000);
                        }else if(response.data.code == 1001){
                            //alert(response.data.msg);;
                            vm.$message.error(response.data.msg);
                        }
                    });
                }
            }
        }
    }
</script>

<style scoped>
  .register_container{
    background: url("../assets/img/registerBackgroundImg.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 100%;
  }
  .register_box{
    width: 500px;
    height: 1200px;
    border-radius: 20px;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
  }
  .register_container .register_form .btns{
    display: flex;
    justify-content: flex-end;
  }
  .register_form{
    position: absolute;
    top: 5%;
    width: 100%;
    padding: 0 40px;
    box-sizing: border-box;
  }
  .toLogin{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 5px;
  }

  /deep/ .el-input__inner{
    margin-top: 10px;
    background: rgba(0,255,255,0.5);
    font-size: 25px;
    height: 67px;
  }

  .btns .el-button{
    font-size: 35px;
    width: 120px;
    height: 80px;
  }

  .sendCode .el-button{
    font-size: 35px;
    width: 220px;
    height: 80px;
  }

</style>
