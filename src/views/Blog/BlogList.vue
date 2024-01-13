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
          <el-empty v-if="blogList.length === 0" description="暂无博客"/>
          <blogCard :blog-list="blogList"/>
        </el-main>
      </el-col>
      <el-col :span="6">
        <el-card class="author-card">
          <div class="author-info">
            <el-avatar class="author-avatar" :src="currentUser.avatarUrl" :alt="currentUser.username"></el-avatar>
            <div class="author-details">
              <p class="author-name">{{ currentUser.username }}</p>
            </div>
          </div>

          <div class="author-bio">
            <p>{{ currentUser.profile }}</p>
          </div>

          <div class="author-stats">
            <div class="stat-item">
              <span class="stat-label">博客数:</span>
              <span class="stat-value">123</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">评论数:</span>
              <span class="stat-value">2323</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">点赞数:</span>
              <span class="stat-value">42424</span>
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
import blogCard from '@/components/BlogCard/blog_list.vue'
// todo 添加一个关键词搜索博文
import {listBlogPageUsingPost} from '../../servers/api/blogController'

import {useAppStoreWithOut} from '../../store/modules/app'
import {useCache} from '../../hooks/web/useCache'
import {Edit, Search} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
import {matchUsersUsingGet, searchByTextUsingGet} from '@/servers/api/userController'
// import {} from "@element-plus/icons-vue/dist/types";
// import {searchUserUsingPOST} from "../../api/langbei/SearchController";

const router = useRouter()
const blogList = ref([])
const pageNum = ref(1)
const pageSize = ref(12)
const total = ref()
const ModeType = ref('default')
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
async function getBlogList() {
  const res = await listBlogPageUsingPost({
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    searchText: searchText.value
  })
  total.value = res.data.total
  blogList.value = res.data.records.map((blog) => {
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
    blogList.value = userListData
  }
}

//分页查询用户
// async function searchUserByEs() {
//   const res = await searchUserUsingPOST({
//     searchText: searchText.value,
//   })
//   // console.log(res);
//   const userListData = res.data
//   if (userListData) {
//     userListData.forEach(user => {
//       if (user.tags) {
//         user.tags = JSON.parse(user.tags);
//       }
//     })
//     blogList.value = userListData;
//   }
// }

//监听页数变化
watch(pageNum, (newVal, oldVal) => {
  searchBlogPage()
})

//搜索用户
const doSearch = async () => {
  if (searchText.value === '') {
    await getBlogList()
  } else {
    await searchBlogPage()
  }
}

//

const createBlog = () => {
  router.push({
    path: '/blog/edit'
  })
}

//心动匹配模式获取用户
async function matchUser() {
  const res = await matchUsersUsingGet({
    num: 10
  })
  const userListData = res.data
  if (userListData) {
    userListData.forEach((user) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags)
      }
    })
    blogList.value = userListData
  }
}

//切换模式
const modeChange = async () => {
  // console.log(ModeType.value);
  if (ModeType.value === 'default') {
    if (searchText.value === '') {
      await getBlogList()
    } else {
      await searchBlogPage()
    }
  } else if (ModeType.value === 'match') {
    await matchUser()
  }
}

//点击卡片到用户详情页
const toBlogInfo = (id) => {
  router.push({
    path: '/blog/info',
    query: {blogId: id}
  })
}

const toUserInfo = (id) => {
  router.push({
    path: '/user/info',
    query: {id: id}
  })
}
</script>

<style>


.author-card {
  width: 300px; /* Adjust based on your design */
  margin: 20px; /* Adjust based on your design */
}

.author-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.author-details {
  p {
    margin: 0;
    font-weight: bold;
  }
}

.author-bio {
  margin-bottom: 10px;
}

.author-stats {
  display: flex;
  justify-content: space-between;
}

.stat-item {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.stat-label {
  color: #888;
}

.stat-value {
  font-weight: bold;
}
</style>
