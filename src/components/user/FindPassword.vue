<template>
  <div class="container">
    <div class="header">
      <span class="back" @click="toBack"> < </span>
      找回密码
    </div>
    <div class="main">
      <div>
        <div class="userName">
          <span>账号</span>
          <span id="userName">{{userName}}</span>
        </div>

        <van-form @submit="onSubmit">
          <van-field class="ml4"
                     v-model="newPassword"
                     type="password"
                     name="newPassword"
                     label="新密码"
                     placeholder="新密码"
                     :rules="npwRules"
                     clearable
          />
          <van-field class="ml4"
                     v-model="confirmPassword"
                     type="password"
                     name="confirmPassword"
                     label="确认密码"
                     placeholder="再次输入密码"
                     :rules="conPwRules"
                     clearable
          />
          <van-field class="ml4"
                     v-model="email"
                     name="email"
                     label="邮箱"
                     placeholder="请输入绑定邮箱"
                     :rules="emailRules"
                     clearable
          />
          <van-field class="ml4"
                     v-model="code"
                     name="code"
                     label="验证码"
                     placeholder="6位验证码"
                     :rules="codeRules"
                     :disabled="canInput"
          >
            <template>
              <van-button
                round
                type="info"
                slot="right-icon"
                size="small" native-type="button"
                plain
                @click="sendCode"
                :disabled="canClick"
              >{{sendCodeText}}</van-button>
            </template>
          </van-field>
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>


      </div>

    </div>
  </div>
</template>

<script>
    import {Dialog} from 'vant';
    import {Toast} from 'vant';
    let emailRule = /^[A-Za-z\d]+[A-Za-z\d\-_\.]*@([A-Za-z\d]+[A-Za-z\d\-]*\.)+[A-Za-z]{2,4}$/;

    export default {
        name: 'FindPassword',
        data(){
            return {
                userName: '',
                confirmPassword: '',
                newPassword: '',
                email: '',
                code: '',
                canInput: true,
                sendCodeText: '发送验证码',
                canClick: false,
                totalTime: 60,
                inputBorderBottomColor:{
                    focus:'blue',
                    blur:'red'
                },
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
                    },
                ],
                emailRules:[
                    {
                        required: true, message:'请输入邮箱',trigger: 'onBlur'
                    },
                    {
                        validator: value => {
                            return emailRule.test(value);
                        },
                        message: "邮箱格式错误",
                        trigger: 'onBlur'
                    },
                ],
                codeRules:[
                    {
                        required:true,message:'请输入验证码',trigger: 'onBlur'
                    },
                    {
                        validator: value => {
                            return /^[0-9]{6}$/.test(value);
                        },
                        message: "6位验证码",
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
                    path: '/user/modifyPassword',
                    name: 'UserModifyPassword',
                    params:{
                        userName: this.userName
                    }
                });
            },
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
                        Toast({
                            type: 'loading',
                            message: '提交中...',
                            duration: 0
                        });
                        setTimeout(() => {
                            Toast.clear();
                        }, 3000);
                        this.axios({
                            url: '/user/findPassword',
                            method: 'post',
                            data:{
                                userId: vm.userName,
                                password: value.confirmPassword,
                                email: value.email,
                                code: value.code
                            }
                        }).then(function(res){
                            clearTimeout();
                            Toast.clear();
                            if(res.data.code === 200){
                                Toast.success("修改成功，请重新登录");
                                window.sessionStorage.clear();
                                vm.$router.push("/login");
                            }else{
                                Toast.fail(res.data.msg);
                            }
                        }).catch(function (error) {
                            clearTimeout();
                            Toast.clear();
                            Toast.fail("故障啦");
                        })
                    });

                }).catch(()=>{

                });

            },
            sendCode(){
                var vm = this;
                if(this.email === ''){
                    Toast.fail('请先输入邮箱');
                }else if(!emailRule.test(this.email)){
                    Toast.fail('请输入正确的邮箱');
                }else{
                    //发送成功后将canInput = false；
                    Toast({
                        type: 'loading',
                        message: '发送中...',
                        duration: 0
                    });
                    setTimeout(() => {
                        Toast.clear();
                    }, 3000);
                    this.axios({
                        url: '/user/findPasswordSendCode',
                        method: 'post',
                        params:{
                            userId: vm.userName,
                            email: vm.email
                        },
                    }).then(function (res) {
                        clearTimeout();
                        Toast.clear();
                        if(res.data.code === 200){
                            //成功
                            Toast.success("发送成功");
                            vm.canInput = false;
                            vm.canClick = true;
                            vm.sendCodeText = vm.totalTime + "s重新发送";
                            let clock = window.setInterval(() =>{
                                vm.totalTime--;
                                vm.sendCodeText = vm.totalTime + "s重新发送";
                                if(vm.totalTime < 0){
                                    window.clearInterval(clock);
                                    vm.sendCodeText = "重新发送验证码";
                                    vm.totalTime = 60;
                                    vm.canClick = false;
                                }
                            },1000);
                        }else{
                            Toast.fail(res.data.msg);
                        }
                    }).catch(function(error){
                        clearTimeout();
                        Toast.clear();
                        Toast.fail("故障啦");
                    });
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
    background-color: #3a8ee6;
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
    border-bottom: solid 1px mediumvioletred;
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
  #userName{
    padding-left: 30px;
  }

</style>

