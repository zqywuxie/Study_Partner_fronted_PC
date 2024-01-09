<template>
  <div class="common-layout">
    <el-container>
      <el-container>
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
              <el-button class="w-50 m-2" @click="createBlog">创建博客 </el-button>
            </div>
          </div>
          <div v-else></div>
        </el-header>
        <el-main>
          <el-empty v-if="blogList.length === 0" description="暂无博客" />
          <el-row v-else :gutter="20" class="mb-4">
            <el-col
              v-for="(blog, index) in blogList"
              :key="blog.id"
              :lg="4"
              :md="8"
              :sm="10"
              :xl="11"
              :xs="100"
            >
              <el-card class="blog-card" shadow="hover" @click="toBlogInfo(blog.id)">
                <div class="blog-card-cover">
                  <el-image
                    v-if="blog.images"
                    :src="blog.images"
                    fit="cover"
                    style="height: 140px; border-radius: 8px"
                  />
                </div>
                <div style="padding: 14px">
                  <span>{{ blog.title }}</span>
                  <div class="bottom">
                    <el-avatar
                      :src="blog.author?.avatarUrl"
                      @click="toUserInfo(blog.author.id)"
                      @click.stop
                      >Operating
                    </el-avatar>
                    <el-tag>{{ blog.author?.username }}</el-tag>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-main>

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
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
// todo 添加一个关键词搜索博文
import { listBlogPageUsingPost, likeBlogUsingPut } from '../../servers/api/blogController'

import { useAppStoreWithOut } from '../../store/modules/app'
import { useCache } from '../../hooks/web/useCache'
import { Star, ChatLineRound, Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { searchByTextUsingGet, matchUsersUsingGet } from '@/servers/api/userController'
// import {} from "@element-plus/icons-vue/dist/types";
// import {searchUserUsingPOST} from "../../api/langbei/SearchController";

const router = useRouter()
const blogList = ref([])
const pageNum = ref(1)
const pageSize = ref(12)
const total = ref()
const ModeType = ref('default')
const appStore = useAppStoreWithOut()
const { wsCache } = useCache()
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
async function searchUserPage() {
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
  searchUserPage()
})

//搜索用户
const doSearch = async () => {
  if (searchText.value === '') {
    await getBlogList()
  } else {
    await searchUserPage()
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
      await searchUserPage()
    }
  } else if (ModeType.value === 'match') {
    await matchUser()
  }
}

//点击卡片到用户详情页
const toBlogInfo = (id) => {
  router.push({
    path: '/blog/info',
    query: { blogId: id }
  })
}

const toUserInfo = (id) => {
  router.push({
    path: '/user/info',
    query: { id: id }
  })
}
</script>

<style>
.bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 13px;
  line-height: 12px;
}

.card {
  margin-bottom: 10px;
}

.profile {
  color: #999;
  font-size: 12px;
}

.bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 13px;
  line-height: 12px;
}
</style>
