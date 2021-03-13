<template>
  <div class="container">
    <div>
      <van-search
        v-model="searchValue"
        shape="round"
        background="#4fc08d"
        placeholder="请输入搜索关键词"
        @search="search"
        @clear="clear"
      >
        <template #left>
          <div @click="back" style="padding-right: 10px">
            <van-icon name="arrow-left" size="25"/>
          </div>
        </template>
      </van-search>
    </div>
    <nut-scroller
      :is-un-more="isUnMore"
      :is-loading="isLoading"
      :type="'vertical'"
      @loadMore="loadMoreVert"
      @pulldown="pulldown"
    >
      <div slot="list" class="nut-vert-list-panel">
        <div class="content" v-for="(item,index) in listData" :key="index">
          <!--@MyRefresh是监听子组件  子组件通过this.$emit主动触发父组件函数 -->
          <MyComment
            :id="item.id"
            :userId="item.userId"
            :user-img="httpBaseUrl + item.userImg"
            :username="item.userName"
            :content="item.content"
            :photos="item.photos"
            :comment="item.commentVoList"
            :hasResolve="item.hasResolve"
            :create-time="item.createTime"
            @MyRefresh="myRefresh"
          ></MyComment>
        </div>
      </div>
    </nut-scroller>
  </div>
</template>

<script>
  import {Toast} from 'vant';
  import GLOBAL from '../../api/global_variable';
    export default {
        name: "Comment",
        data(){
            return{
                httpBaseUrl: GLOBAL.httpBaseUrl,
                searchValue: '',
                isUnMore: false,
                isLoading: false,
                listData: [],
                page: 1,
                maxPage: 1,
                pageSize: 10,
                timer: null

            }
        },
        created(){
            this.getData("");
        },
        methods:{
            search(){
                this.getData(this.searchValue);
            },
            clear(){
                this.getData("");
            },
            back(){
                this.$router.push({
                    path: '/main/myUser',
                    name: 'MainMyUser',
                    params:{
                        currentIndex:2
                    }
                })
            },
            /*loadMoreVert2() {
                this.isLoading2 = true;
                if (this.page2 > this.maxPages2) {
                    this.isUnMore2 = true;
                    this.isLoading2 = false;
                } else {
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        this.isLoading2 = false;
                        this.isUnMore2 = false;
                        this.listData2 = new Array(20 * this.page2);
                        this.page2 = this.page2+1;
                    }, 300);
                }
            },

            pulldown2() {
                this.isLoading2 = true;
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.isLoading2 = false;
                    this.isUnMore2 = false;
                    this.listData2 = new Array(10);
                    this.page2 = 1;
                }, 300);
            },*/
            loadMoreVert() {
                this.isLoading = true;
                if (this.page >= this.maxPage) {
                    this.isUnMore = true;
                    this.isLoading = false;
                } else {
                    clearTimeout(this.timer);
                    let vm = this;
                    this.timer = setTimeout(() => {
                        this.isLoading = false;
                        this.isUnMore = false;
                        this.axios({
                            url: '/ask/getAskListByUserId',
                            method: 'get',
                            params:{
                                userId: window.sessionStorage.getItem('userId'),
                                query: vm.searchValue,
                                currentPage: vm.page + 1,
                                pageSize: vm.pageSize,
                                date: vm.listData[0].createTime
                            }
                        }).then(function(res){
                            if(res.data.code === 200){
                                vm.listData = vm.listData.concat(res.data.data.askVoList);
                                vm.page = res.data.data.currentPage;
                                vm.maxPage = res.data.data.pages;
                            }else{
                                Toast.fail("请求失败");
                            }
                        }).catch(function (err) {
                            Toast.fail("故障啦");
                        })
                    }, 600);
                }
                //console.log(this.page);
            },
            pulldown() {
                let vm = this;
                this.isLoading = true;
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.isLoading = false;
                    this.isUnMore = false;
                    this.page = 1;
                }, 600);
                this.axios({
                    url: '/ask/getAskListByUserId',
                    method: 'get',
                    params: {
                        userId: window.sessionStorage.getItem('userId'),
                        query: vm.searchValue,
                        currentPage: 1,
                        pageSize: vm.pageSize
                    }
                }).then(function (res) {
                    if(res.data.code === 200){
                        vm.listData = [];
                        vm.listData = res.data.data.askVoList;
                        vm.page = res.data.data.currentPage;
                        vm.maxPage = res.data.data.pages;
                    }else{
                        Toast.fail("刷新失败");
                    }
                }).catch(function (err) {
                    Toast.fail("故障啦");
                })
            },
            getData(value){
                let vm = this;
                Toast({
                    type: 'loading',
                    message: '获取中...',
                    duration: 0
                });
                this.axios({
                    url: '/ask/getAskListByUserId',
                    method: 'get',
                    params:{
                        userId: window.sessionStorage.getItem('userId'),
                        query: value,
                        currentPage: 1,
                        pageSize: vm.pageSize
                    }
                }).then(function(res){
                    Toast.clear();
                    if(res.data.code === 200){
                        //console.log(res.data.data);
                        vm.listData = res.data.data.askVoList;
                        vm.page = res.data.data.currentPage;
                        vm.maxPage = res.data.data.pages;

                    }else{
                        Toast.fail(res.data.msg);
                    }
                }).catch(function(err){
                    Toast.clear();
                    Toast.fail("故障啦");
                });
            },
            myRefresh(){
                //console.log("1111");
                let vm = this;
                this.axios({
                    url: '/ask/getAskListByUserId',
                    method: 'get',
                    params:{
                        userId: window.sessionStorage.getItem('userId'),
                        query: vm.searchValue,
                        currentPage: 1,
                        pageSize: (vm.pageSize * vm.page),
                        date: (vm.listData !== null ? vm.listData[0].createTime : null)
                    }
                }).then(function(res){
                    if(res.data.code === 200){
                        //console.log(res.data.data);
                        vm.listData = res.data.data.askVoList;
                        //vm.page = res.data.data.currentPage;
                        //vm.maxPage = res.data.data.pages;
                        // 向上整除
                        let realPage = Math.ceil(res.data.data.total / vm.pageSize);
                        if(vm.maxPage > realPage){
                            vm.maxPage = realPage;
                            vm.page = realPage;
                        }

                    }else{
                        Toast.fail(res.data.msg);
                    }
                }).catch(function(err){
                    Toast.fail("故障啦");
                });
            }
        }
    }
</script>

<style scoped>
 .container{
   width: 100%;
   height: 100%;
 }
 .container .content{
   height: auto;
   background-color: skyblue;
 }
</style>
