<template>
  <el-card class="box-card">
    <template #header>
      <div class="myedit-card-header">
        <h2><b>{{ typeText }}</b></h2>
      </div>
    </template>


    <!--=============博客信息表单===============-->
    <el-form :model="blogInfo" label-width="100px">
      <el-form-item label="封面">
        <el-upload
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
            :action="PATH_URL+'/api/fileOss/upload'"
            class="avatar-uploader"
        >
          <el-image v-if="blogInfo.coverImage" :size="100" :src="blogInfo.coverImage" fit="fill"
                    style="width: 100px; height: 100px; margin-right: 20px;">
          </el-image>
          <el-icon v-else class="avatar-uploader-icon">
            <Plus/>
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="blogInfo.title"/>
      </el-form-item>

      <!--      todo 考虑为博文添加类别-->
      <!--      <el-form-item label="类别">-->
      <!--        <el-select v-model="blogInfo.status" placeholder="队伍类别">-->
      <!--          <el-option :value=Number(0) label="公开"/>-->
      <!--          <el-option :value=Number(1) label="加密"/>-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <editor>

      </editor>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ blogInfo.id ? '修改' : '创建' }}</el-button>
      </el-form-item>
    </el-form>


  </el-card>


</template>

<script lang="ts" setup>

import {Plus} from '@element-plus/icons-vue'
import {ElMessage, UploadProps} from "element-plus";
import {useRoute, useRouter} from "vue-router";
import {addBlogUsingPOST, getBlogByIdUsingGET, updateBlogUsingPUT} from "@/servers/api/blogController";
import {currentUserUsingGET} from '@/servers/api/userController'
import {onMounted, ref} from "vue";
import editor from "@/components/WangEditor/editor.vue";


const router = useRouter();
const route = useRoute();
const blogId = route.query.blogId;
const blogInfo = ref<API.BlogVO>({});
const oldMaxNum = ref();
const typeText = ref('创建队伍');
const userInfo = ref()
import {PATH_URL} from "@/config/axios";


// 事件方法
const onEditorBlur = (e) => {
  console.log(e, '失去焦点事件');
}
const onEditorFocus = (e) => {
  console.log(e, '获得焦点事件');
}
const onEditorChange = (e) => {
  console.log(e, '内容改变事件');
}


// 富文本功能配置
const editorOption = {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
      ['blockquote', 'code-block'],     //引用，代码块
      [{'header': 1}, {'header': 2}],        // 标题，键值对的形式；1、2表示字体大小
      [{'list': 'ordered'}, {'list': 'bullet'}],     //列表
      [{'script': 'sub'}, {'script': 'super'}],   // 上下标
      [{'indent': '-1'}, {'indent': '+1'}],     // 缩进
      [{'direction': 'rtl'}],             // 文本方向
      [{'size': ['small', false, 'large', 'huge']}], // 字体大小
      [{'header': [1, 2, 3, 4, 5, 6, false]}],     //几级标题
      [{'color': []}, {'background': []}],     // 字体颜色，字体背景颜色
      [{'font': []}],     //字体
      [{'align': []}],    //对齐方式
      ['clean'],    //清除字体样式
      ['image', 'video']    //上传图片、上传视频
    ]
  }
}


async function getBlogById() {
  const res = await getBlogByIdUsingGET({
    id: blogId
  })
  console.log(res);
  blogInfo.value = res.data;
  oldMaxNum.value = blogInfo.value.maxNum;
  typeText.value = '修改博客信息'
}

onMounted(async () => {
  userInfo.value = await currentUserUsingGET()
  // console.log(userInfo)
  console.log(blogId)
  if (blogId) {
    await getBlogById();
  }
})


// todo 博客更新
async function updateTeam() {
  const res = await updateBlogUsingPUT({
    avatarUrl: blogInfo.value.avatarUrl,
    description: blogInfo.value.description,
    // 队伍公告
    // announce: teamInfo.value.announce,
    expireTime: blogInfo.value.expireTime,
    id: blogInfo.value.id,
    name: blogInfo.value.name,
    password: blogInfo.value.password,
    status: blogInfo.value.status,
    maxNum: blogInfo.value.maxNum,
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
  const res = await addBlogUsingPOST({
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
      type: 'success',
    })
    router.back();
  } else {
    ElMessage.error('创建队伍失败，请联系管理员');
  }
}

const onSubmit = async () => {
  if (blogInfo.value.id) {
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
  if (blogInfo.value) {
    blogInfo.value.avatarUrl = response.data;
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
