<template>
  <div class="container">
    <div style="position: absolute;top:10px;left:10px;z-index: 10">
      <van-icon size="25" name="arrow-left" @click="back"/>
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
        name: "FaceLogin",
        data(){
            return{
                fileList: [],
            }
        },
        methods:{
            back(){
                this.$router.push("/login");
            },
            beforeRead(file){
                if(file.type.indexOf("image") === -1){
                    Toast.fail("非图片");
                    return false;
                }else if(file.size > 5242880){
                    Toast.fail("图片不能超过5兆");
                    return false
                }
                return true;
            },
            afterRead(file){
                //console.log(file.file);
                let vm = this;
                let formData = new FormData();
                formData.append("multipartFile",file.file);
                Toast({
                    type: 'loading',
                    message: '人脸识别中...',
                    duration: 0
                });
                this.axios({
                    url: '/user/faceLogin',
                    method: 'post',
                    data: formData,
                    headers:{
                        "Content-Type": "multipart/form-data"
                    }
                }).then(function (res) {
                    // console.log(res);
                    Toast.clear();
                    if(res.data.code === 200){
                        window.sessionStorage.setItem('userId',res.data.data.phone);
                        window.sessionStorage.setItem('token',res.data.token)
                        Toast.success('登录成功');
                        vm.$router.push("/index");
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
    background-color: skyblue;
    width: 100%;
    height: 100%;
  }
  .container .vanUploader{
    text-align: center;
    position: relative;
    top: 30%;
  }
</style>
