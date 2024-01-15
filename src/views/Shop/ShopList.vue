<template>
  <div class="common-layout">
    <el-header>
      <div v-if="ModeType === 'default'" style="display: inline-block; margin-right: 10px">
        <div style="display: flex; align-items: center">
          <el-input
              v-model="searchText"
              :prefix-icon="Search"
              class="w-50 m-2"
              placeholder="搜索你感兴趣的博客吧吧！"
              @change="doSearch"
          />
          <el-button type="primary" :icon="Search" @click="doSearch">搜索</el-button>
          <el-button type="primary" @click="createBlog" :icon="Edit">创建博客</el-button>
        </div>
      </div>
      <div v-else></div>
    </el-header>
    <el-row>
      <el-col :span="18">
        <el-main>
          <el-empty v-if="goodList.length === 0" description="暂无博客"/>
          <shop-card :shop-list="goodList"/>
        </el-main>
      </el-col>
      <el-col :span="6">
        <el-card class="author-card">
          <div class="author-info">
            <el-avatar class="author-avatar" :src="currentUser.avatarUrl" :alt="currentUser.username"></el-avatar>
            <div class="author-details">
              <span class="author-username">{{ currentUser.username }}</span>
            </div>
          </div>

          <div class="author-bio">
            <p>
              <span class="balance-label">当前余额:</span>
              <el-tag class="ml-3 balance-tag" type="warning" size="large">
                $123
              </el-tag>
              <el-button type="primary">充值</el-button>
            </p>
          </div>

          <div class="author-stats">
            <div class="stat-item">
              <i class="el-icon-time stat-icon"></i>
              <span class="stat-label">待支付:</span>
              <el-link type="primary" class="stat-value" :underline="false">
                123
              </el-link>
            </div>
            <div class="stat-item">
              <i class="el-icon-shopping-cart-full stat-icon"></i>
              <span class="stat-label">购物车:</span>
              <el-link type="primary" class="stat-value" :underline="false">
                123
              </el-link>

            </div>
            <div class="stat-item">
              <i class="el-icon-s-order stat-icon"></i>
              <span class="stat-label">订单数:</span>
              <el-link type="primary" class="stat-value" :underline="false">
                123
              </el-link>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>


    <div style="margin: 0 auto">
      <el-pagination
          v-if="ModeType === 'default'"
          v-model:current-page="pageNum"
          v-model:page-size="pageSize"
          :pager-count="11"
          :total="total"
          layout="prev, pager, next"
      />
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue'
// todo 添加一个关键词搜索博文
import {useAppStoreWithOut} from '../../store/modules/app'
import {useCache} from '../../hooks/web/useCache'
import {Edit, Search} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
import ShopCard from "@/components/ShopCard/src/ShopCard.vue";

const router = useRouter()
const goodList = ref([])
const pageNum = ref(1)
const pageSize = ref(12)
const total = ref()
const appStore = useAppStoreWithOut()
const {wsCache} = useCache()
const currentUser = ref()
const searchText = ref('')

//获取当前用户
currentUser.value = wsCache.get(appStore.getUserInfo)

onMounted(async () => {
  await getBlogList()
})

//获取推荐用户
async function getGoodList() {
  const res = await listBlogPageUsingPost({
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    searchText: searchText.value
  })
  total.value = res.data.total
  goodList.value = res.data.records.map((blog) => {
    // 使用 split 将逗号分隔的字符串转换为数组
    let imagesArray = ''
    if (blog.images) {
      imagesArray = blog.images.split(',')
    }
    // 将 images 属性更新为数组
    return {
      ...blog,
      images: imagesArray[0]
    }
  })
}

//分页查询用户
async function searchBlogPage() {
  const res = await searchByTextUsingGet({
    searchText: searchText.value,
    pageNum: pageNum.value,
    pageSize: pageSize.value
  })
  console.log(res)
  const userListData = res.data.records
  if (userListData) {
    userListData.forEach((user) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags)
      }
    })
    goodList.value = userListData
  }
}


//监听页数变化
watch(pageNum, (newVal, oldVal) => {
  searchBlogPage()
  console.log()
})

//搜索用户
const doSearch = async () => {
  if (searchText.value === '') {
    await getBlogList()
  } else {
    await searchBlogPage()
  }
}


//点击卡片到用户详情页
const toGoodInfo = (id) => {
  router.push({
    path: '/good/info',
    query: {goodId: id}
  })
}
</script>

<style>

.author-card {
  border: 1px solid #ebeef5;
  border-radius: 10px;
  overflow: hidden;
}

.author-info {
  display: flex;
  align-items: center;
  padding: 20px;
}

.author-avatar {
  width: 60px;
  height: 60px;
  margin-right: 20px;
}

.author-details {
  display: flex;
  flex-direction: column;
}

.author-username {
  font-size: 18px;
  font-weight: bold;
}

.author-bio {
  padding: 0 20px;
  margin-top: 20px;
}

.balance-label {
  font-weight: bold;
}

.balance-tag {
  margin-right: 10px;
  margin-top: 5px;
  font-size: 15px;
}

.author-stats {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  //background-color: #f9fafc;
}

.stat-item {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.stat-icon {
  margin-right: 5px;
  font-size: 16px;
  color: #909399;
}

.stat-label {
  margin-right: 5px;
}

.stat-value {
  display: block;
  font-size: 19px;
  font-weight: bold;
  margin-top: 5px;
}
</style>
