<script lang="ts" setup>
import {reactive, ref, unref} from 'vue'
import {Form} from '@/components/Form'
import {useI18n} from '@/hooks/web/useI18n'
import {ElButton, ElLink, ElMessage, FormRules} from 'element-plus'
import {required} from '@/utils/formRules'
import {useForm} from '@/hooks/web/useForm'
import {useAppStore} from '@/store/modules/app'
import {usePermissionStore} from '@/store/modules/permission'
import {useRoute, useRouter} from 'vue-router'
import {getUserByEmailUsingGET, registerUsingPOST} from '@/servers/api/userController'
import {getCaptchaUsingGET1} from '@/servers/api/mailController'
import UserLoginRequest = API.UserLoginRequest;

const appStore = useAppStore()

const permissionStore = usePermissionStore()

const {currentRoute, addRoute, push} = useRouter()

const {t} = useI18n()


// todo 校验逻辑需要修改
const rules: FormRules = {
  avatarUrl: [required],
  useraccount: [{required: true, message: '请输入用户账号', trigger: 'blur'}, {
    min: 6,
    max: 8,
    message: '用户账号在6到8位'
  }],
  password: [{required: true, message: '请输入密码', trigger: 'blur'}, {
    min: 6,
    max: 8,
    message: '密码在6到8位'
  }],
  checkPassword: [{required: true, message: '请输入用户名', trigger: 'blur'}, {
    min: 6,
    max: 8,
    message: '用户账号在6到8位'
  }],
  email: [{required: true, message: '请输入邮箱', trigger: 'blur'},],
  captcha: [required]
}


const schema = reactive<FormSchema[]>([
  {
    field: 'title',
    colProps: {
      span: 24
    }
  },
  {
    field: 'useraccount',
    label: t('login.username'),
    value: '',
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: '请输入账号'
    }
  },
  {
    field: 'password',
    label: t('login.password'),
    value: '',
    component: 'InputPassword',
    colProps: {
      span: 24
    },
    componentProps: {
      style: {
        width: '100%'
      },
      placeholder: '请输入密码'
    }
  },
  {
    field: 'checkPassword',
    label: '确认密码',
    value: '',
    component: 'InputPassword',
    colProps: {
      span: 24
    },
    componentProps: {
      style: {
        width: '100%'
      },
      placeholder: '确认密码',
    }
  },
  {
    field: 'email',
    label: '邮箱',
    value: '',
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: '输入你的邮箱',
    },
  },
  {
    field: 'captcha',
    label: '验证码',
    value: '',
    component: 'Input',
    colProps: {
      span: 14
    },
    componentProps: {
      placeholder: '输入你的验证码',
    },
  },
  {
    field: 'tool',
    colProps: {
      span: 24
    }
  },
  {
    field: 'register',
    colProps: {
      span: 24
    }
  },
  {
    field: 'login',
    colProps: {
      span: 24
    }
  },
])


const {register, elFormRef, methods} = useForm()

const loading = ref(false)

const redirect = ref<string>('')
const route = useRoute();
// watch(
//   () => currentRoute.value,
//   (route: RouteLocationNormalizedLoaded) => {
//     redirect.value = route?.query?.redirect as string
//   },
//   {
//     immediate: true
//   }
// )

// 登录
const userRegister = async () => {
  const formRef = unref(elFormRef)
  await formRef?.validate(async (isValid) => {
    if (isValid) {
      loading.value = true
      const {getFormData} = methods
      const formData = await getFormData<UserLoginRequest>()

      const res = await registerUsingPOST(formData)
          .catch(() => {
          })
          .finally(() => (loading.value = false))
      console.log(res)
      if (res) {
        // getRole()
        ElMessage({
          message: '注册成功',
          grouping: true,
          type: 'success',
        })
        changeType()
      }
    }
  })
}

const props = defineProps({
  formType: {type: Number, required: true}
})
const emit = defineEmits(['update:formType'])
const changeType = () => {
  emit('update:formType', 0)
}


