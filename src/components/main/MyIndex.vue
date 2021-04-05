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
        <!--<template #action>
          <van-popover
            v-model="showPopover"
            trigger="click"
            :actions="actions"
            @select="onSelect"
          >
            <template #reference>
              <van-button type="primary">风格</van-button>
            </template>
          </van-popover>
        </template>-->
      </van-search>
    </div>
    <div>
      <van-notice-bar
        left-icon="volume-o"
        scrollable
        v-if="notice.noticeText !== ''"
        :text="notice.noticeText"
        @click="clickNotice"
      />
    </div>
    <!--<div class="swipe">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index" @click="swipeClick(index)">
          <img v-lazy="image" class="imgSize" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="content">
      <MyComment id="25789" username="123" content="254" :comment="comment"></MyComment>
      <nut-backtop>
      </nut-backtop>
    </div>-->
    <!--<nut-infiniteloading
      @loadmore="onInfinite"
      :is-show-mod="true"
      :has-more="isHasMore"
      :is-loading="isLoading"
      :threshold="200"
    >
      <ul class="list" >
        <li
          class="list-item"
          v-for="(item, index) of data"
          :key="item"
        >我是测试数据{{index + 1}}</li>
      </ul>
    </nut-infiniteloading>-->
    <scroller style="position: relative;top: 5px" :on-refresh="pulldown" :on-infinite="loadMoreVert" refresh-text="正在刷新" no-data-text="--我是有底线的哦--" ref="scrollerBtn">
      <div class="swipe" v-if="images.length > 0">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in images" :key="index" @click="swipeClick(index)">
            <img v-lazy="httpBaseUrl + image.img" class="imgSize" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="content" v-for="(item,index) in commentObject" :key="index" v-if="!isEmpty">
        <MyComment
          @MyCloseCommentInput="myCloseCommentInput"
          @MyCommentInput="myCommentInput"
          @MyRefresh="myRefresh"
          :id="item.id"
          :userId="item.userId"
          :user-img="httpBaseUrl + item.userImg"
          :username="item.userName"
          :content="item.content"
          :photos="item.photos"
          :comment="item.commentVoList"
          :hasResolve="item.hasResolve"
          :create-time="item.createTime"
        ></MyComment>
      </div>
      <div v-if="isEmpty">
        <van-empty
          class="custom-image"
          :image="require('../../assets/img/custom-empty-image.png')"
          description="空空如也"
        />
      </div>
    </scroller>
    <!--<nut-scroller
      :is-un-more="isUnMore"
      :is-loading="isLoading"
      :type="'vertical'"
      @loadMore="loadMoreVert"
      @pulldown="pulldown"
      @scrollChange="scrollChange"
    >
      <div slot="list" class="nut-vert-list-panel">
        <div class="swipe" v-if="images.length > 0">
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index" @click="swipeClick(index)">
              <img v-lazy="httpBaseUrl + image.img" class="imgSize" />
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="content" v-for="(item,index) in commentObject" v-if="!isEmpty">
          <MyComment
            @MyRefresh="myRefresh"
            :id="item.id"
            :userId="item.userId"
            :user-img="httpBaseUrl + item.userImg"
            :username="item.userName"
            :content="item.content"
            :photos="item.photos"
            :comment="item.commentVoList"
            :hasResolve="item.hasResolve"
            :create-time="item.createTime"
          ></MyComment>
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
    <nut-backtop :bottom="70" :right="30" :distance="0" style="display: flex"  v-if="!showCommentInput">
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

    <nut-drag direction="y" :style="{left:'0px',top:'300px'}">
      <nut-fixednav :active.sync="myActive" type="left" @selected="selected" :nav-list="navList">
        <template slot="btn" @click="myActive=!myActive">
          <img style="width:20px;height:20px"
               :src="require('../../assets/img/993e.png')" />
          <span>{{myActive?'收起导航':'发布导航'}}</span>
        </template>
      </nut-fixednav>
    </nut-drag>

    <div style="width:100%;position: fixed;bottom: 8%" v-show="showCommentInput">
        <span style="display: inline-block;float:left;width: 79%;margin-right: 1%">
        <nut-textinput
          class="my-input"
          v-model="inputValue"
          placeholder="评论"
          :clearBtnPersonnal="true"
        />
        </span>
      <span style="display: inline-block;float:left;width: 20%">
          <van-button round color="red" @click="submitComment">评论</van-button>
        </span>
    </div>
  </div>
</template>

