<script >
import {jsonp} from "vue-jsonp";

export default {
  methods:{
    openMap() {
      jsonp('https://apis.map.qq.com/ws/geocoder/v1/?address=', {
        output: 'jsonp',
        address: this.keyWord,
        key: '申请腾讯地图key'
      }).then(res => {
        console.log(res)
        if (res.status == 0) {
          // 通过地址得到经纬度
          // locations.value = `${res.result.location.lat},${res.result.location.lng}`
          // let center = new qq.maps.LatLng(res.result.location.lat, res.result.location.lng)
          // map.panTo(center)  // 重新设置地图中心点
          // initMap(res.result.location.lat, res.result.location.lng)

          this.$refs.ms.setLocationByLatLng(res.result.location.lat, res.result.location.lng);
        } else {
          this.$messages(res.message)
        }
      }).catch(err => {
        // search_btn.value = false
        console.log('地图错误：', err);
      })
      // 根据省市区设置初始值
      // this.$refs.ms.setLocationByAddress(this.mainForm.address);
      // 根据经纬度设置初始值

      // this.$refs.ms.setLocationByLatLng(this.mainForm.lat, this.mainForm.lng);
    },

// 地址选择后的回调函数
    selectAddress(address, lat, lng, province, city, area) {
      this.info.lat = lat;
      this.info.lng = lng;
      this.info.province = province;
      this.info.city = city;
      this.info.area = area;
      this.info.address = address;
      this.keyWord = address;
      // this.mainForm.address = address;
      // this.mainForm.lat = lat;
      // this.mainForm.lng = lng;
    },
  }
}
// 打开地图弹窗

</script>

<template>
  <el-form>
    <el-form-item
        label="详细地址"
        label-width="100px"
        prop="address1"
        clearable
    >

      <!-- 地图容器 -->
      <!-- <el-input
                @change="handleSearch"
                v-model="keyWord"
                clearable
                placeholder="请输入地址来直接查找相关位置"
                style="width: 500px"
              ></el-input>
      <div id="container"></div> -->
      <div style="width:90%;">
        <div class="xqk">
          <span>{{ info.address }}</span>
        </div>
        <el-input placeholder="请选择地址"  v-model="keyWord" @change="openMap()">
          <el-button slot="append" icon="el-icon-location" @click="openMap()"></el-button>
        </el-input>
        <TMap ref="ms" @on-select="selectAddress" />
      </div>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="less">

</style>