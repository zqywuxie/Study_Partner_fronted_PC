<template>

  <div class="common-layout">
    <el-container>
      <el-aside width="130px">
        <el-tabs v-model="status" class="demo-tabs" style="height: 200px" tab-position="left"
                 @tab-change="statusChange">
          <el-tab-pane :name=0 label="公开"></el-tab-pane>
          <el-tab-pane :name=1 label="加密"></el-tab-pane>
        </el-tabs>
      </el-aside>
      <el-container>
        <el-header>
          <div style="display:inline-block; margin-right: 10px">
            <div style="display: flex; align-items: center;">
              <el-input
                  v-model="searchText"
                  :prefix-icon="Search"
                  class="w-50 m-2"
                  placeholder="搜索你感兴趣的队伍吧！"
                  @change="doSearch"
              />
              <el-button type="primary" :icon="Search" @click="doSearch">搜索</el-button>
              <el-button class="w-50 m-2" @click="createTeam">创建队伍</el-button>
            </div>
          </div>

        </el-header>
        <el-main>
          <el-card v-for="(team, index) in teamList" :key="index" shadow="hover" style="margin-bottom: 20px;">
            <template #header>
              <div class="teamList-card-header">
                <b>{{ team.name }}</b>
                <div style="  align-items: center;">
                  <template v-for="mem in team.joinUserList">
                    <el-avatar :size="20" :src="mem.avatarUrl"/>
                  </template>
                </div>
                <div class="teamMem">
                  <p>队伍人数：{{ team.hasJoinNum }}/{{ team.maxNum }}</p>
                </div>
              </div>
            </template>

            <div style="display: flex;  align-items: center;">
              <img :src="team.avatarUrl" alt="team-avatar" style="width: 100px; height: 100px; margin-right: 20px;">

              <el-descriptions
                  :column="4"
                  :title="team.description"
                  border
                  direction="vertical"
              >
                <el-descriptions-item label="队长">{{ team.manageUserList[0].username }}</el-descriptions-item>
                <el-descriptions-item label="创建时间">{{ moment(team.createTime).format('lll') }}
                </el-descriptions-item>
                <el-descriptions-item :span="2" label="截止时间">
                  {{ team.expireTime ? moment(team.expireTime).format('lll') : '无限期' }}
                </el-descriptions-item>
              </el-descriptions>
              <el-button v-if="team.status === 0  " style="margin-left: auto" type="primary"
                         @click="toTeamInfo(team.id)">查看队伍
              </el-button>
              <el-button v-if="team.status === 1 && team.hasJoin === false" style="margin-left: auto" type="primary"
                         @click="joinPassTeam(team.id)">加入队伍
              </el-button>
              <el-button v-else-if="team.status === 1 && team.hasJoin === true" style="margin-left: auto" type="primary"
                         @click="toTeamInfo(team.id)">查看队伍
              </el-button>
            </div>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>

  <div class="password-form">
    <el-dialog v-model="passwordDialog" title="加入队伍">
      <el-form :model="passwordForm">
        <el-form-item label="请输入密码：" label-width="140px">
          <el-input v-model="passwordForm.password" autocomplete="off" type="password" show-password/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="passwordDialog = false;passwordForm.password=''">取消</el-button>
        <el-button type="primary" @click="joinPassTeamReq">
          确认
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>

import {onMounted, ref} from "vue";
import {joinTeamUsingPOST, searchAllUsingGET} from "@/servers/api/teamController";
import moment from "moment";
import {Search} from '@element-plus/icons-vue';
import {useRouter} from "vue-router";
import {ElMessage} from 'element-plus'

const router = useRouter();
const pageSize = ref(10);
const pageNum = ref(1);
const status = ref(0);
const searchText = ref('');
const passwordDialog = ref<boolean>(false);
const teamList = ref<API.TeamUserVO[]>();
const passwordForm = ref({
  password: ''
});
const clickTeamId = ref();

async function getTeamList() {
  const res = await searchAllUsingGET({
    // pageSize: pageSize.value,
    // pageNum: pageNum.value,
    status: status.value,
    searchText: searchText.value
  })
  console.log(res)
  teamList.value = res.data;
}

onMounted(async () => {
  await getTeamList();
})

//切换模式
const statusChange = async () => {
  // console.log(ModeType.value);
  await getTeamList();
}

const doSearch = async () => {
  // console.log(ModeType.value);
  await getTeamList();
}

const toTeamInfo = (teamId: number) => {
  console.log("跳转队伍详情页")
  router.push({
    path: '/team/info',
    query: {
      teamId: teamId
    }
  })
}

const joinPassTeam = (teamId) => {
  passwordDialog.value = true;
  clickTeamId.value = teamId;
  console.log("加入密码房")
}

const joinPassTeamReq = async () => {
  const res = await joinTeamUsingPOST({
    teamId: clickTeamId.value,
    password: passwordForm.value.password
  })
  if (res.data) {
    ElMessage({
      message: '加入队伍成功',
      type: 'success'
    })
    passwordDialog.value = false;
    await getTeamList();
  } else {
    ElMessage.error('请检查密码，或联系队长');
  }
}
const createTeam = () => {
  router.push({
    path: '/team/create',
  })
}


</script>

<style>
.teamList-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>
