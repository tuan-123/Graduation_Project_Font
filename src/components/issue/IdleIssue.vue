<template>
  <div class="container">
    <div class="header">
      <span class="back" @click="toBack"> < </span>
      闲置发布
    </div>
    <div class="main">
      <van-form @submit="onSubmit">
        <van-field
          type="text"
          v-model="shopTitle"
          name="shopTitle"
          label="物品标题"
          placeholder="物品标题"
          :rules="shopTitleRule"
          :required="true"
          clearable
        />
        <van-field
          type="textarea"
          v-model="shopDescribe"
          name="shopDescribe"
          label="物品描述"
          placeholder="物品描述"
          :rules="shopDescribeRule"
          :required="true"
          clearable
        />
        <van-field
          label="物品标签"
          readonly
        >
          <template>
            <nut-checkboxgroup
              style="line-height: 30px;padding:0"
              ref="checkboxGroup"
              :checkBoxData="checkBoxData"
              v-model="group"
              slot="right-icon"
              size="small"
              :vertical="true">
            </nut-checkboxgroup>
          </template>
        </van-field>
        <van-field
          :required="true"
          label="物品价格"
          placeholder="请输入物品价格"
          v-model="shopPrice"
          name="shopPrice"
          type="number"
          :rules="shopPriceRule"
        >
          <template>
            <div slot="right-icon">元</div>
          </template>
        </van-field>
        <van-field
          :required="true"
          label="物品数量"
          type="digit"
          readonly
        >
          <template>
            <nut-stepper
              slot="right-icon"
              :value.sync="shopNum"
              :min="1"
              @reduce-no-allow="reduceNoAllow"
            ></nut-stepper>
          </template>
        </van-field>
        <van-field
          :required="true"
          label="联系方式"
          placeholder="请输入联系方式"
          v-model="phone"
          name="phone"
          :rules="phoneRule"
        >
        </van-field>
        <van-field
          :required="true"
          label="物品状态"
          readonly
        >
          <template>
            <div slot="right-icon">
              <nut-radio
                class="myRadio"
                v-model="radioVal"
                :label="1"
              >上架
              </nut-radio>

              <nut-radio
                v-model="radioVal"
                :label="0"
              >下架
              </nut-radio>
            </div>
          </template>
        </van-field>
        <div>
          <!--<van-uploader
            :file-list="fileList"
            use-before-read
            :before-read="beforeRead"
            :after-read="afterRead"
            accept="image/*"
            max-count="9"
            :multiple="true"
            :preview-image="true"
            :deletable="true"
            :before-delete="deletePic"
          />-->
          <el-upload
            class="eUpload"
            :action="url"
            list-type="picture-card"
            accept="image/*"
            :limit="9"
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
        name: "IdleIssue",
        data(){
            return{
                phone:'',
                shopTitle: '',
                shopDescribe: '',
                checkBoxData:[
                    {id:1,value:'全新',label:'全新'},
                    {id:2,value:'实惠',label:'实惠'},
                    {id:3,value:'标签3',label:'标签3'},
                ],
                group: ['全新'],
                shopPrice: '1.00',
                shopNum: 1,
                radioVal: 1,
                fileList: [],

                dialogImageUrl: '',
                dialogVisible: false,
                data:{
                    'userId': window.sessionStorage.getItem('userId')
                },
                headers:{
                    'Authorization': window.sessionStorage.getItem('token')
                },
                url: GLOBAL.httpBaseUrl + "/idle/imageUpload",

                shopTitleRule:[
                    {
                        required: true,message: '请输入商品标题',trigger: 'onSubmit'
                    }
                ],
                shopDescribeRule:[
                    {
                        required: true,message: '请输入商品描述',trigger: 'onSubmit'
                    }
                ],
                shopPriceRule:[
                    {
                        required: true, message: '请输入价格', trigger: 'onSubmit'
                    },
                    {
                        pattern: /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/, message: '金额有误', trigger: 'onSubmit'
                    }
                ],
                phoneRule:[
                    { pattern: /^1[3|4|5|7|8][0-9]{9}$/,message: '请输入正确的手机号码',trigger: 'onSubmit'},
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
                //console.log(value);
                //console.log("==============");
                let vm = this;
                if(this.fileList.length <= 0){
                    Toast.fail("请上传图片");
                    return;
                }
                Dialog.confirm({
                    title: '提示',
                    message: '确认发布订单？'
                }).then(()=>{
                    //确认
                    return new Promise((resolve) => {
                        Toast({
                            type: 'loading',
                            message: '提交中...',
                            duration: 0
                        });
                        vm.axios({
                            method: 'post',
                            url: '/idle/idleIssue',
                            data: {
                                userId: window.sessionStorage.getItem('userId'),
                                title: value.shopTitle,
                                describe: value.shopDescribe,
                                tab: this.group,
                                price: value.shopPrice,
                                num: vm.shopNum,
                                phone: value.phone,
                                state: vm.radioVal,
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
                    });
                }).catch(()=>{
                    //取消
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
            /*afterRead(event){
                //该组件单选是对象，多选是数组
                if(Array.isArray(event)){
                    for(let i = 0; i < event.length; i++){
                        console.log(event[i]);
                        this.fileList.push({index:(this.fileList.length),url:'https://img.yzcdn.cn/vant/leaf.jpg'});
                    }
                }else{
                    console.log(event);
                    this.fileList.push({index:(this.fileList.length),url:'https://img.yzcdn.cn/vant/leaf.jpg'});
                }
                console.log(this.fileList);
            },
            deletePic(event){
                console.log(event.index);
                for(let i = 0; i < this.fileList.length; i++){
                    if(this.fileList[i].index === event.index){
                        for(let j = i; j < this.fileList.length - 1; j++){
                            this.fileList[j].index = j;
                            this.fileList[j].url = this.fileList[j+1].url;
                        }
                        this.fileList.pop();
                        break;
                    }
                }
            },*/
            handleAvatarSuccess(response,file,fileList){
                //console.log(response,file,fileList);
                this.fileList = [];
                for(let i = 0; i < fileList.length;i++){
                    this.fileList.push(fileList[i].response.data);
                }
                //console.log(file);
                //console.log(fileList);
                /*if(response.code === 200){
                    this.userImg = GLOBAL.httpBaseUrl + response.data+"?timeout";
                    Toast.success("更新成功");
                }else{
                    Toast.fail(response.msg);
                }*/
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
    height: 100%
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
    height: auto;
  }
  .header .back{
    position: relative;
    left: 25px;
    top: -10px;
    font-size:50px;
    width: 5px;
    float:left;
  }
  .myRadio{
    color: dodgerblue;
  }
  .eUpload{

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
