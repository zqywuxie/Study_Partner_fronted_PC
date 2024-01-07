<script lang="ts" setup>
import { reactive, ref, unref, watch } from 'vue'
import { Form } from '@/components/Form'
import { useI18n } from '@/hooks/web/useI18n'
import {ElButton, ElCheckbox, ElLink, ElMessage} from 'element-plus'
import { required } from '@/utils/formRules'
import { useForm } from '@/hooks/web/useForm'
import { getAdminRoleApi, getTestRoleApi } from '@/api/login'
import type { UserLoginType } from '@/api/login/types'
import { useCache } from '@/hooks/web/useCache'
import { useAppStore } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'
import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'
import {useRoute, useRouter} from 'vue-router'
import {getCurrentUserUsingGET, userLoginUsingPOST, userRegisterUsingPOST} from '@/api/langbei/userController'
import UserLoginRequest = API.UserLoginRequest

const appStore = useAppStore()

const permissionStore = usePermissionStore()

const { currentRoute, addRoute, push } = useRouter()

const { t } = useI18n()

const rules = {
  avatarUrl: [required],
  userAccount: [required],
  userPassword: [required],
  checkPassword: [required],
  planetCode: [required]
}

const schema = reactive<FormSchema[]>([
  {
    field: 'title',
    colProps: {
      span: 24
    }
  },
  {
    field: 'userAccount',
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
    field: 'userPassword',
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
      placeholder: '确认密码'
    }
  },
  {
    field: 'planetCode',
    label: '编号',
    value: '',
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: '输一个好的编号吧'
    }
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



const { register, elFormRef, methods } = useForm()

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
      const { getFormData } = methods
      const formData = await getFormData<UserLoginRequest>()

      const res = await userRegisterUsingPOST(formData)
        .catch(() => {})
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
  formType: { type: Number, required: true }
})
const emit = defineEmits(['update:formType'])
const changeType=() => {
  emit('update:formType', 0)
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
    label-position="left"
    size="large"
    @register="register"
  >
    <template #title>
      <h2 class="text-2xl font-bold text-center w-[100%]">注册</h2>
    </template>

    <template #tool>
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
:deep(.anticon) {
  &:hover {
    color: var(--el-color-primary) !important;
  }
}
</style>
