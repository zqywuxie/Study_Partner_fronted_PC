<template>
  <!-- <el-dialog
  :append-to-body="true"
    title="选择地址"
    :visible.sync="isShowDialog"
    width="1000px"
    top="50px"> -->
  <div>
    <!-- <div class="search">
      <el-input placeholder="请输入搜索地址信息" v-model="keyword" clearable>
        <el-button slot="append" icon="el-icon-search" @click="searchAddress"></el-button>
      </el-input>
    </div> -->
    <el-table
        v-if="isShowDialog"
        highlight-current-row
        :data="nearPointList"
        height="300"
        style="width: 100%"
        class="table"
    >
      <el-table-column prop="address" label="附近推荐地点">
        <template slot-scope="scope">
          {{ scope.row.address }}{{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button
              @click.native.prevent="selectAddress(scope.row, 2)"
              type="text"
          >确认选择</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div id="mapContainer" style="width: 100%; height: 350px"></div>

    <div class="address">
      <!-- <span>当前选点：</span>
      <b>{{nowAddress ? (nowAddress.addressComponents.province + nowAddress.addressComponents.city + nowAddress.addressComponents.district + nowAddress.addressComponents.streetNumber) : '尚未选点'}}</b> -->
      <!-- <el-button v-if="nowAddress" @click="selectAddress(nowAddress, 1)" type="text">【确认选择】</el-button> -->
    </div>
  </div>

  <!--
  </el-dialog> -->
</template>
<script>
export default {
  data() {
    return {
      keyword: "", // 搜索关键词
      nearPointList: [], // 附近地址
      isShowDialog: false, // 是否显示弹窗
      markersArray: [],
      geocoder: null,
      nowAddress: null, // 选择的地点
      geocoderLocation: null,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    // 搜索地址
    // searchAddress() {
    //   if (!this.keyword) {
    //     return this.$message.error("请输入搜索地址信息");
    //   }
    //   this.setLocationByAddress(this.keyword);
    // },

    // 初始化地图
    initMap() {
      let that = this;
      let latLon = new qq.maps.LatLng(39.916527, 116.397128);
      var map = new qq.maps.Map(document.getElementById("mapContainer"), {
        zoom: 13,
        center: latLon,
        mapTypeId: qq.maps.MapTypeId.ROADMAP,
      });
      var listener = qq.maps.event.addListener(map, "click", function (event) {
        that.setLocationByLatLng(event.latLng.getLat(), event.latLng.getLng());
      });
      // 经纬度解析类回调函数
      this.geocoder = new qq.maps.Geocoder({
        complete: function (result) {
          that.nowAddress = result.detail;
          that.nearPointList = result.detail.nearPois;
          map.setCenter(result.detail.location);
          // 标记点
          let marker = new qq.maps.Marker({
            map: map,
            position: result.detail.location,
          });
          that.markersArray.push(marker);
          if (that.markersArray.length > 1) {
            for (let i = 0; i < that.markersArray.length - 1; i++) {
              that.markersArray[i].setMap(null); // 清除标记
            }
          }
        },
      });
      // 地址解析回调函数
      that.geocoderLocation = new qq.maps.Geocoder({
        complete: function (result) {
          // 查找附近的点
          let latLng = new qq.maps.LatLng(
              result.detail.location.lat,
              result.detail.location.lng
          );
          that.geocoder.getAddress(latLng);
        },
      });
    },

    // 选择地址事件
    selectAddress(item, type) {
      let info = this.nowAddress.addressComponents;
      if (type === 1) {
        let addressInfo = item.addressComponents;
        this.$emit(
            "on-select",
            addressInfo.province +
            addressInfo.city +
            addressInfo.district +
            addressInfo.streetNumber,
            item.location.lat,
            item.location.lng,
            info.province,
            info.city,
            info.district
        );
        this.isShowDialog = false;
      }
      if (type === 2) {
        this.$emit(
            "on-select",
            item.address,
            item.latLng.lat,
            item.latLng.lng,
            info.province,
            info.city,
            info.district
        );
        this.isShowDialog = false;
      }
    },

    // 显示地图
    // show() {
    //   setTimeout(() => {
    //     // this.keyword = '';
    //     this.initMap();
    //   })
    // },

    // 根据地址信息进行定位
    setLocationByAddress(address) {
      setTimeout(() => {
        this.geocoderLocation.getLocation(address);
      });
    },

    // 根据经纬度进行定位
    setLocationByLatLng(lat, lng) {
      setTimeout(() => {
        this.isShowDialog = true;
        let latLng = new qq.maps.LatLng(lat, lng);
        this.geocoder.getAddress(latLng);
      });
    },
  },
};
</script>

<style scoped lang="scss">
.search {
  margin-bottom: 15px;
  margin-top: -20px;
}
.address {
  margin-top: 15px;
  margin-bottom: 10px;
  .el-button {
    padding: 0;
  }
}
.table {
  .el-button {
    padding: 0;
  }
}
</style>