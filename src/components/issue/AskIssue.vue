<template>
  <div class="container">
    <div class="header">
      <span class="back" @click="toBack">
        <van-icon name="arrow-left" size="25"/>
      </span>
      帮问发布
    </div>
    <div class="main">
      <van-form @submit="onSubmit">
        <van-field
          type="textarea"
          v-model="askContent"
          name="askContent"
          label="提问内容"
          placeholder="快快描述你的疑问吧，让大家一起来解决"
          :rules="askContentRule"
          :required="true"
          clearable
        />
        <div>
          <el-upload
            class="eUpload"
            :action="url"
            list-type="picture-card"
            accept="image/*"
            :limit="3"
            :headers="headers"
            :data="data"
            :on-error="handleAvatarError"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-exceed="exceed">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
    import {Toast} from 'vant';
    import {Dialog} from 'vant';
    import GLOBAL from '../../api/global_variable';
    export default {
        name: "AskIssue",
        data(){
            return{
                askContent: '',
                fileList: [],

                dialogImageUrl: '',
                dialogVisible: false,
                data:{
                    'userId': window.sessionStorage.getItem('userId')
                },
                headers:{
                    'Authorization': window.sessionStorage.getItem('token')
                },
                url: GLOBAL.httpBaseUrl + "/ask/imageUpload",

                askContentRule:[
                    {
                        required: true, message: '还没输入内容呢', trigger: 'onSubmit'
                    }
                ]
            }
        },
        methods:{
            toBack(){
                this.$router.push({
                    path: '/main/myIndex',
                    name: 'MainMyIndex',
                    params: {
                        currentIndex: 0
                    }
                });
            },
            onSubmit(value){
                Dialog.confirm({
                    title: '提示',
                    message: '确认发起提问？'
                }).then(()=>{
                    //确认
                    //console.log(value.askContent);
                    let vm = this;
                    Toast({
                        type: 'loading',
                        message: '提交中...',
                        duration: 0
                    });
                    vm.axios({
                        method: 'post',
                        url: '/ask/askIssue',
                        data: {
                            userId: window.sessionStorage.getItem('userId'),
                            content: value.askContent,
                            photo: vm.fileList
                        }
                    }).then(function (response) {
                        //console.log(response);
                        Toast.clear();
                        if(response.data.code === 200){
                            Toast.success("提交成功");
                            vm.$router.push('/index');

                        }else if(response.data.code === 1001){
                            //alert(response.data.msg);;
                            //vm.$message.error(response.data.msg);
                            Toast.fail(response.data.msg);
                        }
                    }).catch(function(error){
                        Toast.clear();
                        Toast.fail("故障啦");
                        //console.log(error);
                    });
                }).catch(()=>{

                });
            },
            beforeRead(event){
                for(let i = 0;i < event.length; i++){
                    if(event[i].type.indexOf('image') === -1){
                        Toast.fail('请选择图片');
                        return false;
                    }
                    if(event[i].size > 5242880) {
                        Toast.fail("请上传的图片不超过5兆");
                        return false;
                    }
                }
                // 返回false将会终止读取文件
                return true;
            },
            handleAvatarSuccess(response,file,fileList){
                this.fileList = [];
                for(let i = 0; i < fileList.length;i++){
                    this.fileList.push(fileList[i].response.data);
                }
            },
            handleAvatarError(response,file,fileList){
                Toast.fail("图片上传失败");
            },
            beforeAvatarUpload(file){
                //console.log(file);
                if(file.type.indexOf("image") === -1){
                    Toast.fail("请选择图片");
                    return false;
                }else if(file.size > 5242880){
                    Toast.fail("图片不能超过5兆");
                    return false
                }
                return true;

            },
            handleRemove(file, fileList) {
                //console.log(file, fileList);
                this.fileList = [];
                for(let i = 0; i < fileList.length;i++){
                    this.fileList.push(fileList[i].response.data);
                }
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            exceed(files,fileList){
                Toast.fail("不要贪心啦");
            }
        },
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
    font-size:50px;
    width: 5px;
    float:left;
  }
  /deep/ .el-upload--picture-card{
    width: 200px;
    height: 200px;
    line-height: 200px;
  }
  /deep/ .el-upload-list__item{
    width: 200px;
    height: 200px;
    line-height: 200px;
  }
  /deep/ .el-progress-circle{
    text-align: center !important;
    width: 170px !important;
    height: 170px !important;
    line-height: 170px !important;
  }
  /deep/ .el-upload-list__item-actions{
    width: 200px;
    height: 200px;
    line-height: 200px;
  }
</style>