const isClick = ref(true)
const checkCaptcha = ref("");
const time = ref("获取验证码")
const sendCaptcha = async () => {
  const {getFormData} = methods
  const formData = await getFormData<UserLoginRequest>()
  let email = formData.email
  console.log(email)
  if (email) {
    const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
    if (isClick) {
      if (regEmail.test(email)) {
        let res = getUserByEmailUsingGET(email);
        if (res.code !== 0) {
          ElMessage.error('该邮箱已被使用')
        } else {
          const res = getCaptchaUsingGET1(email)  // 获取验证码接口
          if (res.code !== 0) {
            ElMessage.error(res.description)
          } else {
            // registerUser.value.captcha = res.data
            ElMessage({
              message: '验证码发送成功，请注意查收',
              type: 'success',
            })
            isClick.value = false
            let s = 60
            time.value = s + 's'
            let interval = setInterval(() => {
              s--
              time.value = s + 's'
              if (s < 0) {
                time.value = '重新获取'
                isClick.value = true
                clearInterval(interval)
              }
            }, 1000)
          }
        }
      }
    }
  } else {
    ElMessage({
      message: '请输入正确的邮箱',
      type: 'warning',
    })
  }


}

// 获取角色信息
// const getRole = async () => {
//   const { getFormData } = methods
//   const formData = await getCurrentUserUsingGET()
//   const params = {
//     roleName: formData.username
//   }
//   // admin - 模拟后端过滤菜单
//   // test - 模拟前端过滤菜单
//   const res =
//     formData.username === 'admin'
//       ? await getAdminRoleApi({ params })
//       : await getTestRoleApi({ params })
//   if (res) {
//     const { wsCache } = useCache()
//     const routers = res.data.list || []
//     wsCache.set('roleRouters', routers)
//
//     formData.username === 'admin'
//       ? await permissionStore.generateRoutes('admin', routers).catch(() => {})
//       : await permissionStore.generateRoutes('test', routers).catch(() => {})
//
//     permissionStore.getAddRouters.forEach((route) => {
//       addRoute(route as RouteRecordRaw) // 动态添加可访问路由表
//     })
//     permissionStore.setIsAddRouters(true)
//     push({ path: redirect.value || permissionStore.addRouters[0].path })
//   }
// }


// todo 头像

import {ref} from 'vue'
import {ElMessage} from 'element-plus'
import {Plus} from '@element-plus/icons-vue'

import type {UploadProps} from 'element-plus'
import {PATH_URL} from "@/config/axios";

const avatarUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  avatarUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('头像必须是image/jpeg/png格式')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不能超过2MB')
    return false
  }
  return true
}
</script>

<template>
  <Form
      :rules="rules"
      :schema="schema"
      hide-required-asterisk
      label-position="left"
      size="large"
      @register="register"
  >
    <template #title>
      <div class="container">
        <h2 class="text-2xl font-bold text-center w-[100%]">注册</h2>
        <el-upload
            class="avatar-uploader"
            :action="PATH_URL+'/api/fileOss/upload'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
          <img v-if="avatarUrl" :src="avatarUrl" class="avatar"/>
          <el-icon v-else class="avatar-uploader-icon">
            <Plus/>
          </el-icon>
        </el-upload>
      </div>
    </template>


    <template #tool>
      <ElButton :loading="loading" class="w-[30%]" type="primary" @click="sendCaptcha">
        {{ time }}
      </ElButton>
      <div class="flex justify-between items-center w-[100%]">
        <ElLink :underline="false" type="primary" @click="changeType">已有帐号？去登录</ElLink>
      </div>
    </template>


    <template #register>
      <ElButton :loading="loading" class="w-[100%]" type="primary" @click="userRegister">
        注册
      </ElButton>
    </template>
  </Form>
</template>

<style lang="less" scoped>

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.anticon) {
  &:hover {
    color: var(--el-color-primary) !important;
  }
}


//todo 头像样式
.avatar-uploader .avatar {
  width: 130px;
  height: 100px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
  align-items: center;
}
</style>
