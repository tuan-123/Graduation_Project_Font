<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像区-->
      <div class="avater_box">
        <img src="../assets/img/loginImg.jpeg" alt="">
      </div>
      <!--登录表单区域-->
      <el-form ref="form" :model="form" :rules="rules" label-width="0px" class="login_form">

        <el-form-item prop="name" style="padding-bottom: 15px">
          <el-input prefix-icon="iconfont icon-user" v-model="form.name" placeholder="请输入手机号码"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input type="password" prefix-icon="iconfont icon-3702mima" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!--
        <div align="center">
          <el-radio v-model="form.radio" label="1">普通用户</el-radio>
          <el-radio v-model="form.radio" label="2">管理员</el-radio>
        </div>
        -->

        <el-form-item class="btns">
          <el-button type="primary" @click="onSubmit('form')">登录</el-button>
          <el-button type="info" @click="resetForm('form')">重置</el-button>
        </el-form-item>
        <div class="toRegister">
          没有账号，
          <el-link type="primary" @click="toRegister()" style="font-size:17px">去注册</el-link>
        </div>

      </el-form>
    </div>
  </div>

</template>

<script>
  import {Toast} from 'vant';
    export default {
        name: "Login",
        data() {
            return {
                form: {
                    name: '',
                    password: '',
                    radio: '1'

                },
                rules: {
                    name: [
                        { required:true,message: '请输入手机号码',trigger:'blur'},
                        { pattern: /^1[3|4|5|7|8][0-9]{9}$/,min:11,max:11,message: '请输入正确的手机号码',trigger: 'blur'},
                    ],
                    password: [
                        { required:true,message: '请输入密码',trigger:'blur'},
                        { min:6,max:12,message: '长度在6到12个字符',trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            onSubmit(formName) {
                var vm = this;
                this.$refs[formName].validate((valid) =>{

                    if (valid) {
                        //alert('submit!');
                        this.axios({
                            method: 'post',
                            url: 'http://192.168.3.114:8087/springboot/user/login',
                            data: {
                                userId: vm.form.name,
                                password: vm.form.password
                            }
                        }).then(function (response) {
                            console.log(response);
                            if(response.data.code === 200){
                                //登录成功
                                //1、将登录成功之后的token保存到客户端的sessionStorage
                                //  1.1、项目除了登录之后的其他API接口，必须在登录之后才能访问
                                //  1.2、token只应在当前网站打开期间有效，所有将token保存在sessionStorage中
                                window.sessionStorage.setItem('token',response.data.token);
                                //2保存当前用户信息
                                window.sessionStorage.setItem('userId',response.data.data.userId);

                                if(response.data.data.role === 0)
                                    vm.$router.push("/Home");
                                else if(response.data.data.role === 1)
                                    vm.$router.push("/admin/index");//进入管理员界面
                            }else if(response.data.code == 1001){
                                //alert(response.data.msg);;
                                //vm.$message.error(response.data.msg);
                                Toast.fail(response.data.msg);
                            }
                        })
                    } else {
                        //this.$message.error("用户名或密码格式不正确");
                        Toast.fail("用户名或密码格式不正确");
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            toRegister(){
                this.$router.push("/register");
            }
        }
    }
</script>

<style scoped>
  .login_box{
    width: 250px;
    height: 350px;
    background-color: rgba(0,0,0,0);
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
  }
  .login_box .avater_box {
    height:100px;
    width: 100px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
  }
  .login_box .avater_box img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .login_container{
    background-image: url("../assets/img/loginBackground.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 100%;
  }

  .login_container .btns{
    display: flex;
    justify-content: flex-end;
    padding-top:20px;
  }
  .login_container .login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .toRegister{
    display: flex;
    justify-content: flex-end;
    font-size: 16px;
    margin-bottom: 5px;
  }

  /deep/ .el-input__inner{
    background: rgba(255,255,255,0.5);
  }

  /*.el-button{
    font-size: 35px;
    width: 120px;
    height: 80px;
  }*/

</style>
