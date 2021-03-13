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
      @loadMore="loadMoreVert2"
      @pulldown="pulldown2"
    >
      <div slot="list" class="nut-vert-list-panel">
        <div v-for="(item,index) in listData" style="margin-bottom: 10px">
          <van-card
            :num="item.num"
            :price="item.price"
            :desc="item.describe"
            :title="item.title"
            :thumb="httpBaseUrl + item.photo"
            @click="toDetail(item.id)"
          >
            <template #tags v-if="item.tab != null && item.tab.length > 0">
              <van-tag plain type="danger" v-for="(i,j) in item.tab" :key="j">{{i}}</van-tag>
            </template>
            <template slot="footer" v-if="userId === item.userId">
              <!-- @click.stop 阻止单机事件继续传播 -->
              <van-button
                size="mini"
                v-if="item.state === '0'"
                @click.stop="clickUpIdle(item.id)">上架</van-button>
              <van-button
                v-if="item.state === '1'"
                size="mini"
                @click.stop="clickCloseIdle(item.id)">下架</van-button>
              <van-button
                size="mini"
                @click.stop="clickDeleteIdle(item.id)">删除</van-button>
            </template>
          </van-card>
        </div>
      </div>
    </nut-scroller>
  </div>
</template>

<script>
    import {Toast} from 'vant';
    import {Dialog} from 'vant';
    import GLOBAL from '../../api/global_variable';
    export default {
        name: "MyIdle",
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
                timer: null,
                userId: window.sessionStorage.getItem('userId')
            }
        },
        created(){
            this.getData('');
        },
        methods:{
            search(){
                this.getData(this.searchValue);
            },
            clear(){
                this.getData('');
            },
            toDetail(id){
                //参数可传一个对象给详细页面
                this.$router.push({
                    path: '/apps/idleDetail',
                    name: 'AppsIdleDetail',
                    params:{
                        id: id,
                        backUrl: '/user/idle'
                    }
                });
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
            loadMoreVert2() {
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
                        //this.page = this.page+1;
                        this.axios({
                            url: '/idle/getIdleBriefListByUserId',
                            method: 'get',
                            params:{
                                userId: window.sessionStorage.getItem('userId'),
                                query: '',
                                currentPage: vm.page + 1,
                                pageSize: vm.pageSize,
                                date: vm.listData[0].createTime
                            }
                        }).then(function(res){
                            if(res.data.code === 200){
                                vm.listData = vm.listData.concat(res.data.data.idleBriefList);
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
            pulldown2() {
                let vm = this;
                this.isLoading = true;
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.isLoading = false;
                    this.isUnMore = false;
                    this.page = 1;
                }, 600);
                this.axios({
                    url: '/idle/getIdleBriefListByUserId',
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
                        vm.listData = res.data.data.idleBriefList;
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
                    message: '加载中...',
                    duration: 0
                });
                this.axios({
                    url: '/idle/getIdleBriefListByUserId',
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
                        //console.log(res);
                        if(res.data.data.length === 0){
                            Toast.fail("空空如也");
                        }else{
                            //console.log(res.data.data);
                            vm.listData = res.data.data.idleBriefList;
                            vm.page = res.data.data.currentPage;
                            vm.maxPage = res.data.data.pages;
                        }
                    }else{
                        Toast.fail(res.data.msg);
                    }
                }).catch(function(err){
                    Toast.clear();
                    Toast.fail("故障啦");
                });
            },
            clickUpIdle(id){
                let vm = this;
                Dialog.confirm({
                    title: '提示',
                    message: '确认上架?'
                }).then(()=>{
                    Toast({
                        type: 'loading',
                        message: '上架中...',
                        duration: 0
                    });
                    this.axios({
                        url: '/idle/upIdleById',
                        method: 'get',
                        params: {
                            id: id
                        }
                    }).then(function (res) {
                        Toast.clear();
                        if(res.data.code === 200){
                            vm.myRefresh(vm.searchValue);
                            Toast.success("上架成功");
                        }else{
                            Toast.fail(res.data.msg);
                        }
                    }).catch(function (err) {
                        Toast.clear();
                        Toast.fail("故障啦");
                    });
                }).catch(()=>{

                });
            },
            clickCloseIdle(id){
                let vm = this;
                Dialog.confirm({
                    title: '提示',
                    message: '确认下架?'
                }).then(()=>{
                    Toast({
                        type: 'loading',
                        message: '下架中...',
                        duration: 0
                    });
                    this.axios({
                        url: '/idle/downIdleById',
                        method: 'get',
                        params: {
                            id: id
                        }
                    }).then(function (res) {
                        Toast.clear();
                        if(res.data.code === 200){
                            vm.myRefresh(vm.searchValue);
                            Toast.success("下架成功");
                        }else{
                            Toast.fail(res.data.msg);
                        }
                    }).catch(function (err) {
                        Toast.clear();
                        Toast.fail("故障啦");
                    });
                }).catch(()=>{

                });
            },
            clickDeleteIdle(id){
                let vm = this;
                Dialog.confirm({
                    title: '提示',
                    message: '确认删除?'
                }).then(()=>{
                    Toast({
                        type: 'loading',
                        message: '删除中...',
                        duration: 0
                    });
                    this.axios({
                        url: '/idle/deleteIdleById',
                        method: 'get',
                        params: {
                            id: id
                        }
                    }).then(function (res) {
                        Toast.clear();
                        if(res.data.code === 200){
                            vm.myRefresh(vm.searchValue);
                            Toast.success("删除成功");
                        }else{
                            Toast.fail(res.data.msg);
                        }
                    }).catch(function (err) {
                        Toast.clear();
                        Toast.fail("故障啦");
                    });
                }).catch(()=>{

                });
            },
            myRefresh(value){
                let vm = this;
                this.axios({
                    url: '/idle/getIdleBriefListByUserId',
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
                        vm.listData = res.data.data.idleBriefList;
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
    background-color: red;
    width: 100%;
    height: 100%;
  }
</style>
