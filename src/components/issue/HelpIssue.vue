<template>
  <div class="container">
    <div class="header">
      <span class="back" @click="toBack">
        <van-icon name="arrow-left" size="25"/>
      </span>
      帮代发布
    </div>
    <div class="main">
      <van-form @submit="onSubmit">
        <van-field
          type="text"
          v-model="helpThing"
          name="helpThing"
          label="帮代物品"
          :rules="helpThingRule"
          placeholder="快递、外卖等其他物品"
          :required="true"
          clearable
        />
        <van-field
          type="text"
          v-model="helpTime"
          name="helpTime"
          label="帮代时间"
          :rules="helpTimeRule"
          placeholder="例：上午1、2节，中午12点前"
          :required="true"
          clearable
        />
        <van-field
          type="text"
          v-model="helpPlace"
          name="helpPlace"
          label="帮代地点"
          :rules="helpPlaceRule"
          placeholder="例：xxx门口、韵达快递点"
          :required="true"
          clearable
        />
        <van-field
          type="text"
          v-model="helpTo"
          name="helpTo"
          label="帮代到达"
          placeholder="例：送到xxx楼101、xxx楼下"
          clearable
        />
        <van-field
          type="number"
          v-model="helpCommission"
          name="helpCommission"
          label="佣 金"
          placeholder="请输入佣金"
          :required="true"
          :rules="helpCommissionRule"
          clearable
        >
          <template>
            <div slot="right-icon">元</div>
          </template>
        </van-field>
        <van-field
          type="textarea"
          v-model="helpDetail"
          name="helpDetail"
          label="帮代描述"
          placeholder="描述一下"
          clearable
        />
        <van-field
          :required="true"
          label="联系方式"
          placeholder="请输入联系方式"
          v-model="phone"
          name="phone"
          :rules="phoneRule"
        >
        </van-field>
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
        name: "HelpIssue",
        data(){
            return{
                helpThing: '',
                helpTime: '',
                helpPlace: '',
                helpTo: '',
                helpCommission: 2.5,
                helpDetail: '',
                phone:'',

                fileList: [],
                dialogImageUrl: '',
                dialogVisible: false,
                data:{
                    'userId': window.sessionStorage.getItem('userId')
                },
                headers:{
                    'Authorization': window.sessionStorage.getItem('token')
                },
                url: GLOBAL.httpBaseUrl + "/help/imageUpload",

                helpThingRule: [
                    {
                        required: true, message: '说说你要帮代的物品吧', trigger: 'onSubmit'
                    }
                ],
                helpTimeRule: [
                    {
                        required: true, message: '说明一下时间哈', trigger: 'onSubmit'
                    }
                ],
                helpPlaceRule: [
                    {
                        required: true, message: '说明一下地点哈', trigger: 'onSubmit'
                    }
                ],
                helpCommissionRule: [
                    {
                        required: true, message: '请输入佣金', trigger: 'onSubmit'
                    },
                    {
                        pattern: /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/, message: '金额有误', trigger: 'onSubmit'
                    }
                ],
                phoneRule:[
                    { pattern: /^1[3|4|5|7|8][0-9]{9}$/,min:11,max:11,message: '请输入正确的手机号码',trigger: 'onBlur'},
                ]

            }
        },
        mounted(){
            this.phone = window.sessionStorage.getItem('userId');
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
                    //console.log(value);
                    let vm = this;
                    Toast({
                        type: 'loading',
                        message: '发布中...',
                        duration: 0
                    });
                    this.axios({
                        url: '/help/helpIssue',
                        method: 'post',
                        data: {
                            userId: window.sessionStorage.getItem('userId'),
                            helpArticle: value.helpThing,
                            helpTime: value.helpTime,
                            helpPlace: value.helpPlace,
                            helpTo: value.helpTo,
                            helpFee: value.helpCommission,
                            helpDescr: value.helpDetail,
                            helpPhone: value.phone,
                            helpPhoto: vm.fileList
                        }
                    }).then(function (res) {
                        Toast.clear();
                        if(res.data.code === 200){
                            Toast.success("发布成功");
                            vm.$router.push("/index");
                        }else{
                            Toast.fail(res.data.msg);
                        }
                    }).catch(function (err) {
                        Toast.clear();
                        Toast.fail("故障啦");
                    });
                    //Toast.success('发布成功');
                }).catch(()=>{

                });
            },
            reduceNoAllow(){
                Toast.fail('超出最小限制');
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
    height: auto
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
    height: auto
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
