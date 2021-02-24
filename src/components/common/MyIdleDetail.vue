<template>
  <div class="container">
    <!--记得改个背景圆形-->
    <div style="position: absolute;top:10px;left:10px;z-index: 10">
      <van-icon size="25" name="arrow-left" @click="back"/>
    </div>
    <div class="swipe">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" class="imgSize" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="content">
      <div>
        <div>
          <span class="priceSymbol">￥</span>
          <span class="price">{{price}}</span>

          <span style="position: relative;top:5px;right:10px;float:right;" @click="contact">
              <van-icon name="phone-o" size="35px" color="blue"/>
            </span>
        </div>
        <div style="margin-top: 3%">
          <!--<span class="tab" v-for='(item,index) in tabList'>{{item}}</span>-->
          <van-tag style="margin-right: 10px;" plain type="danger" v-for="(item,index) in tabList" :key="index">{{item}}</van-tag>
        </div>
        <div style="margin-top: 3%" class="title">
          {{title}}
        </div>
        <div style="margin-top: 3%" class="describe">
          {{describe}}
        </div>
      </div>
      <div class="icon">
          <span style="display:inline-block;width: 50%;text-align: center;float: left;">
            <van-icon name="comment-o" size="25px" @click="clickComment"/>
          </span>
        <span style="display:inline-block;width: 50%;text-align: center;float:left">
            <van-icon name="star-o" size="25px" @click="clickStar"/>
          </span>
      </div>
      <nut-popup v-model="show" round position="bottom" closeable class="popup">{{phone}}</nut-popup>
    </div>
    <div class="comment">
      <div v-for="(item,index) in commentList">
        <span style="color:red">{{index + 1}}楼:&#9</span>
        <span>{{item}}</span>
      </div>
    </div>
    <div style="width:100%;position: fixed;bottom: 0" v-show="showCommentInput">
        <span style="display: inline-block;float:left;width: 79%;margin-right: 1%">
        <nut-textinput
          class="my-input"
          v-model="inputValue"
          placeholder="评论"
          :clearBtnPersonnal="true"
        />
        </span>
      <span style="display: inline-block;float:left;width: 20%">
          <van-button round color="red" @click="comment">评论</van-button>
        </span>
    </div>
  </div>
</template>

<script>
    import {Toast} from 'vant'
    export default {
        name: "MyIdleDetail",
        data(){
            return{
                inputValue: '',
                showCommentInput: false,
                show:false,

            }
        },
        props:{
            id:{
                type: String,
                default:''
            },
            price: {
                type: String,
                default: '0.00'
            },
            tabList:{
                type: Array,
                default: ()=>[]
            },
            title: {
                type: String,
                default: ''
            },
            describe: {
                type: String,
                default: ''
            },
            images:{
                type:Array,
                default: ()=>[]
            },
            phone: {
                type: String,
                default: ''
            },
            commentList:{
                type: Array,
                default: ()=> []
            },
            backUrl:{
                type: String,
                default: ''
            }

        },
        methods:{
            back(){
                this.$router.push(this.backUrl);
            },
            contact(){
                this.show = true;
            },
            clickComment(){
                this.showCommentInput = !this.showCommentInput;
            },
            clickStar(){
                Toast.fail("还未开发");
            },
            comment(){
                if(this.inputValue !== ''){
                    console.log(this.inputValue);
                    Toast.success('评论成功');
                    this.inputValue = '';
                }
                this.showCommentInput = false;
            }
        }
    }
</script>

<style scoped>
  .container{
    width: 100%;
    height: auto;
  }
  .container .swipe{
    width: 100%;
    height: 500px;
  }
  .container .swipe .imgSize{
    width: 100%;
    height: 500px;
  }
  .container .content{
    margin-top: 30px;
    width: 94%;
    height: auto;
    margin-left: 3%;
    border-radius: 3%;
    background-color: skyblue;
    padding-bottom: 10px;
  }
  .content>div{
    width: 94%;
    margin-left: 3%;
    padding: 10px 0px;
    background-color: whitesmoke;
  }
  .content .priceSymbol{
    color: red;
    font-size: 35px;
  }
  .content .price{
    color: red;
    font-size: 50px;
  }
  /*.tab{
    font-size: 30px;
    padding: 5px 10px;
    color: red;
    border: solid 2px red;
    border-radius: 20px;
    margin-right: 15px;
  }*/
  .content .title{
    font-size: 40px;
    font-weight: bold;
  }
  .content .describe{
    font-size: 32px;
  }
  .popup{
    height: 150px;
    line-height: 150px;
    font-size: 50px;
    text-align: center;
  }
  .container .comment{
    margin-top: 30px;
    width: 94%;
    height: auto;
    margin-left: 3%;
    border-radius: 3%;
    background-color: skyblue;
    padding-top: 10px;
    padding-bottom: 15px;
  }
  .container .comment>div{
    word-break: break-all;
    font-size: 33px;
    margin-top: 10px;
    padding-left: 15px;
    padding-right: 15px;
  }
  .content .icon{
    background-color: yellow;
    height: 35px;
    width: 94%;
  }
</style>
