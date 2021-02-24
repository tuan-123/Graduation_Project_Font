<template>
  <div class="interactive_container">
    <div class="header_img">
      <van-image
        width="40"
        height="40"
        src="http://localhost:8087/userImg/defaultImg.jpg"
      />
    </div>
    <div class="text">
      <div class="user_name">
        {{username}}
      </div>
      <div class="content">
        {{content}}
      </div>
      <div>
        <!--图片宫格-->

      </div>
      <div class="comment_click">
        <input class="comment_input" v-model="txt" v-show="isShow" placeholder="请输入评论内容">
          <van-button class="button" v-show="isShow" size="small" color="red" round @click="send">发送</van-button>
        </input>
        <div style="background-color: red">
          <van-icon name="ellipsis" size="20" class="comment_click_icon" @click="showInput"></van-icon>
        </div>
      </div>
      <div v-if="comment !== ''">
        <div class="comment">
          <div v-for="(item,i) in comment">
            <span class="title">机器人{{i+1}}:&#9 </span>
            <span>{{item}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {Toast} from 'vant';
    export default {
        name: "MyComment",
        data(){
            return{
                isShow:false,
                txt:'',
            }
        },
        methods:{
            showInput(){
                this.isShow = !this.isShow;
            },
            send(){
                this.isShow = false;
                console.log(this.txt);
                console.log(this.id);
                if(this.txt !== ''){
                    this.comment.push(this.txt);
                    this.txt = '';
                    Toast.success('评论成功');
                }

            }
        },
        props:{
            id:{
                type:String,
                default:''
            },
            username:{
                type:String,
                default:''
            },
            content:{
                type:String,
                default:''
            },
            comment:{
                type:Array,
                default:''
            }
        }
    }
</script>

<style scoped>
  .interactive_container{
    margin-top: 20px;
    width: 96%;
    margin-left: 2%;
    height: auto;
    border: solid 1px red;
  }
  .header_img{
    float: left;
  }
  .text{
    width: 87%;
    margin-left: 13%;
    /*border: solid 1px yellow;*/
  }
  .text .user_name{
    /*background-color: #795da3;*/
    font-size: 40px;
    font-family: SimHei;
    color:red;
  }
  .text .content{
    margin-top: 5px;
    /*background-color: #13ce66;*/
    font-size:35px;
  }
  .text .comment{
    background-color: #5daf34;
    font-size:33px;
    margin-bottom: 10px;
  }
  .text .comment>div{
    background-color: #795da3;
    width: 96%;
    margin-left: 2%;
  }
  .title{
    color:red;
    font-size: 33px;
  }
  .comment_click{
    padding-top: 2%;
    background-color: #5daf34;
    height: 60px;
    line-height: 60px;
  }
  .comment_click_icon{
    margin-right: 2%;
    float:right;
    background-color: red
  }
  .comment_input{
    margin-left: 2%;
    float: left;
    width: 70%;
    height: 50px;
    line-height: 50px;
    background-color: yellow;
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
