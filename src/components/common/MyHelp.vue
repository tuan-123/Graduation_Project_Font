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
        <div>
          <span>【附加】：</span>
          <span>{{helpDetail}}</span>
        </div>
      </div>
      <div>
        <!--图片宫格-->

      </div>
      <div class="comment_click">
        <input class="comment_input" v-model="txt" v-show="isShow" placeholder="请输入评论内容">
        <van-button class="button" v-show="isShow" size="small" color="red" round @click="send">发送</van-button>
        </input>
        <div style="background-color: red">
          <van-icon name="ellipsis" size="25" class="comment_click_icon" @click="showInput"></van-icon>
        </div>
        <div style="background-color: red">
          <van-icon name="cart-o" size="25" class="comment_click_icon" @click="accept" v-show="!isShow && (phone === '')"></van-icon>
        </div>
        <div style="background-color: red">
          <van-icon name="phone-o" size="25" class="comment_click_icon" @click="clickPhone" v-show="!isShow && (phone!== '')"></van-icon>
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
    <!--<nut-popup v-model="show" round closeable class="popup" >{{phone}}</nut-popup>-->
  </div>

</template>

<script>
    import {Toast} from 'vant';
    import {Dialog} from 'vant';
    export default {
        name: "MyHelp",
        data(){
            return{
                isShow:false,
                /*show: false,*/
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
            },
            accept(){
                Dialog.confirm({
                    title: '提示',
                    message: '是否确认接单',
                }).then(()=>{
                    //确认
                    console.log('接单');
                    Toast.success('接单成功');
                }).catch(()=>{
                    //取消
                });
            },
            clickPhone(){
                //this.show = !this.show;
                //console.log(this.phone);
                Dialog.alert({
                    message: this.phone
                }).then(()=>{
                    //on close
                });

            },

        },
        props:{
            id:{
                type:String,
                default:'123'
            },
            username:{
                type:String,
                default:'123'
            },
            helpThing:{
                type: String,
                default: '阿萨德加上'
            },
            helpTime:{
                type: String,
                default: '上午12节'
            },
            helpPlace:{
                type: String,
                default: '北门对面'
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
                default: '阿斯达萨德安抚染发安抚安抚啊发发安抚大风歌大概是大法官大风歌大风歌对方大风歌'
            },
            phone:{
                type: String,
                default: '1231234',
            },
            comment:{
                type: Array,
                default: ()=>["阿萨德刚告诉对方","asdasdda","阿斯达萨德啊啊所多"]
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
</style>

