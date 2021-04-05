<template>
  <div class="container">
    <div class="header">
      <span class="back" @click="toBack">
        <van-icon name="arrow-left" size="25"/>
      </span>
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
                options:[]

            }
        },
        created(){
            let vm = this;
            this.axios({
                url: '/school/getAllSchool',
                method: 'get'
            }).then(function(res){
                //console.log(res);
                if(res.data.code === 200){
                    vm.options = res.data.data;
                }else{
                    Toast.fail(res.data.msg);
                }
            }).catch(function (error) {
                Toast.fail("服务器异常");
            })
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
                let vm = this;
                if(this.value === -1){
                    Toast.fail('请选择学校');
                }else{
                    Dialog.confirm({
                        titile: '提示',
                        message: '您所绑定的学校为:\n' + this.fieldValue
                    }).then(()=>{
                       // 确定
                       //console.log(this.value);
                        Toast({
                            type: 'loading',
                            message: '绑定中...',
                            duration: 0
                        });
                        setTimeout(() => {
                            Toast.clear();
                        }, 3000);
                        this.axios({
                            url: '/user/updateSchool',
                            method: 'put',
                            params: {
                                userId: window.sessionStorage.getItem('userId'),
                                schoolId: vm.value
                            }
                        }).then(function (res) {
                            clearTimeout();
                            Toast.clear();
                            if(res.data.code === 200){
                                Toast.success("绑定成功");
                                vm.$router.push("/user/myDetail")
                            }else{
                                Toast.fail(res.data.msg);
                            }
                        }).catch(function (error) {
                            clearTimeout();
                            Toast.clear();
                            Toast.fail("服务器异常");
                        })
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
    /*background-color: #5daf34;*/
    width: 100%;
    height: 100%;
  }
  .header{
    background-color: #ffffff;
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
    background-color: #ededed;
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

