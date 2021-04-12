<template>
  <div class="container">
    <!--记得改个背景圆形-->
    <div style="position: absolute;top:10px;left:10px;z-index: 10">
      <van-icon size="25" name="arrow-left" @click="back"/>
    </div>
    <div class="swipe">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="httpBaseUrl + image" class="imgSize" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="content" v-if="title !== ''">
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
    <div class="comment" v-if="comment.length > 0">
      <!--评论内容 在 content属性里-->
      <div v-for="(item,index) in comment">
        <span style="color:dodgerblue">{{index + 1}}楼:&#9</span>
        <span>{{item.content}}</span>
      </div>
    </div>
    <div style="width:100%;position: fixed;bottom: 0" v-show="showCommentInput">
        <span style="display: inline-block;float:left;width: 79%;margin-right: 1%">
        <nut-textinput
          class="my-input"
          v-model="inputValue"
          placeholder="留下您的想法叭"
          :clearBtnPersonnal="true"
        />
        </span>
      <span style="display: inline-block;float:left;width: 20%">
          <van-button round color="red" @click="submitComment">留言</van-button>
        </span>
    </div>
  </div>
</template>

<script>
    import {Toast} from 'vant'
    import GLOBAL from '../../api/global_variable'
    export default {
        name: "MyIdleDetail",
        data(){
            return{
                httpBaseUrl: GLOBAL.httpBaseUrl,
                inputValue: '',
                showCommentInput: false,
                show:false,
                comment: this.commentList,
            }
        },
        watch: {
            commentList(newVal,oldVal){
                this.comment = newVal;
            }
        },
        props:{
            id: {
                type: Number,
                default: ''
            },
            price: {
                type: Number,
                default: 0.00
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
            submitComment(){
                //判断是否为空串或纯为空格
                if(this.inputValue !== '' && this.inputValue.trim().length > 0){
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
                            content: vm.inputValue
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
                    this.inputValue = '';
                }
                //console.log(this.id); // props 的 id
                this.inputValue = '';
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
    background-color: skyblue;
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
    background-color: #ededed;
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
    background-color: skyblue;
    height: 35px;
    width: 94%;
  }
</style>
