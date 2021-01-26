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
              <i ref="footer_myIndex" class="icon iconfont" style="font-size:30px;text-align:center;color:skyblue">&#xe601;</i>
            </div>
          </el-col>
          <el-col :span="24">
            <div @click="footer_clickApp">
              <i ref="footer_myApp" class="icon iconfont" style="font-size:30px;text-align:center;">&#xe602;</i>
            </div>
          </el-col>
          <el-col :span="24">
            <div  @click="footer_clickUser">
              <i ref="footer_myUser" class="icon iconfont" style="font-size:30px;text-align:center;">&#xe63a;</i>
            </div>
          </el-col>
        </el-row>

      </el-menu>
    </el-footer>
  </el-container>


</template>

<script>

    export default{
        name:'Index',
        data(){
            return{
                footer_click_color:{
                    clicked: 'skyblue',
                    unClicked: ''
                },
            }
        },
        methods:{
            footer_clickIndex(){
                var vm = this;
                //console.log(123);
                //切换颜色
                this.$refs.footer_myApp.style.color = this.footer_click_color.unClicked;
                this.$refs.footer_myUser.style.color = this.footer_click_color.unClicked;
                this.$refs.footer_myIndex.style.color = this.footer_click_color.clicked;
                this.$router.push('/main/myIndex');
            },
            footer_clickApp(){
                var vm = this;
                //切换颜色
                this.$refs.footer_myIndex.style.color = this.footer_click_color.unClicked;
                this.$refs.footer_myUser.style.color = this.footer_click_color.unClicked;
                this.$refs.footer_myApp.style.color = this.footer_click_color.clicked;
                this.$router.push('/main/myApp');

            },
            footer_clickUser(){
                var vm = this;
                //切换颜色
                this.$refs.footer_myIndex.style.color = this.footer_click_color.unClicked;
                this.$refs.footer_myApp.style.color = this.footer_click_color.unClicked;
                this.$refs.footer_myUser.style.color = this.footer_click_color.clicked;
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
    text-align: center;
    line-height: 1200px;
    padding: 0 0 0 0;
  }

  .el-footer {
    /*background-color: #B3C0D1;*/
    color: #333;
    text-align: center;
    line-height: 130px;
    padding: 0 0 0 0;
  }

  .row-bg{
    height: 100%;
    width: 100%;
  }

</style>
