<template>
  <div class="container">
    <div class="header">
      <span class="back" @click="toBack"> < </span>
      更改名字
      <span class="btn">
        <!--<input type="button" value="保存"/>-->
        <el-button type="success" @click="saveNickName">保存</el-button>
      </span>
    </div>
    <div class="main">
      <el-input
        @focus="focusMethod"
        @blur="blurMethod"
        type="text"
        maxlength="12"
        :disabled="false"
        v-model="nickName"
      ></el-input>
      <span>一个好名字可以让你的朋友更容易记住你</span>
    </div>
  </div>
</template>

<script>
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
                //发送请求
                if(this.nickName === '') {
                    this.$message.error("先输入昵称嘿");
                }else{
                    console.log(this.nickName);
                }
                //回跳页面
            },
            focusMethod(){
                let inp = document.getElementsByClassName("el-input__inner")[0];
                inp.style.borderBottomColor = "#FFFFFF";
            },
            blurMethod(){
                let inp = document.getElementsByClassName("el-input__inner")[0];
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
  }
  .header .back{
    position: relative;
    left: 25px;
    top: -10px;
    font-size: 30px;
    width: 5px;
    float:left;
    margin-right: 55px;
  }
  .header .btn{
    float: right;
    position: relative;
    top: -10px;
    padding-right: 10px;
  }
  .header .btn .el-button{
    font-size: 17px;
  }
  .main /deep/ .el-input__inner{
    margin-top: 10%;
    background-color: #13ce66;
    margin-left: 5%;
    width: 90%;
    height: 40px;
    font-family: Heimi;
    font-size: 24px;
    border: 0;
    border-bottom: solid 5px red;
  }
  .main span{
    padding-left: 5%;
    font-size: 17px;
    color: chartreuse;
  }

</style>
