<template>
  <div class="container">
    <div class="header">
      <span class="back" @click="toBack"> < </span>
      绑定学号
    </div>
    <div class="main">
      <!--<el-input
        @focus="focusMethod"
        @blur="blurMethod"
        type="text"
        :disabled="false"
        v-model="num"
        placeholder="请输入学号"
      ></el-input>-->
      <div class="numInput">
        <van-cell-group>
          <van-field
            v-model="num"
            placeholder="请输入学号"
            type="digit"
            @focus="focusMethod"
            @blur="blurMethod"
            @border="false"
          />
        </van-cell-group>
      </div>
      <span id="tips">学号绑定后将无法修改</span>
      <div class="btn">
        <!--<el-button type="success" @click="saveNum">绑&#9定</el-button>-->
        <van-button type="primary" text="绑定" @click="saveNum"/>
      </div>
    </div>
  </div>
</template>

<script>

    import {Toast} from 'vant';
    import {Dialog} from 'vant';
    var confirmText = ['您要绑定的学号是: ',''];
    export default {
        name: "finishNum",
        data(){
            return{
                num:''
            }
        },
        methods:{
            toBack(){
                this.$router.push("/user/myDetail");
            },
            saveNum(){
                //发送请求
                if(this.num === '') {
                    Toast.fail("先输入学号嘿");
                }else{
                    /*if(isNaN(this.num)){
                        this.$message.error("请输入正确的学号啦");
                    }else{
                        //去除前后空格
                        console.log(this.num.replace(/(^\s*)|(\s*$)/g,""));
                        //confirm
                        //组装数据，为了$confirm 的message可以换行
                        confirmText[1] = this.num.replace(/(^\s*)|(\s*$)/g,"");
                        var newDatas=[];
                        var h = this.$createElement;
                        for(var i in confirmText){
                            newDatas.push(h('p',null,confirmText[i]));
                        }

                        this.$confirm(h('div',null,newDatas),'提示',{
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warming'
                        }).then(_=>{
                            //确定
                        }).catch(_=>{
                            //取消
                        })
                    }*/
                    Dialog.confirm({
                        title:'提示',
                        message: '您要绑定的学号为\n' + this.num
                    }).then(()=>{
                       //确认
                       //console.log(this.num);
                    }).catch(()=>{
                        //取消
                    });

                }
                //回跳页面
            },
            focusMethod(){
                let inp = document.getElementsByClassName("numInput")[0];
                inp.style.borderBottomColor = "#FFFFFF";
            },
            blurMethod(){
                let inp = document.getElementsByClassName("numInput")[0];
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
    font-size:50px;
    width: 5px;
    float:left;
  }
  /*.main /deep/ .el-input__inner{
    margin-top: 20%;
    background-color: #13ce66;
    margin-left: 5%;
    width: 90%;
    height: 50px;
    font-family: Heimi;
    font-size: 20px;
    line-height: 50px;
    border: 0;
    border-bottom: solid 2px red;
  }*/
  .main #tips{
    padding-left: 10%;
    font-size: 30px;
    display: block;
    padding-top: 5px;

  }
  /*.main .el-button{
    font-size: 22px;
  }*/
  /*.main .btn{
    margin-top: 50px;
    width: 100%;
    text-align: center;
  }*/
  .main .btn{
    display: block;
    width: 100%;
    text-align: center;
    padding-top: 15%;
  }
  .main .numInput{
    border-bottom: solid 2px red;
    width: 80%;
    margin-left: 10%;
    padding-top: 10%;
  }
</style>

