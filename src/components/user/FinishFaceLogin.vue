<template>
  <div class="container">
    <div class="header">
      <van-icon style="position: absolute;top:10px;left:10px;z-index: 10" size="25" name="arrow-left" @click="back"/>
      <span>人脸采集</span>
    </div>
    <div class="vanUploader">
      <van-uploader
        accept="image/*"
        capture="camera"
        :file-list="fileList"
        :before-read="beforeRead"
        :after-read="afterRead"
      ></van-uploader>
    </div>
  </div>
</template>

<script>
    import {Toast} from 'vant';
    export default {
        name: "FinishFaceLogin",
        data(){
            return{
                fileList: [],
            }
        },
        methods:{
            back(){
                this.$router.push("/user/myDetail");
            },
            beforeRead(file){
                if(file.type.indexOf("image") === -1){
                    Toast.fail("非图片");
                    return false;
                }else if(file.size > 52428800){
                    Toast.fail("图片不能超过50兆");
                    return false
                }
                return true;
            },
            afterRead(file){
                //console.log(file.file);
                let vm = this;
                let formData = new FormData();
                formData.append("multipartFile",file.file);
                formData.append("userId",window.sessionStorage.getItem('userId'));
                Toast({
                    type: 'loading',
                    message: '识别中...',
                    duration: 0
                });
                this.axios({
                    url: '/user/addFaceLogin',
                    method: 'post',
                    data: formData,
                    headers:{
                        "Content-Type": "multipart/form-data"
                    }
                }).then(function (res) {
                    // console.log(res);
                    Toast.clear();
                    if(res.data.code === 200){
                        Toast.success("人脸登录已开启");
                        vm.$router.push("/user/myDetail");
                    }else{
                        Toast.fail(res.data.msg);
                    }

                }).catch(function (err) {
                    Toast.clear();
                    Toast.fail("故障啦");
                });
            }
        }
    }
</script>

<style scoped>
  .container{
    background-color: #ededed;
    width: 100%;
    height: 100%;
  }
  .container .vanUploader{
    text-align: center;
    position: relative;
    top: 30%;
  }
  .container .header{
    width:100%;
    text-align: center;
    height: 70px;
    font-size: 40px;
    font-family: SimHei;
    padding-top: 4%;
    font-weight: bold;
  }
</style>
