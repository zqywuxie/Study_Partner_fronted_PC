<template>
  <el-row> <!-- 第一行：header -->
    <el-col :span="24">
      <div>
        <el-card class="box-card">
          <template #header>
            <div class="myInfo-card-header" style="display: flex">
              <el-avatar :size="100" :src="currentUser.avatarUrl"/>
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
            <!--            <el-descriptions-item align="left" label="编号:" label-align="right"-->
            <!--            >{{ currentUser.planetCode }}-->
            <!--            </el-descriptions-item-->
            <!--            >-->
            <el-descriptions-item align="left" label="角色:" label-align="right">
              {{ currentUser.userRole === 1 ? '管理员' : '普通用户' }}
            </el-descriptions-item>
            <el-descriptions-item align="left" label="加入时间:" label-align="right"
            >{{
                moment(currentUser.createTime).format('lll')
              }}
            </el-descriptions-item
            >
          </el-descriptions>
        </el-card>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="10" style="margin-top: 5px">
    <el-col :span="18" :order="1"> <!-- 主体内容 -->
      <div>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>ta的信息</span>
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
            >{{ currentUser.contactInfo }}
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
      </div>
    </el-col>
    <el-col :span="6" :order="2"> <!-- 侧边栏 -->
      <div>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>ta加入的队伍</span>
            </div>
          </template>
          <div v-if="!joinTeam">
            <el-empty description="ta还没有加入队伍喔"/>
          </div>
          <div v-else>
            <el-row v-for="team in joinTeam" @click="clickTeam(team.id)">
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
import moment from "moment";
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {searchUserByIdUsingGet} from "../../servers/api/userController"
import {getMyTeamsUsingGet} from "../../servers/api/teamController"

const route = useRoute();
const router = useRouter();
const userId = route.query.id;
const currentUser = ref({});
const joinTeam = ref([]);

onMounted(async () => {
  const res = await searchUserByIdUsingGet({
    id: userId
  });
  console.log(res)
  currentUser.value = res.data
  if (currentUser.value.tags) {
    currentUser.value.tags = JSON.parse(currentUser.value.tags);
  }
  // console.log(res.data[0]);
  const userIdNum = Number(userId)
  //  todo 查找用户加入的队伍
  const resTeam = await getMyTeamsUsingGet({})
  console.log(resTeam)
  joinTeam.value = resTeam.data
})

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
  color: rgb(229, 231, 235);
  font-size: 15px
}
</style>
