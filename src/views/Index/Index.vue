<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="130px">
        <el-tabs
          v-model="ModeType"
          class="demo-tabs"
          style="height: 200px"
          tab-position="left"
          @tab-change="modeChange"
        >
          <el-tab-pane label="随机匹配" name="default"></el-tab-pane>
          <el-tab-pane label="智能匹配" name="match"></el-tab-pane>
        </el-tabs>
      </el-aside>
      <el-container>
        <el-header>
          <div v-if="ModeType === 'default'" style="display: inline-block; margin-right: 10px">
            <div style="display: flex; align-items: center">
              <el-input
                v-model="searchText"
                :prefix-icon="Search"
                class="w-50 m-2"
                placeholder="搜索你感兴趣的伙伴吧！"
                @change="doSearch"
              />
              <el-button type="primary" :icon="Search" @click="doSearch">搜索</el-button>
            </div>
          </div>
          <div v-else></div>
        </el-header>
        <el-main>
          <el-empty v-if="userList.length === 0" description="找不到符合要求的伙伴噢" />
          <el-row v-else :gutter="20" class="mb-4">
            <el-col
              v-for="(user, index) in userList"
              :key="user.id"
              :lg="4"
              :md="8"
              :sm="10"
              :xl="11"
              :xs="100"
            >
              <el-card class="card" shadow="hover" @click="toUserInfo(user.id)">
                <div>
                  <el-image :src="user.avatarUrl" fit="contain" style="height: 140px" />
                </div>
                <div style="padding: 1px">
                  <span>{{ user.username }}</span>
                  <div>
                    <el-tag
                      v-for="(tag, index) in user.tags?.slice(0, 2)"
                      class="ml-2"
                      size="small"
                    >
                      {{ tag }}
                    </el-tag>
                    <el-tag
                      v-if="!user.tags || user.tags?.length === 0"
                      class="ml-2"
                      size="small"
                      type="info"
                    >
                      暂无标签
                    </el-tag>
                  </div>
                  <div class="bottom">
                    <div class="profile">{{
                      user.profile ? user.profile.substring(-1, 9) : '该用户懒，没有简介'
                    }}</div>
                    <!--                    click.stop 阻止冒泡-->
                    <el-button class="button" type="primary" text @click.stop>联系我</el-button>
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
import {
  matchUsersUsingGet,
  recommendUsingGet,
  searchByTextUsingGet
} from '../../servers/api/userController'

import { useAppStoreWithOut } from '../../store/modules/app'
import { useCache } from '../../hooks/web/useCache'
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { searchUserUsingPOST } from '@/api/langbei/SearchController'
// import {searchUserUsingPOST} from "../../api/langbei/SearchController";

const router = useRouter()
const userList = ref([])
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
  await getRecommendUsers()
})

//获取推荐用户
async function getRecommendUsers() {
  const res = await recommendUsingGet({
    currentPage: pageNum.value,
    pageSize: pageSize.value
  })
  console.log(res)
  userList.value = res.data.records
  console.log(userList.value)
  total.value = res.data.total
  const userListData = res.data.records
  if (userListData) {
    userListData.forEach((user) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = userListData
  }
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
    userList.value = userListData
  }
}

//分页查询用户
async function searchUserByEs() {
  const res = await searchUserUsingPOST({
    searchText: searchText.value
  })
  // console.log(res);
  const userListData = res.data
  if (userListData) {
    userListData.forEach((user) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = userListData
  }
}

//监听页数变化
watch(pageNum, (newVal, oldVal) => {
  searchUserPage()
})

//搜索用户
const doSearch = async () => {
  if (searchText.value === '') {
    await getRecommendUsers()
  } else {
    await searchUserPage()
  }
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
    userList.value = userListData
  }
}

//切换模式
const modeChange = async () => {
  // console.log(ModeType.value);
  if (ModeType.value === 'default') {
    if (searchText.value === '') {
      await getRecommendUsers()
    } else {
      await searchUserPage()
    }
  } else if (ModeType.value === 'match') {
    await matchUser()
  }
}

//点击卡片到用户详情页
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
</style>
