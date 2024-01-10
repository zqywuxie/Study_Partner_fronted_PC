<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { getCardTableListApi } from '@/api/table'
import { ref } from 'vue'
import { ElLink, ElDivider } from 'element-plus'
import { onMounted, ref, watch } from 'vue'
import {
  matchUsersUsingGet,
  recommendUsingGet,
  searchByTextUsingGet
} from '../../servers/api/userController'

import { useAppStoreWithOut } from '../../store/modules/app'
import { useCache } from '../../hooks/web/useCache'
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { searchUserUsingPOST } from '@/api/langbei/SearchController'
// import {searchUserUsingPOST} from "../../api/langbei/SearchController";

const router = useRouter()
const userList = ref([])
const pageNum = ref(1)
const pageSize = ref(12)
const total = ref()
const ModeType = ref('default')
const appStore = useAppStoreWithOut()
const { wsCache } = useCache()
const currentUser = ref()
const searchText = ref('')

//获取当前用户
currentUser.value = wsCache.get(appStore.getUserInfo)

onMounted(async () => {
  await getRecommendUsers()
})

//获取推荐用户
async function getRecommendUsers() {
  const res = await recommendUsingGet({
    currentPage: pageNum.value,
    pageSize: pageSize.value
  })
  console.log(res)
  userList.value = res.data.records
  console.log(userList.value)
  total.value = res.data.total
  const userListData = res.data.records
  if (userListData) {
    userListData.forEach((user) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = userListData
  }
}
interface Params {
  pageIndex?: number
  pageSize?: number
}

const { t } = useI18n()

const loading = ref(true)

let tableDataList = ref<any[]>([])

const getTableList = async (params?: Params) => {
  const res = await getCardTableListApi(
      params || {
        pageIndex: 1,
        pageSize: 10
      }
  )
      .catch(() => {})
      .finally(() => {
        loading.value = false
      })
  if (res) {
    tableDataList.value = res.data.list
  }
}

getTableList()

const actionClick = (row?: any) => {
  console.log(row)
}
</script>

<template>
  <ContentWrap :title="t('tableDemo.cardTable')">
    <Table
        :columns="[]"
        :data="userList"
        :loading="loading"
        custom-content
        :card-wrap-style="{
        width: '200px',
        marginBottom: '20px',
        marginRight: '20px'
      }"
    >
      <template #content="row">
        <div class="flex cursor-pointer">
          <div class="pr-16px">
            <img :src="row.avatarUrl" class="w-48px h-48px rounded-[50%]" alt="" />
          </div>
          <div>
            <div class="mb-12px font-700 font-size-16px">{{ row.username }}</div>
            <div class="line-clamp-3 font-size-12px">{{ row.profile }}</div>
          </div>
        </div>
      </template>
      <template #content-footer="item">
        <div class="flex justify-center items-center">
          <div class="flex-1 text-center" @click="() => actionClick(item)">
            <ElLink :underline="false">操作一</ElLink>
          </div>
          <ElDivider direction="vertical" />
          <div class="flex-1 text-center" @click="() => actionClick(item)">
            <ElLink :underline="false">操作二</ElLink>
          </div>
        </div>
      </template>
    </Table>
  </ContentWrap>
</template>
