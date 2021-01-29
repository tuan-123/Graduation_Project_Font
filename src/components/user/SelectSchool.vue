<template>
  <div class="container">
    <div class="header">
      <span class="back" @click="toBack"> < </span>
      绑定学校
    </div>
    <div class="main">
      <el-cascader
        v-model="value"
        :options="options"
        :props="{ expandTrigger: 'hover' }"
        @change="handleChange"></el-cascader>
      <span id="tips">学校绑定后将无法修改</span>
      <div><el-button type="success" @click="saveNum">绑&#9定</el-button></div>
    </div>
  </div>
</template>

<script>
  var confirmText=['您要绑定的学校是:',''];
    export default {
        name: "SelectSchool",
        data(){
            return{
                value:-1,
                options:[
                    {
                        value: 2,
                        label:"广东",
                        children:[
                            {
                                value: 45,
                                label:"电子科技大学中山学院"
                            },
                            {
                                value: 46,
                                label: "中山大学"
                            },
                            {
                                value: 47,
                                label:"电子科技大学"
                            },
                            {
                                value: 48,
                                label: "背景大学"
                            }
                        ]
                    },
                    {
                        value: 3,
                        label:"上海",
                        children:[
                            {
                                value: 51,
                                label:"科技大学中山学院"
                            },
                            {
                                value: 52,
                                label: "大学"
                            },
                            {
                                value: 53,
                                label:"电子科技大学"
                            },
                            {
                                value: 54,
                                label: "背景大学"
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
            saveNum(){
                //发送请求
                if(this.value === -1) {
                    this.$message.error("先选择学校嘿");
                }else{
                    //confirm
                    //console.log(this.value);
                    //console.log(this.options.find(item=>item.value===this.value[0]))
                    //获取级联选择器的label值
                    var children = (this.options.find(item=>item.value===this.value[0])).children;
                    var schoolName = (children.find(item=>item.value===this.value[1])).label;

                    //组装数据，为了$confirm 的message可以换行
                    confirmText[1] = schoolName;
                    var newDatas=[];
                    var h = this.$createElement;
                    for(var i in confirmText){
                        newDatas.push(h('p',null,confirmText[i]));
                    }

                    //console.log(schoolName);
                    //确认信息
                    this.$confirm(h('div',null,newDatas),'提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warming'
                    }).then(_=>{
                        //确定
                    }).catch(_=>{
                        //取消
                    })
                }
                //回跳页面
            },
            focusMethod(){
                var inp = document.getElementsByClassName("el-input__inner")[0];
                inp.style.borderBottomColor = "#FFFFFF";
            },
            handleChange(event){
                //console.log(event);
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
  .main #tips{
    padding-left: 15%;
    font-size: 30px;
    display: block;
    padding-top: 25px;

  }
  .main .el-cascader{
    margin-top: 15%;
    width: 70%;
    margin-left: 10%;
  }
  .main .el-button{
    width: 30%;
    height: 60px;
    font-size: 36px;
    margin-left: 35%;
    margin-top: 80px;
  }
</style>

