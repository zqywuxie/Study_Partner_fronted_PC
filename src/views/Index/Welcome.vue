<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useCache} from "@/hooks/web/useCache";
import {useAppStoreWithOut} from "@/store/modules/app";
import {CalendarDateType, CalendarInstance} from "element-plus";
import {InfoFilled, Star} from "@element-plus/icons-vue";
import {listMessageUsingGet} from "@/servers/api/messageController";
import {getMessageType, MessageTypeEnum} from "../../../types/enum";
import Highlight from "@/components/Highlight/src/Highlight.vue";
import MessageVO = API.MessageVO;
import highlightKeys from "../../../types/highlightKeys";
import router from "@/router";
import {getLikeCountUsingGet} from "@/servers/api/likeController";
import {CountTo} from "@/components/CountTo";

const currentUser = ref<API.UserVO>()
const {wsCache} = useCache()
const appStore = useAppStoreWithOut()
currentUser.value = wsCache.get(appStore.getUserInfo)
const messageList = ref<MessageVO[]>([])
const loading = ref(false)
const isLike = ref(false)
const likeCount = ref(0)

const checkInToday = () => {
  isLike.value = true
}

// 跳转用户信息
const toUserInfo = (id) => {
  setTimeout(() => {
    router.push({
      path: '/user/info',
      query: {id: id}
    })
  }, 200)

}

// 时间转换
const useTimeAgo = (time: Date | number | string) => {
  const time1 = new Date(time);
  const now = new Date();

  const diff = now - time1;
  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
  const days = Math.floor(diff / 1000 / 60 / 60 / 24);

  let timeAgo;

  if (days > 0) {
    timeAgo = days + "天前";
  } else if (hours > 0) {
    timeAgo = hours + "小时前";
  } else if (minutes > 0) {
    timeAgo = minutes + "分钟前";
  } else if (seconds > 0) {
    timeAgo = seconds + "秒前";
  } else {
    timeAgo = "刚刚";
  }

  return timeAgo;
}

const projects = [{}, {}]
const popView = ref(false)
const calendar = ref<CalendarInstance>()
const selectDate = (val: CalendarDateType) => {
  if (!calendar.value) return
  calendar.value.selectDate(val)
}

const init = async () => {
  messageList.value = await listMessageUsingGet({}).then((resp) => {
    return resp.data
  })
  likeCount.value = await getLikeCountUsingGet({}).then((resp) => {
    return resp.data
  })
}

onMounted(() => {
  init()
})

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
                    :end-val="likeCount"
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
            <span>消息</span>
            <ElLink type="primary" :underline="false">更多</ElLink>
            <el-popconfirm
                width="220"
                confirm-button-text="确定清空"
                cancel-button-text="让我想想"
                :icon="InfoFilled"
                icon-color="#626AEF"
                title="你确定清空所有信息吗"
            >
              <template #reference>
                <ElLink type="primary" :underline="false" class="ml-10px">清空信息</ElLink>
              </template>
            </el-popconfirm>

          </div>
        </template>

        <!--消息展示-->
        <ElSkeleton :loading="loading" animated>
          <div v-for="message in messageList">
            <div class="flex items-center">
              <img
                  @click="toUserInfo(message.fromUser?.id)"
                  :src="message.fromUser?.avatarUrl"
                  alt=""
                  class="w-35px h-35px rounded-[50%] mr-20px"
              />
              <div>
                <div class="text-14px">
                  <span>{{ message.fromUser.username }}</span>
                  <span>&nbsp;</span>
                  <Highlight :keys="[highlightKeys.keys1,highlightKeys.keys2,highlightKeys.keys3,highlightKeys.keys4]">
                    {{ getMessageType(message.type) }}
                  </Highlight>
                  <span>&nbsp;</span>
                  <div class="ellipsis" v-if="message.type === MessageTypeEnum.BLOG_COMMENT_LIKE">
                    "{{ message.comment?.content }}"
                  </div>
                  <div class="ellipsis"
                       v-if="message.type === MessageTypeEnum.BLOG_LIKE || message.type === MessageTypeEnum.COMMENT_ADD">
                    "{{ message.blog?.title }}"
                  </div>
                </div>
                <div class="mt-15px text-12px text-gray-400">
                  "{{ useTimeAgo(message.createTime) }}"
                </div>
              </div>
              <div class="ml-auto">
                <el-button text :type="message.isRead ? 'success':'primary'" @click="markAsRead(message)">
                  {{ message.isRead ? '已读' : '未读' }}
                </el-button>
                <el-button text type="danger" @click="deleteMessage(message)">删除</el-button>
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
              <span v-if="isLike">
                <el-button type="primary" :icon="Star" class="sign-in-button" @click="checkInToday">签到</el-button>
              </span>
              <span v-else>
                <el-button type="danger" disabled :icon="Star" class="sign-in-button"
                           @click="checkInToday">已签</el-button>
              </span>
            </el-button-group>
          </template>
          <template #dateCell="{ data }">
            <!--todo 如果选中 就显示当天的内容-->
            <!--todo 签到日子-->
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
.ellipsis {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90px; /* 设置你想要的长度 */
}

.is-selected {
  color: #1989fa;
}


.sign-in-button {
  margin-left: auto; /* 这会使按钮靠右对齐 */
  text-align: right;
}
</style>