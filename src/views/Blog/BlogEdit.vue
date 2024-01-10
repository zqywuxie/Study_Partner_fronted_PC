<template>
  <el-card class="box-card">
    <template #header>
      <div class="myedit-card-header">
        <h2
          ><b>{{ typeText }}</b></h2
        >
      </div>
    </template>

    <!--=============博客信息表单===============-->
    <el-form :model="blogInfo" label-width="100px">
      <el-form-item label="封面">
        <el-upload
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
          :show-file-list="false"
          :action="PATH_URL + '/api/fileOss/upload'"
          class="avatar-uploader"
        >
          <el-image
            v-if="blogInfo.coverImage"
            :size="100"
            :src="blogInfo.coverImage"
            fit="fill"
            style="width: 100px; height: 100px; margin-right: 20px"
          >
          </el-image>
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="blogInfo.title" />
      </el-form-item>

      <!--      todo 考虑为博文添加类别-->
      <!--      <el-form-item label="类别">-->
      <!--        <el-select v-model="blogInfo.status" placeholder="队伍类别">-->
      <!--          <el-option :value=Number(0) label="公开"/>-->
      <!--          <el-option :value=Number(1) label="加密"/>-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <Editor v-model="defaultHtml" ref="editorRef" @change="change" />
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ blogInfo.id ? '修改' : '创建' }}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import {Editor} from '@/components/Editor'
import {Plus} from '@element-plus/icons-vue'
import {ElMessage, UploadProps} from 'element-plus'
import {useRoute, useRouter} from 'vue-router'
import {addBlogUsingPost, getBlogByIdUsingGet, updateBlogUsingPut} from '@/servers/api/blogController'
import {currentUserUsingGet} from '@/servers/api/userController'
import {onMounted, ref} from 'vue'
import {PATH_URL} from '@/config/axios'

const router = useRouter()
const route = useRoute()
const blogId = route.query.blogId
const blogInfo = ref<API.BlogVO>({})
const oldMaxNum = ref()
const typeText = ref('创建队伍')
const userInfo = ref()

// 富文本编辑器
const defaultHtml = ref('<p>hello <strong>world</strong></p>')
const change = (html: string) => {
  console.log(html)
}

async function getBlogById() {
  const res = await getBlogByIdUsingGet({
    id: blogId
  })
  console.log(res)
  blogInfo.value = res.data
  oldMaxNum.value = blogInfo.value.maxNum
  typeText.value = '修改博客信息'
}

onMounted(async () => {
  userInfo.value = await currentUserUsingGet()
  // console.log(userInfo)
  console.log(blogId)
  if (blogId) {
    await getBlogById()
  }
})

// todo 博客更新
async function updateTeam() {
  const res = await updateBlogUsingPut({
    avatarUrl: blogInfo.value.avatarUrl,
    description: blogInfo.value.description,
    // 队伍公告
    // announce: teamInfo.value.announce,
    expireTime: blogInfo.value.expireTime,
    id: blogInfo.value.id,
    name: blogInfo.value.name,
    password: blogInfo.value.password,
    status: blogInfo.value.status,
    maxNum: blogInfo.value.maxNum
  })

  if (res.data) {
    ElMessage({
      message: '修改成功',
      grouping: true,
      type: 'success'
    })
    router.back()
  } else {
    ElMessage.error('修改队伍失败，请联系管理员')
  }
}

async function createTeam() {
  const res = await addBlogUsingPost({
    avatarUrl: blogInfo.value.avatarUrl,
    description: blogInfo.value.description,
    // announce: teamInfo.value.announce,
    expireTime: blogInfo.value.expireTime,
    name: blogInfo.value.name,
    password: blogInfo.value.password,
    status: blogInfo.value.status,
    maxNum: blogInfo.value.maxNum,
    userId: userInfo.value.id
  })

  if (res.data) {
    ElMessage({
      message: '创建队伍成功',
      grouping: true,
      type: 'success'
    })
    router.back()
  } else {
    ElMessage.error('创建队伍失败，请联系管理员')
  }
}

const onSubmit = async () => {
  if (blogInfo.value.id) {
    await updateTeam()
  } else {
    await createTeam()
  }
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  // currentUser?.value?.avatarUrl = URL.createObjectURL(uploadFile.raw!)
  console.log(response)
  if (blogInfo.value) {
    blogInfo.value.avatarUrl = response.data
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
  width: 100px;
  height: 100px;
  color: #8c939d;
  font-size: 28px;
  text-align: center;
}
</style>
