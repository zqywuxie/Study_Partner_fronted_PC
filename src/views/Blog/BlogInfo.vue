<template>
  <el-row>
    <el-col :span="16">
      <div class="team-card">
        <el-card class="box-card">
          <template #header>
            <div class="team-card-header">
              <span>{{ blogInfo.name }}</span>
              <el-button v-if="!blogInfo.hasJoin" class="button" type="primary" @click="joinTeam">加入队伍</el-button>
              <el-button v-if="blogInfo?.userId === currentUser.id " class="button" type="primary" @click="toEditTeam">
                修改博客信息
              </el-button>
            </div>
          </template>
          <div class="team-card-info" style="display: flex;  align-items: center;">
            <el-image :src="blogInfo.coverImage" fit="fill" style="width: 100px; height: 100px; margin-right: 20px;"/>
            <el-descriptions
                :column="4"
                :title="blogInfo.description"
                border
                direction="vertical"
            >
              <el-descriptions-item label="创建时间">{{ moment(blogInfo.createTime).format('lll') }}
              </el-descriptions-item>
              <el-descriptions-item label="博客内容">{{ blogInfo.content }}
              </el-descriptions-item>
              <el-descriptions-item label="作者">{{ blogInfo.author?.username }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-card>
      </div>
    </el-col>
    <el-col :span="6" style="margin-left: 5px">
      <el-card>
        <template #header>
          <!--          <div style="display: flex;align-items: center" @click="toUserInfo(teamInfo.createUser?.id)">-->
          <!--            <el-avatar :size="60" :src="teamInfo.createUser?.avatarUrl" style="margin-right: 5px"/>-->
          <!--            <span>{{ teamInfo.createUser?.username }}</span>-->
          <!--          </div>-->
          公告
        </template>

        <div>
          {{ blogInfo.announce }}
          <!--          <el-descriptions-->
          <!--              :column="1"-->
          <!--              class="margin-top"-->
          <!--              size="small"-->
          <!--          >-->
          <!--            <el-descriptions-item-->
          <!--                label="简介:">-->
          <!--              {{ teamInfo.createUser?.profile }}-->
          <!--            </el-descriptions-item>-->
          <!--            <el-descriptions-item-->
          <!--                label="联系方式:">-->
          <!--              {{ teamInfo.createUser?.contactInfo }}-->
          <!--            </el-descriptions-item>-->
          <!--          </el-descriptions>-->
        </div>
      </el-card>
    </el-col>
  </el-row>

  <el-row style="margin-top: 10px">
    <el-col :span="16" v-for="comment in commentList">
      <el-card class="team-info-detail-card">
        <template #header>
          <div class="team-info-detail-card-header">
            <el-image :src="comment?.commentUser?.avatarUrl" fit="fill"
                      style="width: 50px; height: 50px; margin-right: 20px;border-radius: 50%"/>
            <el-text style="display: inline-block; margin-left: 100px;">{{ comment.commentUser?.username }}</el-text>
            <!--            <el-button v-if="blogInfo.hasJoin" class="button" type="danger" @click="quitTeam">退出队伍</el-button>-->
          </div>
        </template>
        <el-descriptions :column="1">
          <el-descriptions-item
              label="队伍名:"
          >{{ comment.content }}
          </el-descriptions-item
          >

          <el-descriptions-item align="left" label="状态:" label-align="right">
            <el-tag v-if="blogInfo.status === 0" class="ml-2" type="success">公开</el-tag>
            <el-tag v-else class="ml-2" type="danger">加密</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>

import moment from "moment";
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";

import {getBlogByIdUsingGET,} from "@/servers/api/blogController";
import {listBlogCommentsUsingGET} from '@/servers/api/commentsController'

import {useAppStoreWithOut} from "@/store/modules/app";
import {useCache} from "@/hooks/web/useCache";
import {ElMessage} from "element-plus";
import User = API.User;

const router = useRouter();
const route = useRoute();
const blogId = route.query.blogId;
const blogInfo = ref<API.BlogVO>({});
const commentList = ref<API.CommentsVO[]>([])
const appStore = useAppStoreWithOut()
const {wsCache} = useCache()
const currentUser = ref();
// const author = ref<User>()
//获取当前用户
currentUser.value = wsCache.get(appStore.getUserInfo)
if (currentUser.value.tags) {
  currentUser.value.tags = JSON.parse(currentUser.value.tags);
}

async function getBlogInfo() {
  console.log(blogId)
  const res = await getBlogByIdUsingGET({
    id: blogId
  })
  console.log(res)
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
</style>
