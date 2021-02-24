<template>
  <div class="container">
    <div class="header">
      <div style="position: absolute;top:5px;left:7px;z-index: 10">
        <van-icon size="25" name="arrow-left" @click="back"/>
      </div>
      <div class="title">
        <van-popover
          v-model="showPopover"
          trigger="click"
          :actions="actions"
          @select="onSelect"
        >
          <template #reference>
            <span>{{title}}</span>
          </template>
        </van-popover>
      </div>
    </div>
    <div class="content" id="main">
      <!--<router-view></router-view>-->
    </div>
  </div>
</template>

<script>
    //局部引用
    import echarts from '../../../../node_modules/echarts';
    import {Toast} from 'vant';
    export default {
        name: "Map",
        data(){
            return{
                showPopover: false,
                title: '国内累计',
                actions:[{id: 0, text: '国内累计'},{id: 1, text:'国内新增'},{id: 2, text:'全球累计'},{id: 3, text:'全球新增'}],
                dataList: []
            }
        },
        mounted(){
            this.mapConfigure(chinaMap,visualMapConfig_china_sum,this.dataList);
            let vm = this;
            Toast({
                type: 'loading',
                message: "获取数据中...",
                duration: 0
            });
            this.axios({
                url: '/epidemic/getAllChina',
                method: 'get'
            }).then(function (res) {
                Toast.clear();
                if(res.data.code === 200){
                    vm.dataList = res.data.data;
                    //console.log(vm.dataList);
                    vm.mapConfigure(chinaMap,visualMapConfig_china_sum,vm.dataList);
                }else{
                    Toast.fail("获取数据失败");
                }
            }).catch(function (error) {
                Toast.clear();
                Toast.fail("故障啦");
            });
            //this.chinaConfigure(china_option);
            //this.mapConfigure(chinaMap,visualMapConfig_china_sum,this.dataList);
        },
        methods:{
            back(){
                this.$router.push({
                    path: '/main/myApp',
                    name: 'MainMyApp',
                    params:{
                        currentIndex:1
                    }
                });
            },
            onSelect(action){
                //console.log(action.id);
                this.title = action.text;
                this.dataList = [];
                let vm = this;
                switch (action.id) {
                    case 0:{
                        document.getElementById("main").removeAttribute('_echarts_instance_');
                        this.mapConfigure(chinaMap,visualMapConfig_china_sum,this.dataList);
                        let vm = this;
                        Toast({
                            type: 'loading',
                            message: "获取数据中...",
                            duration: 0
                        });
                        this.axios({
                            url: '/epidemic/getAllChina',
                            method: 'get'
                        }).then(function (res) {
                            Toast.clear();
                            if(res.data.code === 200){
                                vm.dataList = res.data.data;
                                //console.log(vm.dataList);
                                vm.mapConfigure(chinaMap,visualMapConfig_china_sum,vm.dataList);
                            }else{
                                Toast.fail("获取数据失败");
                            }
                        }).catch(function (error) {
                            Toast.clear();
                            Toast.fail("故障啦");
                        });
                        //在同一个位置重新绘制时，需要将原来的 _echarts_intance_ 销毁，再重新初始化echarts，否则还是在原来的实例上绘制
                        //document.getElementById("main").removeAttribute('_echarts_instance_');
                        //this.mapConfigure(chinaMap,visualMapConfig_china_sum,this.dataList);

                    }
                    break;
                    case 1:{
                        document.getElementById("main").removeAttribute('_echarts_instance_');
                        this.mapConfigure(chinaMap,visualMapConfig_china_today,this.dataList);
                        Toast({
                            type: 'loading',
                            message: "获取数据中...",
                            duration: 0
                        });
                        this.axios({
                            url: '/epidemic/getTodayChina',
                            method: 'get'
                        }).then(function (res) {
                            Toast.clear();
                            if(res.data.code === 200){
                                vm.dataList = res.data.data;
                                //console.log(vm.dataList);
                                vm.mapConfigure(chinaMap,visualMapConfig_china_today,vm.dataList);
                            }else{
                                Toast.fail("获取数据失败");
                            }
                        }).catch(function (error) {
                            Toast.clear();
                            Toast.fail("故障啦");
                        });

                    }
                    break;
                    case 2:{

                        document.getElementById("main").removeAttribute('_echarts_instance_');
                        this.mapConfigure(worldMap,visualMapConfig_world_sum,this.dataList);
                        Toast({
                            type: 'loading',
                            message: "获取数据中...",
                            duration: 0
                        });
                        this.axios({
                            url: '/epidemic/getAllWorld',
                            method: 'get'
                        }).then(function (res) {
                            Toast.clear();
                            if(res.data.code === 200){
                                vm.dataList = res.data.data;
                                //console.log(vm.dataList);
                                vm.mapConfigure(worldMap,visualMapConfig_world_sum,vm.dataList);
                            }else{
                                Toast.fail("获取数据失败");
                            }
                        }).catch(function (error) {
                            Toast.clear();
                            Toast.fail("故障啦");
                        });
                    }
                    break;
                    case 3:{
                        //this.dataList = [{"name":"突尼斯","value":212679},{"name":"塞尔维亚","value":400837},{"name":"中国","value":101167},{"name":"日本本土","value":399474},{"name":"泰国","value":22058},{"name":"新加坡","value":59624},{"name":"韩国","value":79762},{"name":"澳大利亚","value":28838},{"name":"德国","value":2256197},{"name":"美国","value":27150457},{"name":"马来西亚","value":231483},{"name":"越南","value":1948},{"name":"圣巴泰勒米","value":6},{"name":"肯尼亚","value":101159},{"name":"伊朗","value":1438286},{"name":"以色列","value":672324},{"name":"毛利亚尼亚","value":16},{"name":"黎巴嫩","value":309162},{"name":"克罗地亚","value":234153},{"name":"奥地利","value":419801},{"name":"瑞士","value":528524},{"name":"希腊","value":159866},{"name":"毛里求斯","value":584},{"name":"爱沙尼亚","value":46334},{"name":"北马其顿","value":93510},{"name":"白俄罗斯","value":253413},{"name":"立陶宛","value":184948},{"name":"阿塞拜疆","value":230617},{"name":"美属维尔京群岛","value":72},{"name":"蒙古","value":197},{"name":"乌克兰","value":1275334},{"name":"波兰","value":1533511},{"name":"波黑","value":122828},{"name":"蒙特塞拉特","value":11},{"name":"南非","value":1463016},{"name":"布隆迪","value":85},{"name":"南苏丹","value":1755},{"name":"马耳他","value":18306},{"name":"摩尔多瓦","value":161642},{"name":"保加利亚","value":221266},{"name":"孟加拉","value":537030},{"name":"阿尔巴尼亚","value":1521},{"name":"巴勒斯坦","value":161087},{"name":"科摩罗","value":176},{"name":"阿富汗","value":55174},{"name":"沙特阿拉伯","value":368945},{"name":"新西兰","value":2313},{"name":"塔吉克斯坦","value":13308},{"name":"泽西岛","value":313},{"name":"叙利亚","value":177},{"name":"巴拿马","value":323382},{"name":"古巴","value":29529},{"name":"尼日利亚","value":134690},{"name":"摩洛哥","value":473047},{"name":"塞内加尔","value":27733},{"name":"老挝","value":19},{"name":"巴哈马","value":8231},{"name":"马约特岛","value":2282},{"name":"斯洛文尼亚","value":171368},{"name":"卢森堡","value":51128},{"name":"爱尔兰","value":199430},{"name":"厄瓜多尔","value":252390},{"name":"捷克","value":1013352},{"name":"匈牙利","value":371988},{"name":"法属圭亚那","value":1255},{"name":"多哥共和国","value":530},{"name":"哥斯达黎加","value":195537},{"name":"文莱","value":180},{"name":"法罗群岛","value":187},{"name":"马提尼克岛","value":37},{"name":"荷兰","value":1003010},{"name":"巴西","value":9339420},{"name":"洪都拉斯","value":151103},{"name":"乌拉圭","value":43215},{"name":"秘鲁","value":1158337},{"name":"智利","value":736645},{"name":"格陵兰","value":13},{"name":"圣巴托洛谬岛","value":6},{"name":"马尔代夫","value":16276},{"name":"委内瑞拉","value":128315},{"name":"毛里塔尼亚","value":16720},{"name":"纳米比亚","value":31},{"name":"法属留尼汪岛","value":487},{"name":"波多黎各","value":5536},{"name":"加纳","value":68559},{"name":"赤道几内亚","value":5534},{"name":"几内亚","value":14607},{"name":"卢旺达","value":15834},{"name":"格林纳达","value":23},{"name":"斯威士兰","value":15974},{"name":"坦桑尼亚","value":509},{"name":"贝宁","value":4119},{"name":"刚果（金）","value":23222},{"name":"中非共和国","value":4989},{"name":"利比里亚","value":1945},{"name":"索马里","value":4814},{"name":"塞拉利昂","value":3699},{"name":"乍得","value":3419},{"name":"赞比亚","value":57489},{"name":"巴巴多斯","value":96},{"name":"马里","value":8119},{"name":"阿根廷","value":1952744},{"name":"法属波利尼西亚","value":60},{"name":"巴林","value":104792},{"name":"莫桑比克","value":41433},{"name":"喀麦隆","value":30313},{"name":"乌干达","value":39685},{"name":"厄立特里亚","value":41},{"name":"刚果（布）","value":7887},{"name":"津巴布韦","value":33964},{"name":"丹麦","value":200466},{"name":"阿鲁巴","value":101},{"name":"斐济","value":56},{"name":"伯利兹","value":11978},{"name":"缅甸","value":140927},{"name":"塞浦路斯","value":31263},{"name":"关岛","value":183},{"name":"科索沃","value":1326},{"name":"圣皮埃尔岛和密克隆岛","value":1},{"name":"吉尔吉斯斯坦","value":84832},{"name":"博茨瓦纳","value":60},{"name":"尼日尔","value":4565},{"name":"苏里南","value":8556},{"name":"佛得角","value":14214},{"name":"萨尔瓦多","value":55821},{"name":"圭亚那","value":159},{"name":"尼加拉瓜","value":6299},{"name":"冈比亚","value":28},{"name":"东帝汶","value":24},{"name":"巴基斯坦","value":550540},{"name":"埃及","value":167525},{"name":"科威特","value":167410},{"name":"斯洛伐克","value":256903},{"name":"直布罗陀","value":176},{"name":"摩纳哥","value":99},{"name":"巴拉圭","value":135229},{"name":"荷属安的列斯","value":22},{"name":"多米尼克","value":18},{"name":"乌兹别克斯坦","value":78916},{"name":"黑山","value":63118},{"name":"危地马拉","value":160966},{"name":"加蓬","value":11129},{"name":"苏丹","value":29536},{"name":"利比亚","value":122013},{"name":"圣马丁岛","value":77},{"name":"土耳其","value":2501079},{"name":"巴布亚新几内亚","value":8},{"name":"多米尼加","value":217277},{"name":"约旦","value":330474},{"name":"亚美尼亚","value":167568},{"name":"圣基茨和尼维斯","value":15},{"name":"瓜德罗普","value":171},{"name":"安提瓜和巴布达","value":249},{"name":"玻利维亚","value":222447},{"name":"哥伦比亚","value":2125622},{"name":"圣文森特和格林纳丁斯","value":27},{"name":"圣卢西亚","value":19},{"name":"法国","value":3310051},{"name":"阿联酋","value":316875},{"name":"加拿大","value":794412},{"name":"印度","value":10790183},{"name":"英国","value":3882972},{"name":"意大利","value":2583790},{"name":"俄罗斯","value":3874830},{"name":"菲律宾","value":531699},{"name":"芬兰","value":46493},{"name":"尼泊尔","value":271602},{"name":"葡萄牙","value":740944},{"name":"也门","value":2122},{"name":"塞舌尔","value":11},{"name":"西班牙","value":2913389},{"name":"斯里兰卡","value":66409},{"name":"阿尔及利亚","value":108116},{"name":"柬埔寨","value":467},{"name":"海地","value":11672},{"name":"瑞典","value":580916},{"name":"特里尼达和多巴哥","value":123},{"name":"吉布提","value":5936},{"name":"圣多美与普林西比","value":659},{"name":"布基纳法索","value":10958},{"name":"比利时","value":716395},{"name":"伊拉克","value":623072},{"name":"马拉维","value":25449},{"name":"冰岛","value":6013},{"name":"几内亚比绍","value":2662},{"name":"拉脱维亚","value":68658},{"name":"不丹","value":66},{"name":"挪威","value":63839},{"name":"印度尼西亚","value":1123105},{"name":"安哥拉","value":19937},{"name":"开曼群岛","value":187},{"name":"埃塞俄比亚","value":139408},{"name":"梵蒂冈","value":12},{"name":"科特迪瓦","value":28739},{"name":"卡塔尔","value":152898},{"name":"莱索托","value":4},{"name":"格鲁吉亚","value":260480},{"name":"墨西哥","value":1886245},{"name":"圣马力诺","value":3094},{"name":"哈萨克斯坦","value":239726},{"name":"安道尔","value":10070},{"name":"牙买加","value":16073},{"name":"格恩西岛","value":252},{"name":"罗马尼亚","value":735484},{"name":"阿曼","value":135041},{"name":"列支敦士登","value":82},{"name":"马达加斯加","value":19065}];
                        document.getElementById("main").removeAttribute('_echarts_instance_');
                        this.mapConfigure(worldMap,visualMapConfig_world_today,this.dataList);
                        Toast({
                            type: 'loading',
                            message: "获取数据中...",
                            duration: 0
                        });
                        this.axios({
                            url: '/epidemic/getTodayWorld',
                            method: 'get'
                        }).then(function (res) {
                            Toast.clear();
                            if(res.data.code === 200){
                                vm.dataList = res.data.data;
                                //console.log(vm.dataList);
                                vm.mapConfigure(worldMap,visualMapConfig_world_today,vm.dataList);
                            }else{
                                Toast.fail("获取数据失败");
                            }
                        }).catch(function (error) {
                            Toast.clear();
                            Toast.fail("故障啦");
                        });
                    }
                }
            },
            mapConfigure(mapType,visualMapConfig,dataList){
                var myChart = echarts.init(document.getElementById("main"));
                var option = {
                    tooltip:{
                        formatter: function (param) {
                            //console.log(param);
                            return param.name + '<br/>' + (param.value?param.value:0) + '人';
                        }
                    },
                    title:{
                        text: '',
                    },
                    visualMap: visualMapConfig,
                    series: [{
                        name: '',
                        type: 'map',
                        mapType: mapType,
                        nameMap: nameMap,
                        itemStyle: {
                            emphasis: {
                                areaColor: '#c9ffff',
                                label: {
                                    show: true,
                                }
                            }
                        },
                        data: dataList,
                        layoutCenter: ['center','center'],
                        layoutSize: "100%"
                    }]
                };
                myChart.setOption(option);
            }
        }
    }
    let  nameMap = {
        'Singapore Rep.':'新加坡',
        'Dominican Rep.':'多米尼加',
        'Palestine':'巴勒斯坦',
        'Bahamas':'巴哈马',
        'Timor-Leste':'东帝汶',
        'Afghanistan':'阿富汗',
        'Guinea-Bissau':'几内亚比绍',
        "Côte d'Ivoire":'科特迪瓦',
        'Siachen Glacier':'锡亚琴冰川',
        "Br. Indian Ocean Ter.":'英属印度洋领土',
        'Angola':'安哥拉',
        'Albania':'阿尔巴尼亚',
        'United Arab Emirates':'阿联酋',
        'Argentina':'阿根廷',
        'Armenia':'亚美尼亚',
        'French Southern and Antarctic Lands':'法属南半球和南极领地',
        'Australia':'澳大利亚',
        'Austria':'奥地利',
        'Azerbaijan':'阿塞拜疆',
        'Burundi':'布隆迪',
        'Belgium':'比利时',
        'Benin':'贝宁',
        'Burkina Faso':'布基纳法索',
        'Bangladesh':'孟加拉国',
        'Bulgaria':'保加利亚',
        'The Bahamas':'巴哈马',
        'Bosnia and Herz.':'波斯尼亚和黑塞哥维那',
        'Belarus':'白俄罗斯',
        'Belize':'伯利兹',
        'Bermuda':'百慕大',
        'Bolivia':'玻利维亚',
        'Brazil':'巴西',
        'Brunei':'文莱',
        'Bhutan':'不丹',
        'Botswana':'博茨瓦纳',
        'Central African Rep.':'中非',
        'Canada':'加拿大',
        'Switzerland':'瑞士',
        'Chile':'智利',
        'China':'中国',
        'Ivory Coast':'象牙海岸',
        'Cameroon':'喀麦隆',
        'Dem. Rep. Congo':'刚果民主共和国',
        'Congo':'刚果',
        'Colombia':'哥伦比亚',
        'Costa Rica':'哥斯达黎加',
        'Cuba':'古巴',
        'N. Cyprus':'北塞浦路斯',
        'Cyprus':'塞浦路斯',
        'Czech Rep.':'捷克',
        'Germany':'德国',
        'Djibouti':'吉布提',
        'Denmark':'丹麦',
        'Algeria':'阿尔及利亚',
        'Ecuador':'厄瓜多尔',
        'Egypt':'埃及',
        'Eritrea':'厄立特里亚',
        'Spain':'西班牙',
        'Estonia':'爱沙尼亚',
        'Ethiopia':'埃塞俄比亚',
        'Finland':'芬兰',
        'Fiji':'斐',
        'Falkland Islands':'福克兰群岛',
        'France':'法国',
        'Gabon':'加蓬',
        'United Kingdom':'英国',
        'Georgia':'格鲁吉亚',
        'Ghana':'加纳',
        'Guinea':'几内亚',
        'Gambia':'冈比亚',
        'Guinea Bissau':'几内亚比绍',
        'Eq. Guinea':'赤道几内亚',
        'Greece':'希腊',
        'Greenland':'格陵兰',
        'Guatemala':'危地马拉',
        'French Guiana':'法属圭亚那',
        'Guyana':'圭亚那',
        'Honduras':'洪都拉斯',
        'Croatia':'克罗地亚',
        'Haiti':'海地',
        'Hungary':'匈牙利',
        'Indonesia':'印度尼西亚',
        'India':'印度',
        'Ireland':'爱尔兰',
        'Iran':'伊朗',
        'Iraq':'伊拉克',
        'Iceland':'冰岛',
        'Israel':'以色列',
        'Italy':'意大利',
        'Jamaica':'牙买加',
        'Jordan':'约旦',
        'Japan':'日本',
        'Kazakhstan':'哈萨克斯坦',
        'Kenya':'肯尼亚',
        'Kyrgyzstan':'吉尔吉斯斯坦',
        'Cambodia':'柬埔寨',
        'Korea':'韩国',
        'Kosovo':'科索沃',
        'Kuwait':'科威特',
        'Lao PDR':'老挝',
        'Lebanon':'黎巴嫩',
        'Liberia':'利比里亚',
        'Libya':'利比亚',
        'Sri Lanka':'斯里兰卡',
        'Lesotho':'莱索托',
        'Lithuania':'立陶宛',
        'Luxembourg':'卢森堡',
        'Latvia':'拉脱维亚',
        'Morocco':'摩洛哥',
        'Moldova':'摩尔多瓦',
        'Madagascar':'马达加斯加',
        'Mexico':'墨西哥',
        'Macedonia':'马其顿',
        'Mali':'马里',
        'Myanmar':'缅甸',
        'Montenegro':'黑山',
        'Mongolia':'蒙古',
        'Mozambique':'莫桑比克',
        'Mauritania':'毛里塔尼亚',
        'Malawi':'马拉维',
        'Malaysia':'马来西亚',
        'Namibia':'纳米比亚',
        'New Caledonia':'新喀里多尼亚',
        'Niger':'尼日尔',
        'Nigeria':'尼日利亚',
        'Nicaragua':'尼加拉瓜',
        'Netherlands':'荷兰',
        'Norway':'挪威',
        'Nepal':'尼泊尔',
        'New Zealand':'新西兰',
        'Oman':'阿曼',
        'Pakistan':'巴基斯坦',
        'Panama':'巴拿马',
        'Peru':'秘鲁',
        'Philippines':'菲律宾',
        'Papua New Guinea':'巴布亚新几内亚',
        'Poland':'波兰',
        'Puerto Rico':'波多黎各',
        'Dem. Rep. Korea':'朝鲜',
        'Portugal':'葡萄牙',
        'Paraguay':'巴拉圭',
        'Qatar':'卡塔尔',
        'Romania':'罗马尼亚',
        'Russia':'俄罗斯',
        'Rwanda':'卢旺达',
        'W. Sahara':'西撒哈拉',
        'Saudi Arabia':'沙特阿拉伯',
        'Sudan':'苏丹',
        'S. Sudan':'南苏丹',
        'Senegal':'塞内加尔',
        'Solomon Is.':'所罗门群岛',
        'Sierra Leone':'塞拉利昂',
        'El Salvador':'萨尔瓦多',
        'Somaliland':'索马里兰',
        'Somalia':'索马里',
        'Serbia':'塞尔维亚',
        'Suriname':'苏里南',
        'Slovakia':'斯洛伐克',
        'Slovenia':'斯洛文尼亚',
        'Sweden':'瑞典',
        'Swaziland':'斯威士兰',
        'Syria':'叙利亚',
        'Chad':'乍得',
        'Togo':'多哥',
        'Thailand':'泰国',
        'Tajikistan':'塔吉克斯坦',
        'Turkmenistan':'土库曼斯坦',
        'East Timor':'东帝汶',
        'Trinidad and Tobago':'特里尼达和多巴哥',
        'Tunisia':'突尼斯',
        'Turkey':'土耳其',
        'Tanzania':'坦桑尼亚',
        'Uganda':'乌干达',
        'Ukraine':'乌克兰',
        'Uruguay':'乌拉圭',
        'United States':'美国',
        'Uzbekistan':'乌兹别克斯坦',
        'Venezuela':'委内瑞拉',
        'Vietnam':'越南',
        'Vanuatu':'瓦努阿图',
        'West Bank':'西岸',
        'Yemen':'也门',
        'South Africa':'南非',
        'Zambia':'赞比亚',
        'Zimbabwe':'津巴布韦'
    };
    let chinaMap = 'china';
    let worldMap = 'world';
    let visualMapConfig_china_sum = {
        type: 'piecewise',
        pieces: [
            {gt: 2000, color: 'darkred'},
            {gt: 1300, lte: 2000, color: 'red', colorAlpha: 1},
            {gt: 800, lte: 1300, color: 'red', colorAlpha: 0.8},
            {gt: 500, lte: 800, color: 'red', colorAlpha: 0.6},
            {gt: 200, lte: 500, color: 'red', colorAlpha: 0.4},
            {gt: 50, lte: 200, color: 'red', colorAlpha: 0.3},
            {lt: 50, color: 'red', colorAlpha: 0.2}
        ],
    };
    let visualMapConfig_china_today = {
        type: 'piecewise',
        pieces: [
            {gt: 50, color: 'darkred'},
            {gt: 30, lte: 50, color: 'red', colorAlpha: 1},
            {gt: 20, lte: 30, color: 'red', colorAlpha: 0.8},
            {gt: 10, lte: 20, color: 'red', colorAlpha: 0.6},
            {gt: 5, lte: 10, color: 'red', colorAlpha: 0.4},
            {gt: 1, lte: 5, color: 'red', colorAlpha: 0.3},
            {lt: 1, color: 'red', colorAlpha: 0.0}
        ],
    };
    let visualMapConfig_world_sum = {
        min: 1, // 颜色映射对应的最小值，即对应下面的lightskyblue
        max: 50000, // 颜色映射对应的最大值，即对应下面的orangered
        text: ['严重', '轻微'], // 映射图上下标记文本
        realtime: true, // 是否显示拖拽手柄，映射条可以拖拽调整要映射的范围
        calculable: true, // 拖拽时，是否实时更新地图
        inRange: {
            color: ['rgba(222,0,0,0.2)','rgba(160,0,0,1)'] // 颜色映射范围，最小值，过渡值，最大值
        },
    };
    let visualMapConfig_world_today = {
        type: '',
        min: 0, // 颜色映射对应的最小值，
        max: 20000, // 颜色映射对应的最大值
        text: ['严重', '轻微'], // 映射图上下标记文本
        realtime: true, // 是否显示拖拽手柄，映射条可以拖拽调整要映射的范围
        calculable: true, // 拖拽时，是否实时更新地图
        inRange: {
            color: ['rgba(160,0,0,0)', 'rgba(160,0,0,1)'] // 颜色映射范围，最小值，过渡值，最大值
        },

    };
</script>

<style scoped>
  .container{
    width: 100%;
    height: 100%;
    background-color: gray;
  }
  .container .header{
    width: 100%;
    height: 100px;
    background-color: red;
    font-size: 40px;
    text-align: center;
    line-height: 100px;
  }
  .container .content{
    background-color: whitesmoke;
    margin-left: 3%;
    position: relative;
    top: 15%;
    width: 94%;
    height: 50%;

  }
</style>
