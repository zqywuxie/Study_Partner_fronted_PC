<template>
  <el-row>
    <el-col>
      <div class="team-card">
        <el-card class="blog-card">
          <template #header>
            <div class="blog-card-header">
              <span>{{ blogInfo.title }}</span>
              <el-button
                v-if="blogInfo?.userId === currentUser.id"
                class="edit-button"
                type="primary"
                @click="toEditBlog"
              >
                修改博客信息
              </el-button>
            </div>
          </template>

          <div style="display: flex; justify-content: center; align-items: center">
            <el-carousel
              indicator-position="outside"
              v-if="imageList.length >= 1"
              style="width: 350px"
            >
              <el-carousel-item v-for="item in imageList" :key="item" style="text-align: center">
                <el-image :src="item" style="max-width: 100%; max-height: 100%" />
              </el-carousel-item>
            </el-carousel>
          </div>

          <div class="blog-card-content">
            <el-row>
              <el-col :span="12">
                <el-descriptions :column="1" border>
                  <el-descriptions-item label="创建时间">
                    {{ moment(blogInfo.createTime).format('lll') }}
                  </el-descriptions-item>
                  <el-descriptions-item label="作者">
                    {{ blogInfo.author?.username }}
                  </el-descriptions-item>
                  <el-descriptions-item label="正文">
                    {{ blogInfo.content }}
                  </el-descriptions-item>
                </el-descriptions>

                <!-- Comment and Like buttons -->
                <!--                <div class="blog-card-buttons">-->
                <!--                  <el-button class="comment-button" icon="el-icon-chat-line-round" @click="comment">-->
                <!--                    评论-->
                <!--                  </el-button>-->
                <!--                  <el-button class="like-button" icon="el-icon-thumb-up" @click="like">-->
                <!--                    点赞-->
                <!--                  </el-button>-->
                <!--                </div>-->
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>

  <!--  评论-->
  <comment :comment-list="commentList" />
</template>

<script lang="ts" setup>
import moment from 'moment'
import {useRoute, useRouter} from 'vue-router'
import {onMounted, ref} from 'vue'

import {getBlogByIdUsingGet} from '@/servers/api/blogController'
import {listBlogCommentsUsingGet} from '@/servers/api/commentsController'
import {useAppStoreWithOut} from '@/store/modules/app'
import {useCache} from '@/hooks/web/useCache'
import comment from '@/components/Comment/comment.vue'

const router = useRouter()
const route = useRoute()
const blogId = route.query.blogId
const blogInfo = ref<API.BlogVO>({})
const commentList = ref<API.CommentsVO[]>([])
const appStore = useAppStoreWithOut()
const { wsCache } = useCache()
const currentUser = ref()

const toEditBlog = () => {
  router.push({
    path: '/blog/edit',
    query: {
      blogId: blogInfo.value.id
    }
  })
}

// const author = ref<User>()
//获取当前用户
currentUser.value = wsCache.get(appStore.getUserInfo)
if (currentUser.value.tags) {
  currentUser.value.tags = JSON.parse(currentUser.value.tags)
}

let imageList = ref([])

async function getBlogInfo() {
  const res = await getBlogByIdUsingGet({
    id: blogId
  })
  if (res.data.images) {
    imageList.value = res.data.images.split(',')
  }
  const comments = await listBlogCommentsUsingGet({
    blogId: blogId
  })
  // console.log(comments)
  // console.log(res.data)
  blogInfo.value = res.data
  commentList.value = comments.data
}

onMounted(async () => {
  await getBlogInfo()
})

const toUserInfo = (id: number) => {
  router.push({
    path: '/user/info',
    query: { id: id }
  })
}
</script>

<style scoped>
.el-carousel__item h3 {
  display: flex;
  margin: 0;
  color: #475669;
  line-height: 300px;
  opacity: 0.75;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.team-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.team-info-detail-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.blog-card {
  //max-width: 900px;
  margin: auto;
}

.blog-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.edit-button {
  margin-top: 10px;
}

.blog-card-content {
  padding: 20px;
}

.blog-cover-image {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.blog-card-buttons {
  //margin-bottom: 200px;
  display: flex;
  justify-content: space-between;
}

.comment-button,
.like-button {
  width: 48%;
  margin-top: 350px;
}
</style>
