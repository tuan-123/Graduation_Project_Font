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
    <scroller style="position: relative;top: 5px" :on-refresh="pulldown" :on-infinite="loadMoreVert" refresh-text="正在刷新" no-data-text="--我是有底线的哦--" ref="scrollerBtn">
      <div class="content" v-for="(item,index) in listData" :key="index" v-if="!isEmpty">
        <MyHelp
          @MyCloseCommentInput="myCloseCommentInput"
          @MyCommentInput="myCommentInput"
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
          :accept-user-id="item.acceptUserId"
          :create-time="item.createTime"
          :comment="item.commentVoList"
          :can-accept="false"
          :can-phone="true"
          :can-show-is-accept="false"
          :can-show-time-ago="true"
        ></MyHelp>
      </div>
      <div v-if="isEmpty">
        <van-empty
          class="custom-image"
          :image="require('../../assets/img/custom-empty-image.png')"
          description="空空如也"
        />
      </div>
    </scroller>
    <nut-backtop :bottom="40" :right="40" :distance="0" style="display: flex" v-if="!showCommentInput">
      <div
        style="
              color: rgb(255, 255, 255);
              display: flex;
              height: 32px;
              width: 32px;
              align-items: center;
              justify-content: center;"
        @click="backToTop"><van-image :src="require('../../assets/img/backToTop.png')"></van-image></div>
    </nut-backtop>
    <!--<nut-scroller
      :is-un-more="isUnMore"
      :is-loading="isLoading"
      :type="'vertical'"
      @loadMore="loadMoreVert"
      @pulldown="pulldown"
      @scrollChange="scrollChange"
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
            :accept-user-id="item.acceptUserId"
            :create-time="item.createTime"
            :comment="item.commentVoList"
            :can-accept="false"
            :can-phone="true"
            :can-show-is-accept="false"
          ></MyHelp>
        </div>
        <div v-if="isEmpty">
          <van-empty
            class="custom-image"
            :image="require('../../assets/img/custom-empty-image.png')"
            description="空空如也"
          />
        </div>
      </div>
    </nut-scroller>-->
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
    import {Toast} from 'vant';
    import GLOBAL from '../../api/global_variable';
    export default {
        name: "MyAcceptHelp",
        data(){
            return {
                httpBaseUrl: GLOBAL.httpBaseUrl,
                searchValue: '',
                isUnMore: false,
                isLoading: false,
                listData: [],
                page: 1,
                maxPage: 1,
                pageSize: 10,
                timer: null,

                isEmpty: true,
                inputValue: '',
                showCommentInput: false,
                commentId:0,
            }
        },
        created(){
            this.getData("");
        },
        methods:{
            back(){
                this.$router.push({
                    path: '/main/myUser',
                    name: 'MainMyUser',
                    params:{
                        currentIndex:2
                    }
                })
            },
            search(){
                this.$refs.scrollerBtn.scrollTo(0,0,false);
                this.getData(this.searchValue);
            },
            clear(){
                this.$refs.scrollerBtn.scrollTo(0,0,false);
                this.getData("");
            },
            loadMoreVert(){
                this.inputValue = '';
                this.showCommentInput = false;
                this.isLoading = true;
                if (this.page >= this.maxPage) {
                    /*this.isUnMore = true;
                    this.isLoading = false;*/
                    this.$refs.scrollerBtn.finishInfinite(true);
                } else {
                    clearTimeout(this.timer);
                    let vm = this;
                    this.timer = setTimeout(() => {
                        this.isLoading = false;
                        this.isUnMore = false;
                        //this.page = this.page+1;
                        this.axios({
                            url: '/help/GetAcceptedHelpByAcceptUserId',
                            method: 'get',
                            params:{
                                userId: window.sessionStorage.getItem('userId'),
                                query: '',
                                currentPage: vm.page + 1,
                                pageSize: vm.pageSize,
                                date: (vm.listData !== null ? vm.listData[0].createTime : null)
                            }
                        }).then(function(res){
                            vm.$refs.scrollerBtn.finishInfinite(false);
                            if(res.data.code === 200){
                                vm.listData = vm.listData.concat(res.data.data.helpVoList);
                                vm.page = res.data.data.currentPage;
                                vm.maxPage = res.data.data.total;
                            }else{
                                Toast.fail("请求失败");
                            }
                        }).catch(function (err) {
                            vm.$refs.scrollerBtn.finishInfinite(false);
                            Toast.fail("故障啦");
                        })
                    }, 600);
                }
            },
            pulldown(){
                this.inputValue = '';
                this.showCommentInput = false;
                let vm = this;
                /*this.isLoading = true;
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.isLoading = false;
                    this.isUnMore = false;
                    //this.page = 1;
                }, 600);*/
                this.axios({
                    url: '/help/GetAcceptedHelpByAcceptUserId',
                    method: 'get',
                    params: {
                        userId: window.sessionStorage.getItem('userId'),
                        query: vm.searchValue,
                        currentPage: 1,
                        pageSize: vm.pageSize,
                    }
                }).then(function (res) {
                    vm.$refs.scrollerBtn.finishPullToRefresh();
                    if(res.data.code === 200){
                        vm.listData = [];
                        if(res.data.data.helpVoList === null || res.data.data.helpVoList.length === 0){
                            vm.isEmpty = true;
                        }else {
                            vm.isEmpty = false;
                            vm.listData = res.data.data.helpVoList;
                            vm.page = res.data.data.currentPage;
                            vm.maxPage = res.data.data.pages;
                        }
                    }else{
                        Toast.fail("刷新失败");
                    }
                }).catch(function (err) {
                    vm.$refs.scrollerBtn.finishPullToRefresh();
                    Toast.fail("故障啦");
                })
            },
            getData(value){
                this.inputValue = '';
                this.showCommentInput = false;
                let vm = this;
                Toast({
                    type: 'loading',
                    message: '获取中...',
                    duration: 0
                });
                this.axios({
                    url: '/help/GetAcceptedHelpByAcceptUserId',
                    method: 'get',
                    params:{
                        userId: window.sessionStorage.getItem('userId'),
                        query: value,
                        currentPage: 1,
                        pageSize: vm.pageSize
                    }
                }).then(function (res) {
                    Toast.clear();
                    if(res.data.code === 200){
                        console.log(res);
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
                }).catch(function (err) {
                    Toast.clear();
                    Toast.fail("故障啦");
                    console.log(err);
                });
            },
            myRefresh(value){
                //console.log(value);
                let vm = this;
                this.axios({
                    url: '/help/getHelpListByUserId',
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
            },
            scrollChange(height){

            },
            backToTop(){
                this.$refs.scrollerBtn.scrollTo(0,0,true);
            },
            myCommentInput(id){
                this.inputValue = '';
                if(id === this.commentId){
                    this.showCommentInput = !this.showCommentInput;
                }else{
                    this.commentId = id;
                    this.showCommentInput = true;
                }
            },
            submitComment(){
                let vm = this;
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
                            parentId: vm.commentId,
                            userId: window.sessionStorage.getItem('userId'),
                            content: vm.inputValue
                        }
                    }).then(function (res) {
                        Toast.clear();
                        if(res.data.code === 200){
                            //console.log(res);
                            vm.listData.find(item => item.id === vm.commentId).commentVoList = res.data.data;
                            Toast.success('评论成功');
                        }else{
                            Toast.fail(res.data.msg);
                        }
                    }).catch(function(err){
                        Toast.clear();
                        Toast.fail("故障啦");
                    });
                    this.inputValue = '';
                    this.showCommentInput = false;
                }else{
                    this.inputValue = '';
                    this.showCommentInput = false;
                }
            },
            myCloseCommentInput(){
                this.inputValue = '';
                this.showCommentInput = false;
            },
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
    background-color: #ffffff;
  }
  .custom-image{
    padding-top: 50%;
  }
</style>
