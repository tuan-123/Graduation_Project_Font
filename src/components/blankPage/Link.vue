<template>
    <div class="container">
      <div style="position: absolute;top:50%;left:10px;z-index: 10">
        <van-icon size="25" name="arrow-left" @click="back"/>
      </div>
      <iframe :src="url" id="MyFrame" scrolling="auto" frameborder="0"></iframe>
    </div>
</template>

<script>
    export default {
        name: "Link",
        data(){
            return{
                url: '',
                fileList: [],
            }
        },
        created(){
            this.url = this.$route.params.url;
        },
        methods:{
            back(){
                this.$router.push("/index");
            },
        }
    }
</script>

<style scoped>
  .container{
    width: 100%;
    height: 100%;
  }
  .container #MyFrame{
    width: 100%;
    height: 100%;
  }
</style>
