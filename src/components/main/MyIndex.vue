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
    <nut-scroller
      :is-un-more="isUnMore"
      :is-loading="isLoading"
      :type="'vertical'"
      @loadMore="loadMoreVert"
      @pulldown="pulldown"
    >
      <div slot="list" class="nut-vert-list-panel">
        <div class="swipe">
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index" @click="swipeClick(index)">
              <img v-lazy="image.img" class="imgSize" />
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
            description="描述文字"
          />
        </div>
      </div>
    </nut-scroller>

    <nut-drag direction="y" :style="{left:'0px',top:'300px'}">
      <nut-fixednav :active.sync="myActive" type="left" @selected="selected" :nav-list="navList">
        <template slot="btn" @click="myActive=!myActive">
          <img style="width:20px;height:20px"
               :src="require('../../assets/img/993e.png')" />
          <span>{{myActive?'收起导航':'发布导航'}}</span>
        </template>
      </nut-fixednav>
    </nut-drag>
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
                    noticeText: '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。',
                    noticeUrl: 'https://www.zhibo8.cc/',
                },
                images:[
                    {
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
                    }
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
                        icon: 'https://img11.360buyimg.com/imagetools/jfs/t1/117646/2/11112/1297/5ef83e95E81d77f05/daf8e3b1c81e3c98.png'
                    },
                    {
                        id: 2,
                        text: '提问',
                        icon: 'https://img12.360buyimg.com/imagetools/jfs/t1/119490/8/9568/1798/5ef83e95E968c69a6/dd029326f7d5042e.png'
                    },
                    {
                        id: 3,
                        text: '帮代',
                        num: 2,
                        icon: require('../../assets/img/loginBackground.jpg')
                    },
                ]
            }
        },
        created() {
            //获取notice数据
            //获取swipe数据
            //获取列表数据
            this.getData("");
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
            },
            clear(){
                this.getData("");
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
                            if(res.data.code === 200){
                                // 注意，concat方法连接两个数组，但不会改变原有数组。
                                vm.commentObject = vm.commentObject.concat(res.data.data.askVoList);
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
                        vm.commentObject = [];
                        vm.commentObject = res.data.data.askVoList;
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
                        vm.commentObject = res.data.data.askVoList;
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
                        //console.log(res.data.data);
                        vm.commentObject = res.data.data.askVoList;
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
            },
        }

    }
</script>

<style scoped>
  .container{
    width: 100%;
    height: 100%;
    background-color: #9a6e3a;
  }
  .container .swipe{
    margin-top: 5%;
    background-color: skyblue;
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
    background-color: skyblue;
  }
  /*.list{
    max-height: 100vh;
    overflow-y: auto;
  }*/
</style>
