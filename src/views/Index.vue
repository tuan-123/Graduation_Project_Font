<template>
  <div class="container">
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="footer">
      <div>
        <span class="footer_span" @click="footer_clickIndex">
          <i class="icon iconfont" :style="{color:indexColor}">&#xe601;</i>
        </span>
        <span class="footer_span" @click="footer_clickApp">
          <i class="icon iconfont" :style="{color:appColor}">&#xe602;</i>
        </span>
        <span class="footer_span" @click="footer_clickUser">
          <i class="icon iconfont" :style="{color:userColor}">&#xe63a;</i>
        </span>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: "Index",
        data(){
            return{
                indexColor: '',
                appColor: '',
                userColor: '',
                footer_click_color:{
                    clicked: 'skyblue',
                    unClicked: ''
                },
            }
        },
        created(){
            var currentIndex = this.$route.params.currentIndex;
            if(currentIndex === undefined || currentIndex === 0){
                this.indexColor = this.footer_click_color.clicked;
            }else if(currentIndex === 1){
                this.appColor = this.footer_click_color.clicked;
            }else if(currentIndex === 2){
                this.userColor = this.footer_click_color.clicked;
            }
        },
        methods: {
            footer_clickIndex(){
                var vm = this;
                //console.log(123);
                //切换颜色
                this.indexColor = this.footer_click_color.clicked;
                this.appColor = this.footer_click_color.unClicked;
                this.userColor = this.footer_click_color.unClicked;
                this.$router.push('/main/myIndex');
            },
            footer_clickApp(){
                var vm = this;
                //切换颜色
                this.indexColor = this.footer_click_color.unClicked;
                this.appColor = this.footer_click_color.clicked;
                this.userColor = this.footer_click_color.unClicked;
                this.$router.push('/main/myApp');
            },
            footer_clickUser(){
                var vm = this;
                //切换颜色
                this.indexColor = this.footer_click_color.unClicked;
                this.appColor = this.footer_click_color.unClicked;
                this.userColor = this.footer_click_color.clicked;
                this.$router.push('/main/myUser');
            }
        }
    }
</script>

<style scoped>

  .container{
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
  }
  .main {
    background-color: blue;
    height: 92%;
    color: #333;
    padding: 0 0 0 0;
  }
  .footer {
    background-color: red;
    height: 8%;
    color: #333;
    text-align: center;
    padding: 0 0 0 0;
  }
  .footer div{
    background-color: #795da3;
    height: 100%;
    line-height: 100%;
    padding: 0 0 0 0;
  }
  .footer_span{
    height: 100%;
    line-height: 100%;
    width: 32.6%;
    /*在高度为100%的情况下垂直中*/
    display:inline-flex;
    justify-content:center;
    align-items:center;
  }
  .footer_span i{
    font-size: 50px;
  }
</style>
