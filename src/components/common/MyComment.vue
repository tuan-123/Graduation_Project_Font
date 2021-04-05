<template>
  <div class="interactive_container">
    <div class="header_img">
      <van-image
        width="40"
        height="40"
        :src="userImg"
      />
    </div>
    <div class="text">
      <div style="float: right;" v-if="userId === myId">
        <van-icon name="delete-o" size="0.7rem" color="red" @click="deleted(id)"/>
      </div>
      <div class="user_name">
        {{username}}
      </div>
      <div class="content">
        {{content}}
      </div>
      <div v-if="photos !== null && photos.length !== 0">
        <van-image
          v-for="(item,index) in photos"
          :key="index"
          width="2.2rem"
          height="2.2rem"
          fit="fill"
          :src="httpBaseUrl + item"
          style="margin-right:0.3rem"
        />
      </div>
      <div class="comment_click">
        <input class="comment_input" v-model="txt" v-show="isShow" placeholder="请输入评论内容"/>
        <van-button class="button" v-show="isShow" size="small" color="red" round @click="send">发送</van-button>
        <div style="float: left">{{getTime()}}</div>
        <div style="background-color: red">
          <van-icon name="ellipsis" size="20" class="comment_click_icon" @click="showInput(id)"></van-icon>
        </div>
      </div>
      <div v-if="commentList !== ''">
        <div class="comment">
          <div v-for="(item,i) in commentList">
            <span class="title">{{i+1}}楼:&#9 </span>
            <span>{{item.content}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {Dialog} from 'vant';
  import {Toast} from 'vant';
  import GLOBAL from '../../api/global_variable';
    export default {
        name: "MyComment",
        data(){
            return{
                httpBaseUrl: GLOBAL.httpBaseUrl,
                isShow:false,
                txt:'',
                commentList: this.comment,
                myId: window.sessionStorage.getItem('userId'),
            }
        },
        watch: {
            comment(newValue,oldValue){
                this.commentList = newValue;
            }
        },
        methods:{
            showInput(id){
                //this.isShow = !this.isShow;
                this.$emit("MyCommentInput",id);
            },
            send(){
                let vm = this;
                //console.log(this.txt);
                //console.log(this.id);
                if(this.txt !== '' && this.txt.trim().length > 0){
                    let vm = this;
                    Toast({
                        type: 'loading',
                        message: '提交中...',
                        duration: 0
                    });
                    this.axios({
                        url: '/comment/commentIssue',
                        method: 'post',
                        data: {
                            parentId: vm.id,
                            userId: window.sessionStorage.getItem('userId'),
                            content: vm.txt
                        }
                    }).then(function (res) {
                        Toast.clear();
                        if(res.data.code === 200){
                            //console.log(res);
                            vm.commentList = res.data.data;
                            Toast.success('评论成功');
                        }else{
                            Toast.fail(res.data.msg);
                        }
                    }).catch(function(err){
                        Toast.clear();
                        Toast.fail("故障啦");
                    });
                    this.txt = '';
                    this.isShow = false;
                }else{
                    this.txt = '';
                    this.isShow = false;
                }
            },
            deleted(id){
                //console.log(id);
                this.$emit("MyCloseCommentInput");
                let vm = this;
                Dialog.confirm({
                    title: '提示',
                    message: '是否确认删除?'
                }).then(()=>{
                    this.axios({
                        url: '/ask/deleteAskById',
                        method: 'get',
                        params: {
                            id: id
                        }
                    }).then(function (res) {
                        if(res.data.code === 200){
                            vm.$emit('MyRefresh','');//触发父组件函数
                            Toast.success("已删除");
                        }else{
                            Toast.fail(res.data.msg);
                        }
                    }).catch(function(err){
                        Toast.fail("故障啦");
                    });
                }).catch(()=>{

                });
            },
            getTime(){
                return this.timeAgo(this.createTime);
            },
        },
        props:{
            id:{
                type:Number,
                default: 0
            },
            userId:{
                type: String,
                default: '0'
            },
            userImg:{
                type: String,
                default: GLOBAL.httpBaseUrl + "/userImg/defaultImg.jpg"
            },
            username:{
                type:String,
                default: '神秘人'
            },
            content:{
                type:String,
                default:''
            },
            photos:{
                type: Array,
                default: ()=> []
            },
            hasResolve:{
                type: Number,
                default: 0
            },
            comment:{
                type:Array,
                default: ()=> []
            },
            createTime:{
                type:String,
            }
        }
    }
</script>

<style scoped>
  .interactive_container{
    margin-top: 10px;
    width: 96%;
    margin-left: 2%;
    height: auto;
    /*border: solid 1px red;*/
  }
  .header_img{
    padding-top: 20px;
    float: left;
  }
  .text{
    padding-top: 20px;
    padding-bottom: 20px;
    width: 87%;
    margin-left: 13%;
    /*border: solid 1px yellow;*/
  }
  .text .user_name{
    /*background-color: #795da3;*/
    font-size: 40px;
    font-family: SimHei;
    color:dodgerblue;
  }
  .text .content{
    margin-top: 5px;
    /*background-color: #13ce66;*/
    font-size:35px;
  }
  .text .comment{
    background-color: #efefef;
    font-size:33px;
    margin-bottom: 10px;
  }
  .text .comment>div{
    background-color: #efefef;
    width: 96%;
    margin-left: 2%;
  }
  .title{
    color:dodgerblue;
    font-size: 33px;
  }
  .comment_click{
    padding-top: 2%;
    background-color: #ffffff;
    height: 60px;
    line-height: 60px;
  }
  .comment_click_icon{
    margin-right: 2%;
    float:right;
    background-color: #ffffff;
  }
  .comment_input{
    margin-left: 2%;
    float: left;
    width: 70%;
    height: 50px;
    line-height: 50px;
    background-color: skyblue;
    border: 0;
    font-size: 30px;
  }
  .button{
    float: left;
    height: 55px;
    line-height: 55px;
  }
  /*解决span里是数字串不自动换行的情况*/
  .comment>div{
    word-break: break-all;
  }
</style>
