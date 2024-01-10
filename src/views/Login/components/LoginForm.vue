<script lang="ts" setup>
import {reactive, ref, unref, watch} from 'vue'
import {Form} from '@/components/Form'
import {useI18n} from '@/hooks/web/useI18n'
import {ElButton, ElCheckbox, ElLink, ElMessage} from 'element-plus'
import {required} from '@/utils/formRules'
import {useForm} from '@/hooks/web/useForm'
import {useCache} from '@/hooks/web/useCache'
import {useAppStore} from '@/store/modules/app'
import {usePermissionStore} from '@/store/modules/permission'
import type {RouteLocationNormalizedLoaded} from 'vue-router'
import {useRoute, useRouter} from 'vue-router'
import router from "@/router";
import UserLoginRequest = API.LoginRequest;
import {loginUsingPost} from "@/servers/api/userController";

const appStore = useAppStore()

const permissionStore = usePermissionStore()

const {currentRoute, addRoute, push} = useRouter()

const {t} = useI18n()


const rules = {
  useraccount: [required],
  password: [required]
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
    field: 'tool',
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
  {
    field: 'register',
    colProps: {
      span: 24
    }
  },
  {
    field: 'other',
    component: 'Divider',
    label: t('login.otherLogin'),
    componentProps: {
      contentPosition: 'center'
    }
  },
  {
    field: 'otherIcon',
    colProps: {
      span: 24
    }
  }
])

const iconSize = 30

const remember = ref(false)

const {register, elFormRef, methods} = useForm()

const loading = ref(false)

const iconColor = '#999'

const redirect = ref<string>('')
const route = useRoute();
watch(
    () => currentRoute.value,
    (route: RouteLocationNormalizedLoaded) => {
      redirect.value = route?.query?.redirect as string
    },
    {
      immediate: true
    }
)

const forgetPassword = () => {
  ElMessage.error('哈哈，我也不知道怎么办捏')
}

const clickOtherIcon = () => {
  ElMessage.error('哈哈，没那能力你知道吧')
}

const loginRemember = () => {
  ElMessage.error('哈哈，这玩意没用的')
}


// 登录
const signIn = async () => {
  const formRef = unref(elFormRef)
  await formRef?.validate(async (isValid) => {
    if (isValid) {
      loading.value = true
      const {getFormData} = methods
      const formData = await getFormData<UserLoginRequest>()

      const res = await loginUsingPost(formData)
          .catch(() => {
          })
          .finally(() => (loading.value = false))
      // console.log(res)
      if (res) {
        const {wsCache} = useCache()
        wsCache.set(appStore.getUserInfo, res.data)
        // getRole()
        location.replace("/")
      }
    }
  })
}


const props = defineProps({
  formType: {type: Number, required: true}
})
const emit = defineEmits(['update:formType'])
const changeType = () => {
  emit('update:formType', 1)
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
</script>

<template>
  <Form
      :rules="rules"
      :schema="schema"
      hide-required-asterisk
      label-position="top"
      size="large"
      @register="register"
  >
    <template #title>
      <h2 class="text-2xl font-bold text-center w-[100%]">{{ t('login.login') }}</h2>
    </template>

    <template #tool>
      <div class="flex justify-between items-center w-[100%]">
        <ElCheckbox v-model="remember" :label="t('login.remember')" size="small" @click="loginRemember"/>
        <ElLink :underline="false" type="primary" @click="forgetPassword">{{ t('login.forgetPassword') }}</ElLink>
      </div>
    </template>

    <template #login>
      <ElButton :loading="loading" class="w-[100%]" type="primary" @click="signIn">
        登录
      </ElButton>
    </template>
    <template #register>
      <ElButton :loading="loading" class="w-[100%]" type="primary" @click="changeType">
        注册
      </ElButton>
    </template>
    <template #otherIcon>
      <div class="flex justify-between w-[100%]">
        <Icon
            :color="iconColor"
            :size="iconSize"
            class="cursor-pointer anticon"
            icon="ant-design:github-filled"
            @click="clickOtherIcon"
        />
        <Icon
            :color="iconColor"
            :size="iconSize"
            class="cursor-pointer anticon"
            icon="ant-design:wechat-filled"
            @click="clickOtherIcon"

        />
        <Icon
            :color="iconColor"
            :size="iconSize"
            class="cursor-pointer anticon"
            icon="ant-design:alipay-circle-filled"
            @click="clickOtherIcon"

        />
        <Icon
            :color="iconColor"
            :size="iconSize"
            class="cursor-pointer anticon"
            icon="ant-design:weibo-circle-filled"
            @click="clickOtherIcon"

        />
      </div>
    </template>
  </Form>
</template>

<style lang="less" scoped>
:deep(.anticon) {
  &:hover {
    color: var(--el-color-primary) !important;
  }
}
</style>
