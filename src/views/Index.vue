<template>
  <el-container>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer>
      <el-menu>
        <el-row type="flex" class="row-bg">
          <el-col :span="24">
            <div @click="footer_clickIndex">
              <i class="icon iconfont" style="text-align:center;" :style="{color:indexColor}">&#xe601;</i>
            </div>
          </el-col>
          <el-col :span="24">
            <div @click="footer_clickApp">
              <i class="icon iconfont" style="text-align:center;" :style="{color:appColor}">&#xe602;</i>
            </div>
          </el-col>
          <el-col :span="24">
            <div  @click="footer_clickUser">
              <i class="icon iconfont" style="text-align:center;" :style="{color:userColor}">&#xe63a;</i>
            </div>
          </el-col>
        </el-row>

      </el-menu>
    </el-footer>
  </el-container>


</template>

<script>
  import GLOBAL from '../api/global_variable'
    export default{
        name:'Index',
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
        methods:{
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
  .el-container{
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    padding: 0 0 0 0;
  }
  .el-footer {
    /*background-color: #B3C0D1;*/
    color: #333;
    text-align: center;
    line-height: 60px;
    padding: 0 0 0 0;
  }
  .row-bg{
    height: 100%;
    width: 100%;
  }
  .row-bg div div i{
    display: block;
    height: 60px;
    line-height: 60px;
    font-size: 30px;
  }

</style>
