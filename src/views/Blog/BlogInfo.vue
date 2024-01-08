<template>
  <el-row>
    <el-col >
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

          <el-carousel indicator-position="outside">
            <el-carousel-item v-for="item in imageList" :key="item"
                              style="height: 300px;width: 300px;align-items: center">
              <!--              <span>{{item}}</span>-->
              <el-image :src="item"/>
            </el-carousel-item>
          </el-carousel>


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


  <comment/>
<!--  <el-row style="margin-top: 10px">-->
<!--    <el-col :span="16" v-for="comment in commentList">-->
<!--      <el-card class="team-info-detail-card">-->
<!--        <el-descriptions :column="1">-->
<!--          <el-descriptions-item-->
<!--          >-->
<!--            <template #label>-->
<!--              <el-image :src="comment?.commentUser?.avatarUrl" fit="fill"-->
<!--                        style="width: 50px; height: 50px; border-radius: 50%"/>-->
<!--            </template>-->

<!--            {{ comment.commentUser?.username }}-->
<!--          </el-descriptions-item-->
<!--          >-->
<!--          <el-descriptions-item-->
<!--              label="发布时间:"-->
<!--          >{{ moment(comment.createTime).format('lll') }}-->
<!--          </el-descriptions-item-->
<!--          >-->
<!--        </el-descriptions>-->
<!--        <el-collapse accordion>-->
<!--          <el-collapse-item name="1">-->
<!--            <template #title>-->
<!--              内容-->
<!--              <el-icon class="header-icon">-->
<!--                <info-filled/>-->
<!--              </el-icon>-->
<!--            </template>-->
<!--            <div>-->
<!--              {{ comment.content }}-->
<!--            </div>-->
<!--          </el-collapse-item>-->
<!--        </el-collapse>-->
<!--      </el-card>-->
<!--    </el-col>-->

<!--  </el-row>-->
</template>

<script lang="ts" setup>

import moment from "moment";
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";

import {getBlogByIdUsingGET,} from "@/servers/api/blogController";
import {listBlogCommentsUsingGET} from '@/servers/api/commentsController'
import {InfoFilled} from '@element-plus/icons-vue'
import {useAppStoreWithOut} from "@/store/modules/app";
import {useCache} from "@/hooks/web/useCache";
import {ElMessage} from "element-plus";
import comment from "@/components/Comment/comment.vue";
import User = API.User;

const router = useRouter();
const route = useRoute();
const blogId = route.query.blogId;
const blogInfo = ref<API.BlogVO>({});
const commentList = ref<API.CommentsVO[]>([])
const appStore = useAppStoreWithOut()
const {wsCache} = useCache()
const currentUser = ref();

const toEditBlog = () => {
  router.push({
    path: "/blog/edit",
    query: {
      blogId: blogInfo.value.id
    }
  })
}


// const author = ref<User>()
//获取当前用户
currentUser.value = wsCache.get(appStore.getUserInfo)
if (currentUser.value.tags) {
  currentUser.value.tags = JSON.parse(currentUser.value.tags);
}


let imageList = ref([])

async function getBlogInfo() {
  console.log(blogId)
  const res = await getBlogByIdUsingGET({
    id: blogId
  })
  imageList.value = res.data.images.split(',')
  const comments = await listBlogCommentsUsingGET({
    blogId: blogId
  })
  console.log(comments)
  blogInfo.value = res.data;
  commentList.value = comments.data
}

onMounted(async () => {
  await getBlogInfo();
})

const toUserInfo = (id: number) => {
  router.push({
    path: "/user/info",
    query: {id: id}
  });
}
const toEditTeam = () => {
  router.push({
    path: "/team/edit",
    query: {teamId: blogInfo.value.id}
  });
}
const quitTeam = async () => {
  const res = await quitTeamUsingPOST({
    teamId: blogInfo.value.id
  })
  if (res.data) {
    ElMessage({
      message: '退出队伍成功',
      type: 'success'
    });
    await router.push({
      path: "/team",
    });
  } else {
    ElMessage.error('退出队伍失败，请联系管理员');
  }
}

const joinTeam = async () => {
  const res = await joinTeamUsingPOST({
    teamId: blogInfo.value.id,
  })
  if (res.data) {
    ElMessage({
      message: '加入队伍成功',
      type: 'success'
    })
    await getBlogInfo();
  } else {
    ElMessage.error('加入队伍出错，请联系管理员');
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}


.team-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.team-info-detail-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.blog-card {
  //max-width: 900px;
  margin: auto;
}

.blog-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
