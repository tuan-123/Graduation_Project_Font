<template>
    <div class="container">
      <div class="header">
        <span>应&#9用</span>
      </div>
      <div class="body">
        <div class="grid">
          <van-grid
            square
            :column-num="2"
            :gutter="30"
            :icon-size="90"
            :clickable="true"
          >
            <van-grid-item
              :icon="require('../../assets/img/IDLEPIC.png')"
              text="闲置"
              @click="clickIdle"
            />
            <van-grid-item
              :icon="require('../../assets/img/HELP.jpg')"
              text="帮代"
              @click="clickHelp" />
            <van-grid-item
              :icon="require('../../assets/img/MAP.jpg')"
              text="疫情地图"
              @click="clickEpidemicMap"
            />
            <!--<van-grid-item icon="photo-o" text="文字" />-->
          </van-grid>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "MyApp",
        methods:{
            test(){
                console.log(123)
            },
            clickIdle(){
                this.$router.push('/apps/idle');
            },
            clickEpidemicMap(){
                this.$router.push('/epidemic/map');
            },
            clickHelp(){
                this.$router.push('/apps/help');
            },
            clickAsk(){

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
  .header{
    background-color: #ffffff;
    color: skyblue;
    height: 7%;
    width: 100%;
    font-size: 45px;
    text-align: center;
    /*垂直居中*/
    display:inline-flex;
    justify-content:center;
    align-items:center;
  }
  .body{
    background-color: #ededed;
    height: 90%;
    width: 100%;
  }
  .body .grid{
    width: 90%;
    margin: 0 auto;
    padding-top: 5%;
  }
</style>
