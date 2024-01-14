<template>
  <div style="display: flex">
    <div>
      <div>
        <el-select
            v-model="keywords"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading"
            :clearable="true"
            size="mini"
            @change="currentSelect"
            style="width: 500px"
        >
          <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item"
              class="one-text"
          >
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.district
              }}</span>
          </el-option>
        </el-select>
      </div>
      <div id="container" class="container"></div>
    </div>
    <div class="info-box">
      纬度：{{ form.lat }}
      <br/>
      经度：{{ form.lng }}
      <p>详细地址：{{ form.address }}</p>
    </div>
  </div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
import {service} from "@/config/axios";
import axios from "axios";
import {jsonp} from "vue-jsonp";

window._AMapSecurityConfig = {
  // 安全密钥
  securityJsCode: "c9b6e1d81e6815a53d6e984be85fd71c",
};
export default {
  name: "TestIndex",
  data() {
    return {
      // 地图实例
      map: null,
      // 标记点
      marker: "",
      // 地址逆解析
      geoCoder: null,
      // 搜索提示
      AutoComplete: null,
      // 搜索关键字
      keywords: "",
      // 位置信息
      form: {
        lng: "",
        lat: "",
        address: "",
        adcode: "", //地区编码
      },
      // 搜索节流阀
      loading: false,
      // 搜索提示信息
      options: [],
      latitude: { // 纬度
        type: Number,
        default: 0
      },
      longitude: { // 经度
        type: Number,
        default: 0
      }
    };
  },
  methods: {
    initMap() {
      AMapLoader.load({
        // 你申请的Key
        key: "5290c75860c528fdcc2d0a85f115b605",
        version: "2.0",
        // 需要用到的插件
        plugins: ["AMap.Geocoder", "AMap.AutoComplete"],
      })
          .then((AMap) => {
            this.map = new AMap.Map("container", {

              viewMode: "3D", //是否为3D地图模式
              zoom: 5, //初始化地图级别
              center: [105.602725, 37.076636], //初始化地图中心点位置
            });
            //地址逆解析插件
            this.geoCoder = new AMap.Geocoder({
              city: "010", //城市设为北京，默认：“全国”
              radius: 1000, //范围，默认：500
            });
            // 搜索提示插件
            this.AutoComplete = new AMap.AutoComplete({city: "全国"});
            //点击获取经纬度;
            this.map.on("click", (e) => {
              // 获取经纬度
              this.form.lng = e.lnglat.lng;
              this.form.lat = e.lnglat.lat;
              // 清除点
              this.removeMarker();
              // 标记点
              this.setMapMarker();
            });
          })
          .catch((err) => {
            // 错误
            console.log(err);
          });
    },
    // 标记点
    setMapMarker() {
      // 自动适应显示想显示的范围区域
      this.map.setFitView();
      this.marker = new AMap.Marker({
        // icon:"https://wuxie-image.oss-cn-chengdu.aliyuncs.com/logo.png",
        map: this.map,
        position: [this.form.lng, this.form.lat],
        // offset: new AMap.Pixel(-13, -30)
      });
      const newMark = new AMap.Marker({
        // icon:"https://wuxie-image.oss-cn-chengdu.aliyuncs.com/logo.png",
        map: this.map,
        position: [31.198045, 107.452874],
        // offset: new AMap.Pixel(-13, -30)
      });
      // 逆解析地址
      this.toGeoCoder();
      this.map.setFitView();
      this.map.add(this.marker);
      // todo 准备一张表 记录用户的位置，然后进行添加
      // 显示离用户最近的
      // this.map.add(newMark);
    },
    // 清除点
    removeMarker() {
      if (this.marker) {
        this.map.remove(this.marker);
      }
    },
    // 逆解析地址
    toGeoCoder() {
      let lnglat = [this.form.lng, this.form.lat];
      this.geoCoder.getAddress(lnglat, (status, result) => {
        if (status === "complete" && result.regeocode) {
          this.form.address = result.regeocode.formattedAddress;
        }
      });
    },
    // 搜索
    remoteMethod(query) {
      console.log(query);
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.AutoComplete.search(query, (status, result) => {
            this.options = result.tips;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    // 选中提示
    currentSelect(val) {
      // 清空时不执行后面代码
      if (!val) {
        return;
      }
      this.form = {
        lng: val.location.lng,
        lat: val.location.lat,
        address: val.district + val.address,
        adcode: val.adcode,
      };
      // 清除点
      this.removeMarker();
      // 标记点
      this.setMapMarker();
    },

    currentLocate() {
      axios({
        url: "http://localhost:3000/ws/location/v1/ip", //接口地址（代理把起码路径去掉）
        method: "get", //接口规定，只能用get
        async: true, //异步
        params: {key: "WHLBZ-F7DCZ-45NXX-774ZJ-LJTZT-JQBSV", output: "jsonp"}, //参数格式必须用到output传参为jsonp，否则会报跨域问题
        responseType: "jsonp", //跨域，必须用到jsonp
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST',
        }
      }).then((res) => {
        var ip = res.data.replace("QQmap&&QQmap(", "").replace(");", "");
        this.ipV = JSON.parse(ip);
        console.log(this.ipV)
        //   this.initMap();
      });

    }
  },
  mounted() {
    this.initMap();
    this.currentLocate();
  },
};
</script>

<style>
.container {
  width: 1000px;
  height: 500px;
}
</style>