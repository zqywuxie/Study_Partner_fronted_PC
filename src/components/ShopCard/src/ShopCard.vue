<script setup lang="ts">
//从父组件拿到数据
import {defineProps} from 'vue'

const props = defineProps({
  goodList: {
    type: Array,
    default: () => []
  }
})
</script>
<!--使用element-plus组件库写一个展示商品的组件，要求第一行商品图片，下一行商品价格或者所需的积分，右边有一个加入购物车的按钮-->
<template>
  <div class="shop-card" v-for="good in goodList">
    <div class="shop-card-img">
      <img src="" alt="">
    </div>
    <div class="shop-card-price">
      <span>￥</span>
      <span>100</span>
    </div>
    <div class="shop-card-btn">
      <el-button type="primary">加入购物车</el-button>
    </div>
  </div>
</template>

<style scoped lang="less">
//  .shop-card{
//    width: 200px;
//    height: 300px;
//    border: 1px solid #ccc;
//    .shop-card-img{
//      width: 100%;
//      height: 200px;
//      img{
//        width: 100%;
//        height: 100%;
//      }
//    }
//    .shop-card-price{
//      display: flex;
//      justify-content: center;
//      align-items: center;
//      span:nth-child(1){
//        font-size: 20px;
//      }
//      span:nth-child(2){
//        font-size: 30px;
//      }
//    }
//    .shop-card-btn{
//      display: flex;
//      justify-content: center;
//      align-items: center;
//    }
//  }

</style>