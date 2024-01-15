<script setup lang="ts">
//从父组件拿到数据
import {defineProps} from 'vue'

const props = defineProps({
  goodList: {
    type: Array,
    default: () => []
  },

})
//模拟数据
let list = [
  {
    cover: 'https://img.yzcdn.cn/vant/ipad.jpeg',
    price: 100,
    stock: 100
  },  {
    cover: 'https://img.yzcdn.cn/vant/ipad.jpeg',
    price: 100,
    stock: 100
  },  {
    cover: 'https://img.yzcdn.cn/vant/ipad.jpeg',
    price: 100,
    stock: 100
  },  {
    cover: 'https://img.yzcdn.cn/vant/ipad.jpeg',
    price: 100,
    stock: 100
  },  {
    cover: 'https://img.yzcdn.cn/vant/ipad.jpeg',
    price: 100,
    stock: 100
  },
  {
    cover: 'https://img.yzcdn.cn/vant/ipad.jpeg',
    price: 100,
    stock: 100
  }]
</script>
<!--使用element-plus组件库写一个展示商品的组件，要求第一行商品图片，下一行商品价格或者所需的积分，右边有一个加入购物车的按钮-->
<template>
  <div class="shop-card" v-for="good in list">
    <div class="shop-card-img">
      <img :src="good.cover" alt="">
    </div>
    <div class="shop-card-price">
      <span>￥</span>
      <span>{{ good.price }}</span>
    </div>
    <!--    商品库存-->
    <div class="shop-card-price">
      <span>库存：</span>
      <span>{{ good.stock }}</span>
    </div>
    <div class="shop-card-btn">
      <el-button type="primary">加入购物车</el-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.shop-card {
  //边框圆润
  border-radius: 10px;
  width: 200px;
  height: 300px;
  border: 1px solid #ccc;
  margin: 15px;
  //display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
//  横着排列
  display: inline-block;
}

.shop-card-img {
  width: 100%;
  height: 200px;

  img {
    width: 100%;
    height: 100%;
  }
}

.shop-card-price {
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 20px;
    color: red;
  }
}

.shop-card-btn {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

//库存less

</style>