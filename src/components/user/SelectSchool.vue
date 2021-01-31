<template>
  <div class="container">
    <div class="header">
      <span class="back" @click="toBack"> < </span>
      绑定学校
    </div>
    <div class="main">
      <!--<el-cascader
        v-model="value"
        :options="options"
        :props="{ expandTrigger: 'hover' }"
        @change="handleChange"></el-cascader>-->
      <div class="schoolSelect">
        <van-field
          v-model="fieldValue"
          is-link
          readonly
          placeholder="请选择所在学校"
          @click="show = true"
        />
        <van-popup v-model="show" round position="bottom">
          <van-cascader
            v-model="value"
            title="请选择学校"
            :options="options"
            @close="show=false"
            @finish="onFinish"
          />
        </van-popup>
      </div>
      <span id="tips">学校绑定后将无法修改</span>
      <!--<div class="btn">
        <el-button type="success" @click="saveNum">绑&#9定</el-button>
      </div>-->
      <div class="saveBtn">
        <van-button type="primary" text="绑定" @click="saveSchool"/>
      </div>
    </div>
  </div>
</template>

<script>
  //var confirmText=['您要绑定的学校是:',''];
  import {Toast} from 'vant';
  import {Dialog} from 'vant';
    export default {
        name: "SelectSchool",
        data(){
            return{
                value:-1,
                show: false,
                fieldValue: '',
                options:[
                    {
                        value: 2,
                        text:"广东",
                        children:[
                            {
                                value: 45,
                                text:"电子科技大学中山学院"
                            },
                            {
                                value: 46,
                                text: "中山大学"
                            },
                            {
                                value: 47,
                                text:"电子科技大学"
                            },
                            {
                                value: 48,
                                text: "背景大学"
                            }
                        ]
                    },
                    {
                        value: 3,
                        text:"上海",
                        children:[
                            {
                                value: 51,
                                text:"科技大学中山学院"
                            },
                            {
                                value: 52,
                                text: "大学"
                            },
                            {
                                value: 53,
                                text:"电子科技大学"
                            },
                            {
                                value: 54,
                                text: "背景大学"
                            }
                        ]
                    }
                ]

            }
        },
        methods:{
            toBack(){
                this.$router.push("/user/myDetail");
            },
            onFinish({ selectedOptions }){
                this.show = false;
                this.fieldValue = selectedOptions.map((option) => option.text).join('/');
            },
            saveSchool(){
                if(this.value === -1){
                    Toast.fail('请选择学校');
                }else{
                    Dialog.confirm({
                        titile: '提示',
                        message: '您所绑定的学校为:\n' + this.fieldValue
                    }).then(()=>{
                       // 确定
                       console.log(this.value);
                    }).catch(()=>{
                        //取消
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
    margin-right: 30px;
  }
  .main #tips{
    padding-left: 10%;
    font-size: 30px;
    display: block;
    padding-top: 25px;

  }
  /*.main .el-cascader{
    margin-top: 15%;
    width: 70%;
    margin-left: 15%;
  }*/
  /*.main .el-button{
    font-size: 22px;
  }*/
  /*.main .btn{
    margin-top: 50px;
    width: 100%;
    text-align: center;
  }*/
  .main .saveBtn{
    display: block;
    width: 100%;
    text-align: center;
    padding-top: 10%;
  }
  .main .schoolSelect{
    width: 80%;
    margin-left: 10%;
    padding-top: 10%;
  }
</style>

