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
        <div>
          <span>【物品】：</span>
          <span>{{helpThing}}</span>
        </div>
        <div>
          <span>【时间】：</span>
          <span>{{helpTime}}</span>
        </div>
        <div>
          <span>【地点】：</span>
          <span>{{helpPlace}}</span>
        </div>
        <div v-if="helpTo !== ''">
          <span>【送至】：</span>
          <span>{{helpTo}}</span>
        </div>
        <div>
          <span>【佣金】：</span>
          <span>{{helpCommission}}</span>
          <span>元</span>
        </div>
        <div v-if="helpDetail !== ''">
          <span>【附加】：</span>
          <span>{{helpDetail}}</span>
        </div>
      </div>
      <div v-if="photos !== null && photos.length !== 0">
        <!--图片宫格-->
        <van-image
          v-for="(item,index) in photos"
          :key="index"
          width="2.2rem"
          height="2.2rem"
          fit="fill"
          :src="httpBaseUrl + item"
          style="margin-right:0.3rem;margin-bottom:0.3rem"
        />

      </div>
      <div class="comment_click">
        <div class="showIsAccept" v-if="canShowIsAccept" v-show="!isShow">
          {{helpState === 1 ? "已接单: " + acceptUserId : "未接单"}}
        </div>
        <div style="float: left" v-if="canShowTimeAgo" v-show="!isShow">
          {{getTime()}}
        </div>
        <input class="comment_input" v-model="txt" v-show="isShow" placeholder="请输入评论内容">
        <van-button class="button" v-show="isShow" size="small" color="red" round @click="send">发送</van-button>
        </input>
        <div style="background-color: red">
          <van-icon name="ellipsis" size="25" class="comment_click_icon" @click="showInput(id)"></van-icon>
        </div>
        <div style="background-color: red" v-if="canAccept">
          <van-icon name="cart-o" size="25" class="comment_click_icon" @click="accept(id)" v-show="!isShow"></van-icon>
        </div>
        <div style="background-color: red" v-if="canPhone">
          <van-icon name="phone-o" size="25" class="comment_click_icon" @click="clickPhone" v-show="!isShow"></van-icon>
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
    <!--<nut-popup v-model="show" round closeable class="popup" >{{phone}}</nut-popup>-->
  </div>

</template>

<script>
    import {Toast} from 'vant';
    import {Dialog} from 'vant';
    import GLOBAL from '../../api/global_variable';
    export default {
        name: "MyHelp",
        data(){
            return{
                isShow:false,
                httpBaseUrl: GLOBAL.httpBaseUrl,
                /*show: false,*/
                txt:'',
                myId: window.sessionStorage.getItem('userId'),
                commentList: this.comment,
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
                this.isShow = false;
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
                            vm.comment = res.data.data;
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
                }
            },
            accept(id){
                this.$emit("MyCloseCommentInput");
                let vm = this;
                Dialog.confirm({
                    title: '提示',
                    message: '是否确认接单',
                }).then(()=>{
                    //确认
                    Toast({
                       type: 'loading',
                       message: '接单中...',
                       duration: 0
                    });
                    this.axios({
                        url: '/help/acceptHelp',
                        method: 'get',
                        params:{
                            id: id,
                            userId: vm.myId
                        }
                    }).then(function(res){
                        vm.$emit("MyRefresh","");
                        if(res.data.code === 200){
                            Toast.success("接单成功");
                        }else{
                            Toast.fail("接单失败");
                        }
                    }).catch(function(err){
                        Toast.clear();
                        Toast.fail("故障啦");
                    });
                }).catch(()=>{
                    //取消
                });
            },
            clickPhone(){
                //this.show = !this.show;
                //console.log(this.phone);
                this.$emit("MyCloseCommentInput");
                Dialog.alert({
                    message: this.phone
                }).then(()=>{
                    //on close
                });

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
                        url: '/help/deleteHelpById',
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
            }

        },
        props:{
            id:{
                type:Number
            },
            userId:{
                type: String,
            },
            userImg:{
                type:String,
                default: GLOBAL.httpBaseUrl + "/userImg/defaultImg.jpg"
            },
            username:{
                type:String,
                default:''
            },
            helpThing:{
                type: String,
                default: ''
            },
            helpTime:{
                type: String,
                default: ''
            },
            helpPlace:{
                type: String,
                default: ''
            },
            helpTo:{
                type: String,
                default: ''
            },
            helpCommission:{
                type: Number,
                default: 1.50
            },
            helpDetail:{
                type: String,
                default: ''
            },
            helpState:{
                type: Number,
                default: 0
            },
            acceptUserId:{
                type: String,
                default: ''
            },
            phone:{
                type: String,
                default: '',
            },
            photos:{
                type: Array,
                default: ()=>[]
            },
            createTime:{
                type:String
            },
            comment:{
                type: Array,
                default: ()=>[]
            },
            canAccept:{
                type: Boolean,
                default: false
            },
            canPhone:{
                type: Boolean,
                default: false
            },
            canShowIsAccept:{
                type: Boolean,
                default: false
            },
            canShowTimeAgo:{
                type: Boolean,
                default: true
            }
        },
    }
</script>

<style scoped>
  .interactive_container{
    margin-top: 20px;
    width: 96%;
    margin-left: 2%;
    height: auto;
    border-bottom: solid 1px #ededed;
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
    background-color: #ededed;
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
  .popup{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 150px;
    line-height: 150px;
    font-size: 50px;
    text-align: center;
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 520px;
    height: 520px;
    background-color: #fff;
  }

  .showIsAccept{
    float: left;
    height: 60px;
    line-height: 60px;
    font-size: 40px;
    margin-left: 2%;
    color: red;
  }
</style>

