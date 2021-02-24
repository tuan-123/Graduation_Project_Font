<template>
  <div class="container">
    <div class="header">
      <span class="back" @click="toBack"> < </span>
      更改昵称
      <span class="btn">
        <!--<input type="button" value="保存"/>-->
        <!--<el-button type="success" @click="saveNickName">保存</el-button>-->

      </span>
    </div>
    <div class="main">
      <!--<el-input
        @focus="focusMethod"
        @blur="blurMethod"
        type="text"
        maxlength="12"
        :disabled="false"
        v-model="nickName"
      ></el-input>-->
      <div class="nickNameInput">
        <van-cell-group>
          <van-field
            v-model="nickName"
            placeholder="请输入昵称"
            maxlength="12"
            @focus="focusMethod"
            @blur="blurMethod"
            @border="false"
          />
        </van-cell-group>
      </div>
      <span>好名字可以让你的朋友更容易记住你</span>
      <div class="saveBtn" @click="saveNickName">
        <van-button type="primary" text="保存"/>
      </div>
    </div>
  </div>
</template>

<script>
   import {Toast} from 'vant';
   import {Dialog} from 'vant';
    export default {
        name: "updateNickName",
        data(){
            return{
                nickName:''
            }
        },
        created(){
            this.nickName = this.$route.params.nickName;
        },
        methods:{
            toBack(){
                this.$router.push("/user/myDetail");
            },
            saveNickName(){
                let vm = this;
                //发送请求
                if(this.nickName === '') {
                    Toast.fail("先输入昵称嘿");
                }else if(this.nickName.length > 8){
                    Toast.fail("昵称不能超过8个字符")
                }else{
                    //console.log(this.nickName);
                    Dialog.confirm({
                        title: '提示',
                        message: '是否修改昵称为\n' + this.nickName
                    }).then(()=>{
                        //确认
                        Toast({
                            type: 'loading',
                            message: '修改中...',
                            duration: 0
                        });
                        setTimeout(() => {
                            Toast.clear();
                        }, 3000);
                        this.axios({
                            url: '/user/updateNickName',
                            method: 'put',
                            params:{
                                userId: window.sessionStorage.getItem('userId'),
                                nickName: vm.nickName
                            }
                        }).then(function (res) {
                            clearTimeout();
                            Toast.clear();
                            if(res.data.code === 200){
                                Toast.success("修改成功");
                                vm.$router.push('/user/myDetail');
                            }else{
                                Toast.fail(res.data.msg);
                            }
                        }).catch(function (error) {
                            //console.log(error);
                            clearTimeout();
                            Toast.clear();
                            Toast.fail("服务器异常");
                        });
                    }).catch(()=>{

                    });
                }
                //回跳页面
            },
            focusMethod(){
                let inp = document.getElementsByClassName("nickNameInput")[0];
                //console.log(inp)
                inp.style.borderBottomColor = "#FFFFFF";
            },
            blurMethod(){
                let inp = document.getElementsByClassName("nickNameInput")[0];
                inp.style.borderBottomColor = "red";
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
  }
  .header .back{
    position: relative;
    left: 25px;
    top: -10px;
    font-size: 50px;
    width: 5px;
    float:left;
  }
  /*.main /deep/ .el-input__inner{
    margin-top: 10%;
    background-color: #13ce66;
    margin-left: 5%;
    width: 90%;
    height: 40px;
    font-family: Heimi;
    font-size: 24px;
    border: 0;
    border-bottom: solid 5px red;
  }*/
  .main span{
    padding-left: 10%;
    font-size: 30px;
    color: chartreuse;
  }
  .main .nickNameInput{
    border-bottom: solid 2px red;
    width: 80%;
    margin-left: 10%;
    padding-top: 10%;
  }
  .main .saveBtn{
    display: block;
    width: 100%;
    text-align: center;
    padding-top: 20%;
  }

</style>
