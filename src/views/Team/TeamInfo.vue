<template>
  <el-row>
    <el-col :span="16">
      <div class="team-card">
        <el-card class="box-card">
          <template #header>
            <div class="team-card-header">
              <span>{{ teamInfo.name }}</span>
              <div>
                <el-button v-if="!teamInfo.hasJoin" class="button" type="primary" @click="joinTeam">加入队伍</el-button>
                <div class="button-group" v-if="teamInfo?.userId === currentUser.id">
                  <el-button class="button" type="primary" @click="toEditTeam" :icon="Edit">
                    修改队伍信息
                  </el-button>
                  <el-button class="button" type="primary" :icon="ChatDotSquare" @click="openGroupChat">
                    群聊
                  </el-button>
                </div>
              </div>
            </div>
          </template>
          <div class="team-card-info" style="display: flex; align-items: center;">
            <el-image :src="teamInfo.avatarUrl" fit="fill" style="width: 100px; height: 100px; margin-right: 20px;" />
            <el-descriptions :column="4" :title="teamInfo.description" border direction="vertical">
              <el-descriptions-item label="创建时间">{{ moment(teamInfo.createTime).format('lll') }}</el-descriptions-item>
              <el-descriptions-item :span="2" label="截止时间">
                {{ teamInfo.expireTime ? moment(teamInfo.expireTime).format('lll') : '无限期' }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-card>
      </div>
    </el-col>


    <el-col :span="6" style="margin-left: 5px">
      <el-card>
        <template #header>
          公告
        </template>

        <div>
          {{ teamInfo.announce }}
        </div>
      </el-card>
    </el-col>
  </el-row>

  <el-row style="margin-top: 10px">
    <el-col :span="16">
      <el-card class="team-info-detail-card">
        <template #header>
          <div class="team-info-detail-card-header">
            <span>队伍详细信息</span>
            <el-button v-if="teamInfo.hasJoin" class="button" type="danger" @click="quitTeam" :icon="Close">退出队伍</el-button>
          </div>
        </template>
        <el-descriptions :column="1">
          <el-descriptions-item
              label="队伍名:"
          >{{ teamInfo.name }}
          </el-descriptions-item
          >

          <el-descriptions-item align="left" label="队长:" label-align="right">
            {{ teamInfo.manageUserList && teamInfo.manageUserList[0] && teamInfo.manageUserList[0].username ? teamInfo.manageUserList[0].username : '未设置队长' }}
          </el-descriptions-item>

          <el-descriptions-item align="left" label="描述:" label-align="right"
          >{{ teamInfo.description }}
          </el-descriptions-item
          >

          <el-descriptions-item align="left" label="已加入人数:" label-align="right"
          >{{ teamInfo.hasJoinNum }}/{{ teamInfo.maxNum }}
          </el-descriptions-item
          >

          <el-descriptions-item align="left" label="状态:" label-align="right">
            <el-tag v-if="teamInfo.status === 0" class="ml-2" type="success">公开</el-tag>
            <el-tag v-else class="ml-2" type="danger">加密</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-col>

    <el-col :span="6" style="margin-left: 5px">
      <el-card class="team-join-card">
        <template #header>
          <div class="team-join-card-header">
            <span>管理员</span>
          </div>
        </template>
        <div v-for="item in teamInfo.manageUserList" :key="item.id"
             style="display: flex;align-items: center;margin-bottom: 8px" @click="toUserInfo(item.id)">
          <el-avatar :size="40" :src="item.avatarUrl" style="margin-right: 5px"/>
          <span>{{ item.username }}</span>
        </div>
      </el-card>
      <br/>
      <el-card class="team-join-card">
        <template #header>
          <div class="team-join-card-header">
            <span>成员</span>
          </div>
        </template>
        <div v-for="item in teamInfo.joinUserList" :key="item.id"
             style="display: flex;align-items: center;margin-bottom: 8px" @click="toUserInfo(item.id)">
          <el-avatar :size="40" :src="item.avatarUrl" style="margin-right: 5px"/>
          <span>{{ item.username }}</span>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>

import moment from "moment";
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";

import {searchTeamByIdUsingGet, joinTeamUsingPost, quitTeamUsingPost} from "@/servers/api/teamController";

import {useAppStoreWithOut} from "@/store/modules/app";
import {useCache} from "@/hooks/web/useCache";
import {ElMessage} from "element-plus";
import {ChatDotSquare, Close, Edit} from "@element-plus/icons-vue";

const router = useRouter();
const route = useRoute();
const teamId = route.query.teamId;
const teamInfo = ref<API.TeamUserVo>({});
const appStore = useAppStoreWithOut()
const {wsCache} = useCache()
const currentUser = ref();
const captain = ref()
//获取当前用户
currentUser.value = wsCache.get(appStore.getUserInfo)
if (currentUser.value.tags) {
  currentUser.value.tags = JSON.parse(currentUser.value.tags);
}

async function getTeamById() {
  console.log(teamId)
  const res = await searchTeamByIdUsingGet({
    id: teamId
  })
  console.log(res)
  teamInfo.value = res.data;
  // captain = teamId.manage
}

onMounted(async () => {
  await getTeamById();
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
    query: {teamId: teamInfo.value.id}
  });
}
const quitTeam = async () => {
  const res = await quitTeamUsingPost({
    teamId: teamInfo.value.id
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
  const res = await joinTeamUsingPost({
    teamId: teamInfo.value.id,
  })
  if (res.data) {
    ElMessage({
      message: '加入队伍成功',
      type: 'success'
    })
    await getTeamById();
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
