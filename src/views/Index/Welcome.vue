<script setup lang="ts">
import {ref} from "vue";
import {useCache} from "@/hooks/web/useCache";
import {useAppStoreWithOut} from "@/store/modules/app";
import {CalendarDateType, CalendarInstance} from "element-plus";
import {Star} from "@element-plus/icons-vue";

const currentUser = ref<API.UserVO>()
const {wsCache} = useCache()
const appStore = useAppStoreWithOut()
currentUser.value = wsCache.get(appStore.getUserInfo)
const loading = ref(false)
const useTimeAgo = (time: Date | number | string) => {
  // const localeStore = useLocaleStoreWithOut()
  //
  // const currentLocale = computed(() => localeStore.getCurrentLocale)
  //
  // const timeAgo = useTimeAgoCore(time, {
  //   messages: TIME_AGO_MESSAGE_MAP[unref(currentLocale).lang]
  // })

  return 123
}

const projects = [{}, {}]

const dynamics = [{}, {}]
const popView = ref(false)
const calendar = ref<CalendarInstance>()
const selectDate = (val: CalendarDateType) => {
  if (!calendar.value) return
  calendar.value.selectDate(val)
}
</script>

<template>
  <div>
    <ElCard shadow="never">
      <ElSkeleton :loading="loading" animated>
        <ElRow :gutter="20" justify="space-between">
          <ElCol :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <div class="flex items-center">
              <img
                  :src="currentUser.avatarUrl"
                  alt=""
                  class="w-70px h-70px rounded-[50%] mr-20px"
              />
              <div>
                <div class="text-20px">
                  {{ currentUser.username }}
                </div>
                <div class="mt-10px text-14px text-gray-500">
                  欢迎你，今天天气很不错
                </div>
              </div>
            </div>
          </ElCol>
          <ElCol :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <div class="flex h-70px items-center justify-end lt-sm:mt-20px">
              <div class="px-8px text-right">
                <div class="text-14px text-gray-400 mb-20px">点赞数</div>
                <CountTo
                    class="text-20px"
                    :start-val="0"
                    :end-val="12313"
                    :duration="2600"
                />
              </div>
              <ElDivider direction="vertical"/>
              <div class="px-8px text-right">
                <div class="text-14px text-gray-400 mb-20px">评论数</div>
                <CountTo
                    class="text-20px"
                    :start-val="0"
                    :end-val="3123"
                    :duration="2600"
                />
              </div>
              <ElDivider direction="vertical" border-style="dashed"/>
              <div class="px-8px text-right">
                <div class="text-14px text-gray-400 mb-20px">好友申请</div>
                <CountTo
                    class="text-20px"
                    :start-val="0"
                    :end-val="123123"
                    :duration="2600"
                />
              </div>
            </div>
          </ElCol>
        </ElRow>
      </ElSkeleton>
    </ElCard>
  </div>

  <ElRow class="mt-20px" :gutter="20" justify="space-between">
    <ElCol :xl="16" :lg="16" :md="24" :sm="24" :xs="24" class="mb-20px">
      <ElCard shadow="never">
        <template #header>
          <div class="flex justify-between">
            <span>你的任务</span>
            <ElLink type="primary" :underline="false">更多</ElLink>
          </div>
        </template>
        <ElSkeleton :loading="loading" animated>
          <ElRow>
            <!--            任务-->
            <ElCol
                v-for="(item, index) in projects"
                :key="`card-${index}`"
                :xl="8"
                :lg="8"
                :md="12"
                :sm="24"
                :xs="24"
            >
              <ElCard shadow="hover">
                <div class="flex items-center">
                  <!--                  <Icon :icon="item.icon" :size="25" class="mr-10px"/>-->
                  <span class="text-16px">OK</span>
                </div>
                <div class="mt-15px text-14px text-gray-400">okaaa</div>
                <div class="mt-20px text-12px text-gray-400 flex justify-between">
                  <span>zqy</span>
                  <span>timeisnow</span>
                </div>
              </ElCard>
            </ElCol>
          </ElRow>
        </ElSkeleton>
      </ElCard>

      <ElCard shadow="never" class="mt-20px">
        <template #header>
          <div class="flex justify-between">
            <span>动态</span>
            <ElLink type="primary" :underline="false">更多</ElLink>
          </div>
        </template>

        <!--        动态-->
        <ElSkeleton :loading="loading" animated>
          <div v-for="(item, index) in dynamics" :key="`dynamics-${index}`">
            <div class="flex items-center">
              <img
                  src="@/assets/imgs/avatar.jpg"
                  alt=""
                  class="w-35px h-35px rounded-[50%] mr-20px"
              />
              <div>
                <div class="text-14px">
                  <Highlight>
                    推送
                  </Highlight>
                </div>
                <div class="mt-15px text-12px text-gray-400">
                  hahah
                </div>
              </div>
            </div>
            <ElDivider/>
          </div>
        </ElSkeleton>
      </ElCard>
    </ElCol>
    <ElCol :xl="8" :lg="8" :md="24" :sm="24" :xs="24" class="mb-20px">
      <ElCard shadow="never">
        <el-calendar ref="calendar">
          <template #header="{ date }">
            <el-button-group class="button-group">
              <el-button size="small" @click="selectDate('prev-month')">
                Previous Month
              </el-button>
              <el-button size="small" @click="selectDate('today')">Today</el-button>
              <el-button size="small" @click="selectDate('next-month')">
                Next Month
              </el-button>
              <el-button type="primary" :icon="Star" class="sign-in-button">签到</el-button>
            </el-button-group>
          </template>
          <template #dateCell="{ data }">
            <!--            todo 如果选中 就显示当天的内容-->
            <p :class="data.isSelected ? 'is-selected' : ''">
              {{ data.day.split('-').slice(1).join('-') }}
              {{ data.isSelected ? '✔️' : '' }}
            </p>
          </template>
        </el-calendar>
      </ElCard>
    </ElCol>
  </ElRow>


  <el-popover
      placement="bottom"
      title="Title"
      :width="200"
      trigger="click"
      content="this is content, this is content, this is content"
      v-if="popView"
  >
    <template #reference>
      <el-button class="m-2">Click to activate</el-button>
    </template>
  </el-popover>
</template>

<style scoped lang="less">
.is-selected {
  color: #1989fa;
}


.sign-in-button {
  margin-left: auto; /* 这会使按钮靠右对齐 */
  text-align: right;
}
</style>