<script>
  import GLOBAL from '../../api/global_variable';
  import {Toast} from 'vant';
    export default {
        name: "MyIndex",
        data(){
            return{
                searchValue: '',
                notice:{
                    noticeText: '',
                    noticeUrl: '',
                },
                images:[
                    /*{
                        img: 'https://img01.yzcdn.cn/vant/apple-1.jpg',
                        url: 'https://weibo.com/6364463717/K4PyolSSr'
                    },
                    {
                        img: 'https://img01.yzcdn.cn/vant/apple-2.jpg',
                        url: 'https://weibo.com/6364463717/K4PyolSSr'
                    },
                    {
                        img: 'https://img01.yzcdn.cn/vant/apple-3.jpg',
                        url: 'https://www.baidu.com'
                    },
                    {
                        img: 'https://img01.yzcdn.cn/vant/apple-4.jpg',
                        url: ''
                    }*/
                ],

                showPopover: false,
                actions: [{ text: '选项一' }, { text: '选项二' }, { text: '选项三' }],

                commentObject:[],

                httpBaseUrl: GLOBAL.httpBaseUrl,
                isUnMore: false,
                isLoading: false,
                page: 1,
                maxPage: 1,
                pageSize: 10,
                timer: null,

                isEmpty: true,


                myActive: false,
                navList: [
                    {
                        id: 1,
                        text: '闲置',
                        icon: require('../../assets/img/idle.png')
                    },
                    {
                        id: 2,
                        text: '提问',
                        icon: require('../../assets/img/ask.png')
                    },
                    {
                        id: 3,
                        text: '帮代',
                        /*num: 2,*/
                        icon: require('../../assets/img/help.png')
                    },
                ],

                inputValue: '',
                showCommentInput: false,
                commentId:0,
            }
        },
        mounted() {
            //获取notice数据
            //获取swipe数据
            //获取列表数据
            this.getData("");
            this.getNotice();
            this.getCarouselMapList();
        },
        destroyed(){
            clearTimeout(this.timer);
        },
        methods:{
            clickNotice(){
                if(this.notice.noticeUrl !== null && this.notice.noticeUrl !== undefined && this.notice.noticeUrl !== ''){
                    this.$router.push({
                        path: "/link/blank",
                        name: "linkBlank",
                        params:{
                            url: this.notice.noticeUrl
                        }
                    });
                }
            },
            swipeClick(index){
                //console.log(index);
                //console.log(this.images[index].url);
                let url = this.images[index].url;
                if(url !== null && url !== undefined && url !== ''){
                    this.$router.push({
                        path: '/link/blank',
                        name: 'linkBlank',
                        params:{
                            url: url
                        }
                    })
                }
            },
            search(value){
                //console.log(value);
                this.getData(value);
                this.$refs.scrollerBtn.scrollTo(0,0,false);
            },
            clear(){
                this.getData("");
                this.$refs.scrollerBtn.scrollTo(0,0,false);

            },

            onSelect(action) {
                //console.log(action.text);
            },



            /*onInfinite () {
                this.isLoading = true;
                this.timer = setTimeout(() => {
                    if (this.page <= 5) {
                        this.data = new Array(this.num * this.page);
                        this.page = this.page + 1;
                    } else {
                        this.isHasMore = false;
                    }
                    this.isLoading = false;
                }, 100);
            },*/

            selected($event) {
                //let item = $event.item;
                //console.log(item.id);
                let itemId = $event.item.id;
                switch (itemId) {
                    case 1:{
                        this.$router.push('/issue/idleIssue');
                    }
                    break;
                    case 2:{
                        this.$router.push('/issue/askIssue');
                    }
                    break;
                    case 3:{
                        this.$router.push('/issue/helpIssue');
                    }
                    break;
                }
            },

            loadMoreVert() {
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
                        this.axios({
                            url: '/ask/getAskList',
                            method: 'get',
                            params:{
                                userId: window.sessionStorage.getItem('userId'),
                                query: vm.searchValue,
                                currentPage: vm.page + 1,
                                pageSize: vm.pageSize,
                                date: vm.commentObject[0].createTime
                            }
                        }).then(function(res){
                            vm.$refs.scrollerBtn.finishInfinite(false);
                            if(res.data.code === 200){
                                // 注意，concat方法连接两个数组，但不会改变原有数组。
                                vm.commentObject = vm.commentObject.concat(res.data.data.askVoList);
                                vm.page = res.data.data.currentPage;
                                vm.maxPage = res.data.data.pages;
                            }else{
                                Toast.fail("请求失败");
                            }
                        }).catch(function (err) {
                            vm.$refs.scrollerBtn.finishInfinite(false);
                            Toast.fail("故障啦");
                        })
                    }, 600);
                }
                //console.log(this.page);
            },
            pulldown() {
                this.inputValue = '';
                this.showCommentInput = false;
                let vm = this;
                /*this.isLoading = true;
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.isLoading = false;
                    this.isUnMore = false;
                    this.page = 1;
                }, 600);*/
                this.page = 1;
                this.axios({
                    url: '/ask/getAskList',
                    method: 'get',
                    params: {
                        userId: window.sessionStorage.getItem('userId'),
                        query: vm.searchValue,
                        currentPage: 1,
                        pageSize: vm.pageSize
                    }
                }).then(function (res) {
                    if(res.data.code === 200){
                        vm.$refs.scrollerBtn.finishPullToRefresh();
                        vm.commentObject = [];
                        if(res.data.data.askVoList === null || res.data.data.askVoList.length === 0){
                            vm.isEmpty = true;
                        }else {
                            vm.isEmpty = false;
                            vm.commentObject = res.data.data.askVoList;
                            vm.page = res.data.data.currentPage;
                            vm.maxPage = res.data.data.pages;
                        }
                    }else{
                        Toast.fail("刷新失败");
                    }
                }).catch(function (err) {
                    vm.$refs.scrollerBtn.finishPullToRefresh();
                    Toast.fail("故障啦");
                });
                this.getNotice();
                this.getCarouselMapList();
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
                    url: '/ask/getAskList',
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
                        if(res.data.data.askVoList === null || res.data.data.askVoList.length === 0){
                            vm.isEmpty = true;
                        }else {
                            vm.isEmpty = false;
                            vm.commentObject = res.data.data.askVoList;
                            vm.page = res.data.data.currentPage;
                            vm.maxPage = res.data.data.pages;
                        }

                    }else{
                        Toast.fail(res.data.msg);
                    }
                }).catch(function(err){
                    Toast.clear();
                    Toast.fail("故障啦");
                    //console.log(err)
                });
            },
            myRefresh(){
                //console.log("1111");
                let vm = this;
                this.axios({
                    url: '/ask/getAskList',
                    method: 'get',
                    params:{
                        userId: window.sessionStorage.getItem('userId'),
                        query: vm.searchValue,
                        currentPage: 1,
                        pageSize: (vm.pageSize * vm.page),
                        date: (vm.commentObject !== null?vm.commentObject[0].createTime:null)
                    }
                }).then(function(res){
                    if(res.data.code === 200){
                        if(res.data.data.askVoList === null || res.data.data.askVoList.length === 0){
                            vm.isEmpty = true;
                        }else {
                            vm.isEmpty = false;
                            //console.log(res.data.data);
                            vm.commentObject = res.data.data.askVoList;
                            //vm.page = res.data.data.currentPage;
                            //vm.maxPage = res.data.data.pages;
                            // 向上整除
                            let realPage = Math.ceil(res.data.data.total / vm.pageSize);
                            if (vm.maxPage > realPage) {
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
            getNotice(){
                let vm = this;
                this.axios({
                    url: '/notice/getNotice',
                    method: 'get',
                }).then(function(res){
                    //console.log(res);
                    if(res.data.code === 200){
                        if(res.data.data !== undefined){
                            vm.notice.noticeText = res.data.data.content;
                            vm.notice.noticeUrl = res.data.data.address;
                        }

                    }else{
                        Toast.fail("获取notice失败："+ res.data.msg);
                    }
                }).catch(function (err) {
                    Toast.fail("获取notice异常" + err);
                })
            },
            getCarouselMapList(){
                let vm = this;
                this.axios({
                    url: '/carousel/getCarouselList',
                    method: 'get',
                }).then(function (res) {
                    if(res.data.code === 200){
                        //console.log(res);
                        vm.images = res.data.data;
                    }else{
                        Toast.fail(res.data.msg);
                    }
                }).catch(function(err){
                    Toast.fail("故障啦"+err);
                });
            },
            scrollChange(height){

            },
            backToTop(){
                this.$refs.scrollerBtn.scrollTo(0,0,true);
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
                            vm.commentObject.find(item => item.id === vm.commentId).commentVoList = res.data.data;
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
            myCommentInput(id){
                this.inputValue = '';
                if(id === this.commentId){
                    this.showCommentInput = !this.showCommentInput;
                }else{
                    this.commentId = id;
                    this.showCommentInput = true;
                }
            },
        }

    }
</script>

<style scoped>
  .container{
    width: 100%;
    height: 100%;
    background-color: #ededed;
  }
  .container .swipe{
    margin-top: 5%;
    background-color: #ededed;
    width: 94%;
    height: 300px;
    margin-left: 3%;
  }
  .container .imgSize{
    width: 100%;
    height: 300px;
  }
  .container .content{
    height: auto;
    background-color: #ffffff;
  }
  /*.list{
    max-height: 100vh;
    overflow-y: auto;
  }*/
</style>
