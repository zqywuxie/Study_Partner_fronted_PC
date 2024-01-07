<template>
  <el-card class="box-card">
    <template #header>
      <div class="myedit-card-header">
        <h2><b>个人信息修改</b></h2>
      </div>
    </template>


    <!--=============个人信息表单===============-->
    <el-form :model="currentUser" label-width="120px">
      <el-form-item label="头像">
        <el-upload
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
            :action="PATH_URL+'/api/fileOss/upload'"
            class="avatar-uploader"
        >
          <el-avatar v-if="currentUser.avatarUrl" :size="100" :src="currentUser.avatarUrl"/>
          <el-icon v-else class="avatar-uploader-icon">
            <Plus/>
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="currentUser.username"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="currentUser.gender" placeholder="请选择您的性别">
          <el-option :value=Number(0) label="男"/>
          <el-option :value=Number(1) label="女"/>
        </el-select>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="currentUser.profile" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"/>
      </el-form-item>
      <el-form-item label="标签">
        <el-select
            v-model="userTagsJson"
            :multiple-limit="6"
            :reserve-keyword="false"
            allow-create
            default-first-option
            filterable
            multiple
            placeholder="选择你的标签"
            @change="tagsChange"
        >
          <el-option
              v-for="item in tags"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="currentUser.phone"/>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="currentUser.contactInfo"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
      </el-form-item>
    </el-form>

  </el-card>
</template>

<script lang="ts" setup>
import {useAppStoreWithOut} from "../../store/modules/app";
import {useCache} from "../../hooks/web/useCache";
import {ref} from "vue";
import {ElMessage, UploadProps} from 'element-plus'
import {Plus} from '@element-plus/icons-vue'
import tags from "@/views/My/tags/tags";
import {updateUserUsingPOST} from "@/api/langbei/userController";
import {useRouter} from "vue-router";
import {PATH_URL} from "@/config/axios";

const appStore = useAppStoreWithOut()
const {wsCache} = useCache()
const router = useRouter();
const currentUser = ref<API.User>();
const userTagsJson = ref<[]>([]);
//获取当前用户
currentUser.value = wsCache.get(appStore.getUserInfo)
if (currentUser.value?.tags) {
  userTagsJson.value = JSON.parse(currentUser.value.tags);
}


// console.log(currentUser.value)
//点击修改按钮，修改用户信息
const onSubmit = async () => {
  // console.log('修改用户信息')
  // console.log(currentUser.value)
  console.log(JSON.stringify(userTagsJson.value))
  if (currentUser.value) {
    currentUser.value.tags = JSON.stringify(userTagsJson.value);
  }
  // console.log(currentUser.value.tags)

  if (currentUser.value) {
    await updateUserUsingPOST({
      ...currentUser.value
    }).then(res => {
      // console.log(res)

      // 更新前端缓存的用户数据
      wsCache.set(appStore.getUserInfo, currentUser.value);
      ElMessage({
        message: '修改成功',
        grouping: true,
        type: 'success',
      })
      router.push("/my/info")
    });
  }
}

const tagsChange = () => {
  if (userTagsJson.value) {
    // console.log(userTagsJson.value[userTagsJson.value.length-1]);
    const lastIndex = userTagsJson.value.length - 1;
    const lastTag: string = userTagsJson.value[lastIndex];
    if (lastTag.length > 8) {
      userTagsJson.value?.splice(lastIndex)
      ElMessage.error('标签长度不能超过8个字喔！')
      // console.log(userTagsJson.value)
    }
  }
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  // currentUser?.value?.avatarUrl = URL.createObjectURL(uploadFile.raw!)
  console.log(response)
  if (currentUser.value) {
    currentUser.value.avatarUrl = response.data;
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

</style>
