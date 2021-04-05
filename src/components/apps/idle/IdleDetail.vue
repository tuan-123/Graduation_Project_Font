<template>
  <div>
    <MyIdleDetail
      :backUrl="backUrl"
      :commentList="commentList"
      :phone="phone"
      :title="title"
      :describe="describe"
      :price="price"
      :images="images"
      :tab-list="tabList"
      :id="id"
    ></MyIdleDetail>
  </div>
</template>

<script>
  import {Toast} from 'vant';
    export default {
        name: "IdleDetail",
        data(){
            return{
                backUrl: '',
                id: 0,
                price: 0.00,
                tabList: [],
                title: '',
                describe: '',
                images: [],
                phone: '',
                commentList: []
            }
        },
        created() {
            let vm = this;
            this.backUrl = this.$route.params.backUrl;
            this.id = this.$route.params.id;
            Toast({
                type: 'loading',
                message: '获取中...',
                duration: 0
            });
            this.axios({
                url: '/idle/getDetailById',
                method: 'get',
                params:{
                    id: vm.id
                }
            }).then(function(res){
                //console.log(res);
                Toast.clear();
                if(res.data.code === 200){
                    //console.log(res.data.data);
                    vm.title = res.data.data.title;
                    vm.describe = res.data.data.describe;
                    vm.phone = res.data.data.phone;
                    vm.price = res.data.data.price;
                    vm.tabList = res.data.data.tab;
                    vm.images = res.data.data.photo;
                    vm.commentList = res.data.data.comments
                }else{
                    //Toast.fail("获取失败");
                    Toast.fail("商品已下架");
                    this.$router.push("/apps/idle");
                }
            }).catch(function(err){
                Toast.clear();
                Toast.fail("故障啦");
            });
        }
    }
</script>

<style scoped>

</style>
