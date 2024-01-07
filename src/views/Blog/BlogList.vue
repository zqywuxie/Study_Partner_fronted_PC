<template>
  <div class="common-layout">

    <el-container>
      <el-container>
        <el-header>
          <div v-if="ModeType === 'default'" style="display:inline-block; margin-right: 10px">
            <div style="display: flex; align-items: center;">
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
        <el-main style="background-color: #f0f2f5">
          <el-empty v-if="blogList.length === 0" description="暂无博客"/>
          <el-row v-else :gutter="20" class="mb-4">
            <el-col
                v-for="(blog, index) in blogList"
                :key="blog.id"
                :lg="4" :md="8" :sm="10" :xl="11" :xs="100"
            >
              <el-card class="card" shadow="hover" @click="toUserInfo(blog.id)">
                <div>
                  <el-image :src="blog.images" fit="contain" style=" height: 140px"/>
                </div>
                <div style="padding: 1px">
                  <span>{{ blog.username }}</span>
                  <div>
                    <el-tag class="ml-2" size="small">
                      {{ blog.title }}
                    </el-tag>
                    <!--                    <el-tag v-if="!blog.tags || blog.tags?.length === 0" class="ml-2" size="small" type="info">-->
                    <!--                      暂无标签-->
                    <!--                    </el-tag>-->
                  </div>
                  <div class="bottom">
                    <div class="profile">{{ blog.content ? blog.content.substring(-1, 9) : '该用户懒，没有简介' }}</div>
                    <!--            <el-button class="button" type="primary" text>联系我</el-button>-->
                  </div>
                </div>

                <!-- todo 考虑一下是否可以在外面进行点赞和评论                点赞和评论-->
                <el-icon color="#409EFC" class="no-inherit" style="width: 200px">
                  <Star/>
                </el-icon>
                <el-icon color="#409EFC" class="no-inherit">
                  <ChatLineRound/>
                </el-icon>

              </el-card>
            </el-col>
          </el-row>
        </el-main>
        <div style="margin:0 auto; ">
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

import {onMounted, ref, watch} from "vue";
// todo 添加一个关键词搜索博文
import {listBlogPageUsingPOST, likeBlogUsingPUT} from "../../servers/api/blogController";


import {useAppStoreWithOut} from "../../store/modules/app";
import {useCache} from "../../hooks/web/useCache";
import {Star, ChatLineRound} from '@element-plus/icons-vue';
import {useRouter} from "vue-router";
// import {searchUserUsingPOST} from "../../api/langbei/SearchController";

const router = useRouter();
const blogList = ref([]);
const pageNum = ref(1);
const pageSize = ref(12);
const total = ref();
const ModeType = ref("default")
const appStore = useAppStoreWithOut()
const {wsCache} = useCache()
const currentUser = ref();
const searchText = ref('')

//获取当前用户
currentUser.value = wsCache.get(appStore.getUserInfo)

onMounted(async () => {
  await getBlogList();
})

//获取推荐用户
async function getBlogList() {
  const res = await listBlogPageUsingPOST({
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    searchText: searchText.value
  });
  console.log(res)
  blogList.value = res.data.records
  console.log(blogList.value);
  total.value = res.data.total;
  blogList.value = res.data.records

}

//分页查询用户
async function searchUserPage() {
  const res = await searchByTextUsingGET({
    searchText: searchText.value,
    pageNum: pageNum.value,
    pageSize: pageSize.value
  })
  console.log(res);
  const userListData = res.data.records
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    blogList.value = userListData;
  }
}

//分页查询用户
async function searchUserByEs() {
  const res = await searchUserUsingPOST({
    searchText: searchText.value,
  })
  // console.log(res);
  const userListData = res.data
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    blogList.value = userListData;
  }
}

//监听页数变化
watch(pageNum, (newVal, oldVal) => {
  searchUserPage();
})

//搜索用户
const doSearch = async () => {
  if (searchText.value === '') {
    await getBlogList();
  } else {
    await searchUserPage();
  }
}

//心动匹配模式获取用户
async function matchUser() {
  const res = await matchUsersUsingGET({
    num: 10
  });
  const userListData = res.data
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    blogList.value = userListData;
  }
}

//切换模式
const modeChange = async () => {
  // console.log(ModeType.value);
  if (ModeType.value === 'default') {
    if (searchText.value === '') {
      await getBlogList();
    } else {
      await searchUserPage();
    }
  } else if (ModeType.value === 'match') {
    await matchUser();
  }
}

//点击卡片到用户详情页
const toUserInfo = (id) => {
  router.push({
    path: "/blog/info",
    query: {blogId: id}
  });
}

</script>

<style>

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card {
  margin-bottom: 10px;
}

.profile {
  font-size: 12px;
  color: #999;
}
</style>