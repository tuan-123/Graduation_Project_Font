<template>
  <div class="register_container">
    <div class="register_box">
      <!--注册表单区域-->
      <el-form ref="form" :model="form" :rules="rules" class="register_form" label-position="left">

        <span align="center" class="title">注册界面</span>
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
        <div class="toLogin">
          已有账号，
          <span @click="toLogin()">去登录</span>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script>
    import {Toast} from 'vant';
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
                        {pattern: /^[0-9]{6}$/,message:'请输入六位的验证码',trigger:'blur'},
                    ]
                }
            }
        },
        methods:{
            onRegister(formName){
                var vm = this;
                this.$refs[formName].validate((valid) =>{
                    if(valid){
                        Toast({
                            type: 'loading',
                            message: '注册中...',
                            duration: 0
                        });
                        setTimeout(() => {
                            Toast.clear();
                        }, 3000);
                        this.axios({
                            method: 'post',
                            url: '/user/register',
                            data: {
                                phone: vm.form.name,
                                password: vm.form.password,
                                email: vm.form.email,
                                code: vm.form.code
                            }
                        }).then(function (response) {
                            //console.log(response);
                            clearTimeout();
                            Toast.clear();
                            if(response.data.code == 200){
                                //注册成功
                                vm.$router.push("/Login");
                            }else if(response.data.code == 1001){
                                //alert(response.data.msg);;
                                vm.$message.error(response.data.msg);
                            }
                        }).catch(function (error) {
                            clearTimeout();
                            Toast.clear();
                            Toast.fail("故障啦");
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
                this.$router.push("/login");
            },
            send(){
                var vm = this;
                if(this.form.email === '' || this.form.name === ''){
                    this.$message.error("请先输入手机号码和邮箱！");
                }else{
                    Toast({
                        type: 'loading',
                        message: '发送中...',
                        duration: 0
                    });
                    this.axios({
                        url: '/user/sendEmailCode',
                        method: 'post',
                        params: {
                            email: vm.form.email,
                            phone: vm.form.name
                        }

                    }).then(function (response) {
                        //console.log(response);、
                        Toast.clear();
                        if(response.data.code === 200){
                            vm.form.isInput = false;
                            vm.form.canClick = true;
                            Toast.success("获取验证码成功");
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
                            //alert(response.data.msg);
                            vm.$message.error(response.data.msg);
                        }
                    }).catch(function (error) {
                        Toast.clear();
                        Toast.fail("故障啦");
                    })
                }
            }
        }
    }
</script>

<style scoped>
  .title{
    display: block;
    height: 80px;
    width: 100%;
    margin: 0 auto;
    padding-top: 100px;
    padding-bottom: 30px;
    font-size:60px
  }
  .register_container{
    background: url("../assets/img/registerBg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 100%;
  }
  .register_box{
    width:70%;
    height: 100%;
    border-radius: 20px;
    position: relative;
    padding-left: 15%;

  }
  .register_container .register_form .btns{
    display: flex;
    justify-content: flex-end;
  }
  .register_form{
    position: relative;
    width: 100%;
    box-sizing: border-box;
  }
  .toLogin{
    display: flex;
    justify-content: flex-end;
    font-size: 33px;
  }
  .toLogin span{
    text-decoration: underline;
    color: #1296db;
  }

  /deep/ .el-input__inner{

    background: rgba(255,255,255,0.5);

  }

  /*.btns .el-button{
    font-size: 35px;
    width: 120px;
    height: 80px;
  }*/

  /*.sendCode .el-button{
    font-size: 35px;
    width: 220px;
    height: 80px;
  }*/

</style>
