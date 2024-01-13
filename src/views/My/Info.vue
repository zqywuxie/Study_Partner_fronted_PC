<template>

  <el-row> <!-- 第一行：header -->
    <el-col :span="24">
      <div>
        <!--===================信息卡=======================-->
        <el-card class="box-card">
          <template #header>
            <div class="myInfo-card-header" style="display: flex">
              <el-avatar :size="100" :src="currentUser.avatarUrl" @click="toEdit"/>
              <div style="margin-left: 10px">
                <h3><b>{{ currentUser.username }}</b></h3>
                <div class="tags">
                  <el-tag v-for="(item,index) in currentUser.tags" :key="index" size="small" style="margin-left: 3px">{{
                      item
                    }}
                  </el-tag>
                </div>
                <h5 class="profile">{{ currentUser.profile }}</h5>
              </div>
            </div>
          </template>
          <el-descriptions :column="5">
            <el-descriptions-item
                align="left"
                class-name="my-content"
                label="账号:"
                label-align="right"
                label-class-name="my-label"

            >{{ currentUser.useraccount }}
            </el-descriptions-item
            >
            <el-descriptions-item align="left" label="角色:" label-align="right">
              <el-tag :type="currentUser.userRole === 1?'primary':'success'">
                {{ currentUser.userRole === 1 ? '管理员' : '普通用户' }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item align="left" label="加入时间:" label-align="right"
            >{{ moment(currentUser.createTime).format('lll') }}
            </el-descriptions-item
            >
          </el-descriptions>
        </el-card>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="18" style="margin-top: 10px"> <!-- 第二行：主体内容和侧边栏 -->
    <el-col :order="1" :span="18"> <!-- 主体内容 -->
      <div>
        <!--===================基本信息=======================-->
        <el-card class="box-card">
          <template #header>
            <div class="baseInfo-card-header" style="display: flex">
              <div style="flex: 1 1;">
                基本信息
              </div>
              <el-button :icon="UserFilled" circle link type="danger" @click="toEdit">修改密码</el-button>
              <el-button :icon="Edit" circle link type="primary" @click="toEdit">修改信息</el-button>
            </div>
          </template>
          <el-descriptions :column="1">
            <el-descriptions-item
                align="left"
                class-name="my-content"
                label="性别:"
                label-align="right"
                label-class-name="my-label"

            >{{ currentUser.gender === 1 ? '女' : '男' }}
            </el-descriptions-item
            >
            <el-descriptions-item align="left" label="简介:" label-align="right"
            >{{ currentUser.profile }}
            </el-descriptions-item
            >
            <el-descriptions-item align="left" label="电话号码:" label-align="right"
            >{{ currentUser.phone }}
            </el-descriptions-item
            >
            <el-descriptions-item align="left" label="邮箱:" label-align="right"
            >{{ currentUser.email }}
            </el-descriptions-item
            >
            <el-descriptions-item align="left" label="标签:" label-align="right">
              <el-tag v-for="(item,index) in currentUser.tags" :key="index" size="small" style="margin-left: 3px">{{
                  item
                }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item align="left" label="角色:" label-align="right">
              {{ currentUser.userRole === 1 ? '管理员' : '伙伴' }}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <!--===================其他信息=======================-->
        <el-card class="box-card" style="margin-top: 10px">
          <template #header>
            <div class="otherInfo-card-header" style="display: flex">
              <div style="flex: 1 1;">
                其他
              </div>
            </div>
          </template>
          <el-descriptions :column="1">
            <el-descriptions-item
                align="left"
                class-name="my-content"
                label="用户id:"
                label-align="right"
                label-class-name="my-label"

            >{{ currentUser.id }}
            </el-descriptions-item
            >
            <el-descriptions-item align="left" label="加入时间:" label-align="right"
            >{{ moment(currentUser.createTime).format('lll') }}
            </el-descriptions-item
            >
          </el-descriptions>
        </el-card>
      </div>
    </el-col>
    <el-col :order="2" :span="6"> <!-- 侧边栏 -->
      <div class="CreateTeamsList" style="margin-bottom: 5px">
        <el-card class="createTeamsList-box-card">
          <template #header>
            <div class="card-header">
              <span>我创建的队伍</span>
            </div>
          </template>
          <div v-if="!myCreateTeamsList">
            <el-empty description="我创建的队伍喔"/>
          </div>
          <div v-else>
            <el-row v-for="team in myCreateTeamsList" @click="clickTeam(team.id)">
              <el-col :span="5">
                <el-avatar :src="team.avatarUrl"/>
              </el-col>
              <el-col :span="15">
                {{ team.name }}
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
      <div class="myJoinTeamsList">
        <el-card class="myJoinTeamsList-box-card">
          <template #header>
            <div class="card-header">
              <span>我加入的队伍</span>
            </div>
          </template>
          <div v-if="!myJoinTeamsList">
            <el-empty description="没有加入队伍喔"/>
          </div>
          <div v-else>
            <el-row v-for="team in myJoinTeamsList" @click="clickTeam(team.id)">
              <el-col :span="5">
                <el-avatar :src="team.avatarUrl"/>
              </el-col>
              <el-col :span="15">
                {{ team.name }}
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>


</template>

<script setup>
import {useAppStoreWithOut} from "../../store/modules/app";
import {useCache} from "../../hooks/web/useCache";
import {onMounted, ref} from "vue";
import moment from "moment";
import {Edit, UserFilled} from '@element-plus/icons-vue'
import {useRouter} from "vue-router";
import {myCreateTeamsUsingGet, myJoinTeamsUsingGet} from "../../servers/api/teamController";

const router = useRouter();
const appStore = useAppStoreWithOut()
const {wsCache} = useCache()
const currentUser = ref();
//获取当前用户
currentUser.value = wsCache.get(appStore.getUserInfo)
if (currentUser.value.tags) {
  currentUser.value.tags = JSON.parse(currentUser.value.tags);
}
// console.log(currentUser.value)
const myCreateTeamsList = ref([]);
const myJoinTeamsList = ref([]);

onMounted(async () => {
  const resCreate = await myCreateTeamsUsingGet({});
  const resJoin = await myJoinTeamsUsingGet({});
  // console.log(resCreate);
  // console.log(resJoin);
  myCreateTeamsList.value = resCreate.data;
  myJoinTeamsList.value = resJoin.data;
})

//跳转到我的信息修改页
const toEdit = () => {
  router.push("/my/edit");
}

const clickTeam = (teamId) => {
  router.push({
    path: '/team/info',
    query: {
      teamId: teamId
    }
  })
  // console.log(teamId)
}

</script>

<style scoped>
.profile {
  padding-top: 10px;
  color: rgba(0, 0, 0, .45);
  font-size: 13px
}
</style>
