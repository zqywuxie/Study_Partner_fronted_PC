<template>
  <el-card class="box-card">
    <template #header>
      <div class="myedit-card-header">
        <h2><b>{{ typeText }}</b></h2>
      </div>
    </template>


    <!--=============队伍信息表单===============-->
    <el-form :model="teamInfo" label-width="120px">
      <el-form-item label="头像">
        <el-upload
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
            :action="PATH_URL+'/api/fileOss/upload'"
            class="avatar-uploader"
        >
          <el-image v-if="teamInfo.avatarUrl" :size="100" :src="teamInfo.avatarUrl" fit="fill"
                    style="width: 100px; height: 100px; margin-right: 20px;">
          </el-image>
          <el-icon v-else class="avatar-uploader-icon">
            <Plus/>
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="队伍名">
        <el-input v-model="teamInfo.name"/>
      </el-form-item>
      <el-form-item label="类别">
        <el-select v-model="teamInfo.status" placeholder="队伍类别">
          <el-option :value=Number(0) label="公开"/>
          <el-option :value=Number(1) label="加密"/>
        </el-select>
      </el-form-item>
      <el-form-item v-if="teamInfo.status === 1" label="密码">
        <el-input v-model="teamInfo.password" clearable type="password"/>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="teamInfo.description" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"/>
      </el-form-item>
<!--      todo 公告-->
<!--      <el-form-item label="公告">-->
<!--        <el-input v-model="teamInfo.announce" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"/>-->
<!--      </el-form-item>-->

      <el-form-item label="最大人数">
        <el-input-number v-model="teamInfo.maxNum" :max="20" :min="oldMaxNum"/>
      </el-form-item>
      <el-form-item label="过期时间">
        <el-date-picker
            v-model="teamInfo.expireTime"
            format="YYYY/MM/DD"
            placeholder="选择过期时间"
            type="date"
            value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ teamInfo.id ? '修改' : '创建' }}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>

import {Plus} from '@element-plus/icons-vue'
import {ElMessage, UploadProps} from "element-plus";
import {useRoute, useRouter} from "vue-router";
import {addUsingPost, searchTeamByIdUsingGet, updateUsingPost} from "@/servers/api/teamController";
import {currentUserUsingGet} from '@/servers/api/userController'
import {onMounted, ref} from "vue";

const router = useRouter();
const route = useRoute();
const teamId = route.query.teamId;
const teamInfo = ref<API.Team>({});
const oldMaxNum = ref(3);
const typeText = ref('创建队伍');
const userInfo = ref()
import {PATH_URL} from "@/config/axios";

async function getTeamById() {
  const res = await searchTeamByIdUsingGet({
    id: teamId
  })
  console.log(res);
  teamInfo.value = res.data;
  oldMaxNum.value = teamInfo.value.maxNum;
  typeText.value = '修改队伍信息'
}

onMounted(async () => {
  userInfo.value = await currentUserUsingGet()
  console.log(userInfo)
  if (teamId) {
    await getTeamById();
  }
})

async function updateTeam() {
  const res = await updateUsingPost({
    avatarUrl: teamInfo.value.avatarUrl,
    description: teamInfo.value.description,
    // 队伍公告
    // announce: teamInfo.value.announce,
    expireTime: teamInfo.value.expireTime,
    id: teamInfo.value.id,
    name: teamInfo.value.name,
    password: teamInfo.value.password,
    status: teamInfo.value.status,
    maxNum: teamInfo.value.maxNum,
  })

  if (res.data) {
    ElMessage({
      message: '修改成功',
      grouping: true,
      type: 'success',
    })
    router.back();
  } else {
    ElMessage.error('修改队伍失败，请联系管理员');
  }
}

async function createTeam() {
  const res = await addUsingPost({
    avatarUrl: teamInfo.value.avatarUrl,
    description: teamInfo.value.description,
    // announce: teamInfo.value.announce,
    expireTime: teamInfo.value.expireTime,
    name: teamInfo.value.name,
    password: teamInfo.value.password,
    status: teamInfo.value.status,
    maxNum: teamInfo.value.maxNum,
    userId: userInfo.value.id
  })

  if (res.data) {
    ElMessage({
      message: '创建队伍成功',
      grouping: true,
      type: 'success',
    })
    router.back();
  } else {
    ElMessage.error('创建队伍失败，请联系管理员');
  }
}

const onSubmit = async () => {
  if (teamInfo.value.id) {
    await updateTeam();
  } else {
    await createTeam();
  }


}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  // currentUser?.value?.avatarUrl = URL.createObjectURL(uploadFile.raw!)
  console.log(response)
  if (teamInfo.value) {
    teamInfo.value.avatarUrl = response.data;
  }
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('头像只能是图片喔！')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像大小不能超过2M喔！')
    return false
  }
  return true
}
</script>

<style scoped>
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>
