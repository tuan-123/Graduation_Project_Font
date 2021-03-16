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
      :stretch="50"
      :threshold="100"
      :propsTime="100"
      @loadMore="loadMoreVert"
      @pulldown="pulldown"
    >
      <div slot="list" class="nut-vert-list-panel">
        <div class="content" v-for="(item,index) in listData" :key="index" v-if="!isEmpty">
          <MyHelp
            @MyRefresh="myRefresh"
            :id="item.id"
            :user-id="item.userId"
            :username="item.userName"
            :user-img="httpBaseUrl + item.userImg"
            :help-thing="item.article"
            :help-time="item.time"
            :help-place="item.place"
            :help-to="item.to"
            :help-commission="item.fee"
            :help-detail="item.descr"
            :phone="item.phone"
            :photos="item.photos"
            :help-state="item.state"
            :create-time="item.createTime"
            :comment="item.commentVoList"
            :can-accept="item.acceptUserId !== userId"
            :can-phone="item.acceptUserId === userId"
            :can-show-is-accept="false"
          ></MyHelp>
        </div>
        <div v-if="isEmpty">
          <van-empty
            class="custom-image"
            :image="require('../../../assets/img/custom-empty-image.png')"
            description="空空如也"
          />
        </div>
      </div>
    </nut-scroller>
  </div>
</template>

<script>
  import {Toast} from 'vant';
  import GLOBAL from '../../../api/global_variable';
    export default {
        name: "Help",
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
                userId: window.sessionStorage.getItem('userId'),
                isEmpty: true
            }
        },
        created(){
            this.getData("");
        },
        destroyed(){
            clearTimeout(this.timer);
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
                    path: '/main/myApp',
                    name: 'MainMyApp',
                    params:{
                        currentIndex:1
                    }
                })
            },
            loadMoreVert() {
                this.isLoading = true;
                if (this.page >= this.maxPage) {
                    this.isUnMore = true;
                    this.isLoading = false;
                } else {
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        this.isLoading = false;
                        this.isUnMore = false;
                        let vm = this;
                        this.axios({
                            url: '/help/getHelpList',
                            method: 'get',
                            params:{
                                userId: window.sessionStorage.getItem('userId'),
                                query: vm.searchValue,
                                currentPage: vm.page + 1,
                                pageSize: vm.pageSize,
                                date: vm.listData[0].createTime
                            }
                        }).then(function(res){
                            Toast.clear();
                            if(res.data.code === 200){
                                vm.listData = vm.listData.concat(res.data.data.helpVoList);
                                vm.page = res.data.data.currentPage;
                                vm.maxPage = res.data.data.pages;
                            }else{
                                Toast.fail(res.data.msg);
                            }
                        }).catch(function(err){
                            Toast.clear();
                            Toast.fail('故障啦');
                        });
                    }, 600);
                }
                //console.log(this.page);
            },
            pulldown() {
                this.isLoading = true;
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.isLoading = false;
                    this.isUnMore = false;
                    this.page = 1;
                }, 600);
                let vm = this;
                this.axios({
                    url: '/help/getHelpList',
                    method: 'get',
                    params:{
                        userId: window.sessionStorage.getItem('userId'),
                        query: vm.searchValue,
                        currentPage: 1,
                        pageSize: vm.pageSize
                    }
                }).then(function(res){
                    Toast.clear();
                    if(res.data.code === 200){
                        if(res.data.data.helpVoList === null || res.data.data.helpVoList.length === 0){
                            vm.isEmpty = true;
                        }else {
                            vm.isEmpty = false;
                            vm.listData = res.data.data.helpVoList;
                            vm.page = res.data.data.currentPage;
                            vm.maxPage = res.data.data.pages;
                        }
                    }else{
                        Toast.fail('刷新失败');
                    }
                }).catch(function(err){
                    Toast.clear();
                    Toast.fail('故障啦');
                });
            },
            getData(value){
                let vm = this;
                Toast({
                    type: 'loading',
                    message: '获取中...',
                    duration: 0
                });
                this.axios({
                    url: '/help/getHelpList',
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
                        if(res.data.data.helpVoList === null || res.data.data.helpVoList.length === 0){
                            vm.isEmpty = true;
                        }else {
                            vm.isEmpty = false;
                            vm.listData = res.data.data.helpVoList;
                            vm.page = res.data.data.currentPage;
                            vm.maxPage = res.data.data.pages;
                        }
                    }else{
                        Toast.fail(res.data.msg);
                    }
                }).catch(function(err){
                    Toast.clear();
                    Toast.fail('故障啦');
                });
            },
            myRefresh(value){
                //console.log(value);
                let vm = this;
                this.axios({
                    url: '/help/getHelpList',
                    method: 'get',
                    params:{
                        userId: window.sessionStorage.getItem('userId'),
                        query: value,
                        currentPage: 1,
                        pageSize: (vm.pageSize * vm.page),
                        date: (vm.listData !== null ? vm.listData[0].createTime : null)
                    }
                }).then(function(res){
                    if(res.data.code === 200){
                        //console.log(res.data);
                        if(res.data.data.helpVoList === null || res.data.data.helpVoList.length === 0){
                            vm.isEmpty = true;
                        }else {
                            vm.isEmpty = false;
                            vm.listData = res.data.data.helpVoList;
                            // 向上整除
                            let realPage = Math.ceil(res.data.data.total / vm.pageSize);
                            if(vm.maxPage > realPage){
                                vm.maxPage = realPage;
                                vm.page = realPage;
                            }
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
    /*background-color: red;*/
    width: 100%;
    height: 100%;
  }
  .container .content{
    height: auto;
    background-color: skyblue;
  }
  .custom-image{
    padding-top: 50%;
  }
</style>
