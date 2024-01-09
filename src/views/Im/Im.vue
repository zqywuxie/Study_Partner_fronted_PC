<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <!--  系统在线用户列表 -->
        <el-card class="box-card" style="width: 200px">
          <template #header>
            <!-- todo 添加好友列表-->
            <div class="user-card-header">
              <span>在线列表</span>
            </div>
          </template>
          <el-empty v-if="!onlineUsers || onlineUsers.length <= 1" description="还没有人在线喔~" />
          <div v-for="item in onlineUsers" style="margin-bottom: 8px">
            <el-popover :width="200" placement="top-start" trigger="hover">
              <template #reference>
                <div v-if="item.id !== currentUser.id" style="display: flex; align-items: center">
                  <el-badge class="item">
                    <el-avatar :size="50" :src="item.avatarUrl" @click="checkToChat(item)" />
                  </el-badge>
                  <span style="margin-left: 5px">{{ item.username }}</span>
                </div>
              </template>
              <div style="line-height: 20px">
                <div style="font-size: 16px">{{ item.username }}</div>
                <div style="font-size: 12px">{{ item.useraccount }}</div>
              </div>
            </el-popover>
          </div>
        </el-card>
        <el-divider />

        <!--    队伍列表-->
        <el-card class="box-card" style="width: 200px">
          <template #header>
            <!-- todo 添加好友列表-->
            <div class="user-card-header">
              <span>群聊列表</span>
            </div>
          </template>
          <el-empty v-if="!teamList || teamList < 1" description="你还未加入任何队伍~" />
          <div v-for="item in teamList" style="margin-bottom: 8px">
            <el-popover :width="200" placement="top-start" trigger="hover">
              <template #reference>
                <div style="display: flex; align-items: center; margin-bottom: 20px">
                  <el-badge class="item">
                    <el-avatar :size="50" :src="item.avatarUrl" @click="checkToChat(item)" />
                  </el-badge>
                  <span style="margin-left: 5px">{{ item.name }}</span>
                  <el-tag class="ml-2" :type="item.status === 0 ? 'info' : 'danger'">
                    {{ item.status === 1 ? '加密' : '公开' }}
                  </el-tag>
                </div>
              </template>
              <div style="line-height: 20px">
                <div style="font-size: 12px">{{ item.description }}</div>
              </div>
            </el-popover>
          </div>
        </el-card>

        <el-divider />

        <!--好友列表-->
        <el-card class="box-card" style="width: 200px">
          <template #header>
            <!-- todo 添加好友列表-->
            <div class="user-card-header">
              <span>好友列表</span>
            </div>
          </template>
          <el-empty v-if="!friendList || friendList.length === 0" description="快去认识新朋友吧~" />
          <div v-for="item in friendList" style="margin-bottom: 8px">
            <el-popover :width="200" placement="top-start" trigger="hover">
              <template #reference>
                <div style="display: flex; align-items: center">
                  <!--badge-->
                  <el-badge class="item">
                    <el-avatar :size="50" :src="item.avatarUrl" @click="checkToChat(item)" />
                  </el-badge>
                  <span style="margin-left: 5px">{{ item.username }}</span>
                  <!--todo 后期可以更换状态 -->
                  <el-tag class="ml-2" :type="item.isOnline === true ? 'success' : 'info'">
                    {{ item.isOnline === true ? '在线' : '离线' }}
                  </el-tag>
                </div>
              </template>
              <div style="line-height: 20px">
                <div style="font-size: 12px">{{ item.profile }}</div>
              </div>
            </el-popover>
          </div>
        </el-card>
      </el-aside>

      <el-main style="padding: 0">
        <div v-if="!isChat">
          <el-empty :image-size="200" description="快去聊天吧！" />
        </div>

        <div v-else style="width: 90%; margin: 0 auto">
          <div class="imHeader">
            <el-card class="box-card">
              <div slot="header" class="im-card-header">
                <div style="display: flex; align-items: center">
                  <el-avatar :size="50" :src="toChat.avatarUrl" />
                  <span style="margin-left: 5px">{{ toChat.name }}</span>
                </div>
                <el-button type="info" @click="getHistoryMessage(toChat)">获取历史消息 </el-button>
                <!--   todo 清空聊天记录方法-->
                <el-button type="info" @click="getHistoryMessage(toChat)">清空聊天记录 </el-button>
                <el-button type="info" @click="closeChat">关闭聊天</el-button>
              </div>
            </el-card>
          </div>

          <!--   todo 设置陌生人聊天不超过x条信息-->
          <div
            ref="divRef"
            style="
              background-color: rgba(0, 0, 0, 0.14);
              padding: 20px;
              border: 1px solid #ccc;
              border-radius: 10px;
              height: 380px;
              overflow-y: scroll;
            "
          >
            <div v-for="item in messages" :key="item.id">
              <!--对方的消息-->
              <div v-if="!item.isMy" style="display: flex; margin: 20px 0">
                <el-popover :width="100" placement="top-start" trigger="click">
                  <template #reference>
                    <img
                      :src="toChat.avatarUrl"
                      alt=""
                      style="width: 30px; height: 30px; border-radius: 50%; margin-right: 10px"
                    />
                  </template>
                  <div style="line-height: 20px">
                    <div style="font-size: 16px">{{ toChat.name }}</div>
                    <!--                    <div style="font-size: 12px;">{{ toChat.useraccount }}</div>-->
                  </div>
                </el-popover>
                <!--          <div style="width: 50px; line-height: 30px; margin-left: 5px; color: #888; overflow: hidden; font-size: 14px">{{ item.username }}</div>-->
                <div
                  style="
                    line-height: 30px;
                    background-color: blue;
                    color: black;
                    padding: 0 10px;
                    width: fit-content;
                    border-radius: 10px;
                  "
                >
                  {{ item.text }}
                </div>
              </div>

              <!-- 自己发送的消息-->
              <div v-else style="display: flex; justify-content: flex-end; margin: 20px 0">
                <div
                  style="
                    line-height: 30px;
                    background-color: blue;
                    color: black;
                    padding: 0 10px;
                    width: fit-content;
                    border-radius: 10px;
                  "
                >
                  {{ item.text }}
                </div>
                <el-popover :width="100" placement="top-start" trigger="hover">
                  <template #reference>
                    <img
                      :src="currentUser.avatarUrl"
                      alt=""
                      style="width: 30px; height: 30px; border-radius: 50%; margin-left: 10px"
                    />
                  </template>
                  <div style="line-height: 20px">
                    <div style="font-size: 16px">{{ currentUser.username }}</div>
                    <div style="font-size: 12px">{{ currentUser.useraccount }}</div>
                  </div>
                </el-popover>
              </div>
            </div>
          </div>

          <div style="margin: 10px 0; width: 100%">
            <V3Emoji
              v-model="text"
              :keep="true"
              :options-name="optionsName"
              :recent="true"
              :textArea="true"
              default-select="recent"
              size="mid"
            />
            <div style="text-align: right">
              <el-button type="primary" @click="send">发送</el-button>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue'
import V3Emoji from 'vue3-emoji'
import 'vue3-emoji/dist/style.css'
import { useAppStoreWithOut } from '../../store/modules/app'
import { useCache } from '../../hooks/web/useCache'
import { findAllInitUsingGET } from '../../api/langbei/imController'

import { getPrivateChatUsingPost, getTeamChatUsingPost } from '../../servers/api/chatController'
import { getUserListByIdsUsingPOST } from '@/api/langbei/userController'
import { ElMessage } from 'element-plus'
import ChatMessageVO = API.ChatMessageVO
import { getMyTeamsUsingGet } from '@/servers/api/teamController'
import { getMyFriendListUsingGet } from '@/servers/api/friendController'
import { number } from 'vue-types'

//定义消息的类型
interface ImMessageRequest {
  type
  im
}

const messages = ref<API.ChatMessageVO[]>([])
const appStore = useAppStoreWithOut()
const { wsCache } = useCache()
const text = ref('') // 聊天输入的内容
const toChat = ref({
  avatarUrl: '',
  name: '',
  user: {
    id: 0
  },
  users: [],
  chatUser: {
    id: 0
  },
  chatEnum: {
    // 私聊
    PRIVATE_CHAT: 1,
    // 队伍聊天
    TEAM_CHAT: 2,
    // 大厅
    HALL_CHAT: 3
  },
  chatType: -1,
  team: {
    teamId: 0
  },
  text: '',
  messages: []
}) // 聊天对象
const divRef = ref() // 聊天框的引用
const currentUser = ref()
const limitMessage = ref(10)
const loginUserIdList = ref()
const loginUserList = ref()

const onlineUsers = ref([])
const teamList = ref([])
const friendList = ref([])

let currentSocket: WebSocket
// 页面滚动到最新位置的函数
const scrollBottom = () => {
  nextTick(() => {
    // 等到页面元素出来之后再去滚动
    divRef.value.scrollTop = divRef.value.scrollHeight
  })
}

const isChat = ref(false)
const closeChat = () => {
  isChat.value = false
}
// 页面加载完成触发此函数
onMounted(() => {
  // request.get("/im/init/10").then(res => {
  //   messages.value = res.data
  // })
  init()
  scrollBottom()
})
const send = () => {
  if (!toChat) {
    ElMessage({
      message: '聊天对象不能为空',
      type: 'warning'
    })
    return
  }
  if (!text.value.trim()) {
    ElMessage({ message: '请输入内容', duration: 1000 })
    return
  } else {
    if (typeof WebSocket == 'undefined') {
      ElMessage({
        message: '您的浏览器不支持WebSocket',
        type: 'warning'
      })
    } else {
      let message = {
        fromId: currentUser.value.id,
        toId: toChat.value.chatUser.id,
        teamId: toChat.value.team.teamId,
        text: text.value,
        chatType: toChat.value.chatType
      }

      console.log('sendMsg=')
      console.log(message)
      //todo 发送消息,问题消息fromId也变成了toId
      // currentSocket.send(JSON.stringify(message));
      // const newMessage = {text: text.value, isMy: true} as API.ChatMessageVO; // 假设content是消息内容
      // messages.value.push(newMessage);

      text.value = ''
    }
  }
}

// 心跳机制
const heartbeatInterval = 30 * 1000 // 30秒
let heartbeatTimer = null

const startHeartbeat = (socket) => {
  heartbeatTimer = setInterval(() => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send('PING')
    }
  }, heartbeatInterval)
}
const stopHeartbeat = () => {
  clearInterval(heartbeatTimer)
  heartbeatTimer = null
}
//  todo 编写心跳机制，设置关闭连接的超时时长
const checkToChat = (chatItem) => {
  // {
  //   name: "",
  //       user: {
  //   id: 0,
  // },
  //   users: [],
  //       chatUser: {
  //   id: 0,
  // },
  //   chatEnum: {
  //     // 私聊
  //     PRIVATE_CHAT: 1,
  //         // 队伍聊天
  //         TEAM_CHAT: 2,
  //         // 大厅
  //         HALL_CHAT: 3
  //   },
  //   chatType: -1,
  //       team: {
  //   teamId: 0,
  // },
  //   text: "",
  //       messages: [],
  // }
  isChat.value = true
  let uid = currentUser.value.id
  // 队伍聊天
  if (chatItem.hasJoin) {
    console.log('chatItem')
    toChat.value.name = chatItem.name
    toChat.value.chatType = toChat.value.chatEnum.TEAM_CHAT
    toChat.value.team.teamId = chatItem.id
    toChat.value.avatarUrl = chatItem.avatarUrl
    //   私聊
  } else {
    console.log('userChat')
    toChat.value.chatUser.id = chatItem.id
    toChat.value.name = chatItem.username
    toChat.value.chatType = toChat.value.chatEnum.PRIVATE_CHAT
    toChat.value.avatarUrl = chatItem.avatarUrl
  }
  let socketUrl = `ws://localhost:8081/api/websocket/${currentUser.value.id}/${toChat.value.team.teamId}`
  console.log(socketUrl)
  const client = new WebSocket(socketUrl)
  //   currentSocket = client
  //   client.onopen = () => {
  //     // console.log('open')
  //     ElMessage({
  //       message: `"${toChat.value.name}"聊天连接已建立，开始聊天吧`,
  //       type: 'success',
  //       duration: 1000
  //     })
  //     startHeartbeat(client);
  //   }
  //   client.onclose = () => {  // 页面刷新的时候和后台websocket服务关闭的时候
  //     ElMessage.error({
  //       message: '服务器断开，请刷新重试',
  //       duration: 1000
  //     });
  //     stopHeartbeat()
  //     console.log('close')
  //   }
  // //
  // // // 当收到消息
  //   client.onmessage = (msg) => {
  //     if (msg.data === "pong") {
  //       return;
  //     }
  //     if (msg.data) {
  //       let json = JSON.parse(msg.data)
  //       //  判断是什么信息
  //       if (json['users']) {
  //         onlineUsers.value = json['users']
  //       } else {
  //         // 实时数据
  //         const newMsg = {
  //           text: json['text'],
  //           isMy: false
  //         } as ChatMessageVO
  //         // console.log(newMsg)
  //         messages.value.push(newMsg)
  //       }
  //     }
  //   }
}

//获取历史消息
const getHistoryMessage = (toChat) => {
  if (toChat.chatType === toChat.chatEnum.PRIVATE_CHAT) {
    getPrivateChatUsingPost({
      toId: toChat.chatUser.id
    }).then((res) => {
      console.log(res)
      // console.log(res.data)
      messages.value = res.data
      // limitMessage.value += 10;
    })
  } else if (toChat.chatType === toChat.chatEnum.TEAM_CHAT) {
    getTeamChatUsingPost({
      teamId: toChat.team.teamId
    }).then((res) => {
      console.log(res)
    })
  }
}

const init = async () => {
  // 建立 websocket 连接
  currentUser.value = wsCache.get(appStore.getUserInfo)
  // const client = new WebSocket(`ws://localhost:8088/ws?id=${currentUser.value.id}`)
  // console.log("登录用户信息"+currentUser.value.id)
  let socketUrl = `ws://localhost:8081/api/websocket/${currentUser.value.id}/${NaN}`
  const client = new WebSocket(socketUrl)
  // 发送消息触发滚动条滚动
  const optionsName = {
    'Smileys & Emotion': '笑脸&表情',
    'Food & Drink': '食物&饮料',
    'Animals & Nature': '动物&自然',
    'Travel & Places': '旅行&地点',
    'People & Body': '人物&身体',
    Objects: '物品',
    Symbols: '符号',
    Flags: '旗帜',
    Activities: '活动'
  }
  client.onopen = () => {
    // console.log('open')
    ElMessage({
      message: 'socket连接成功',
      type: 'success',
      duration: 1000
    })
  }
  client.onclose = () => {
    // 页面刷新的时候和后台websocket服务关闭的时候
    ElMessage.error({
      message: '服务器断开，请刷新重试',
      duration: 1000
    })
    console.log('close')
  }
  // 当收到消息
  client.onmessage = (msg) => {
    if (msg.data) {
      // console.log(msg.data)
      let json = ''
      if (msg.data != 'pong') {
        json = JSON.parse(msg.data)
      }
      //  判断是什么信息
      if (json['users']) {
        onlineUsers.value = json['users']
      } else {
        const newMsg = {
          text: msg.data.text,
          isMy: false
        } as ChatMessageVO
        messages.value.push(newMsg)
      }
    }
  }

  await getMyTeams()
  await getMyFriends()
}

const updateOnlineStatus = async () => {
  friendList.value.forEach((friend) => {
    friend.isOnline = onlineUsers.value.some((onlineUser) => onlineUser.id === friend.id)
    // console.log("是否上线")
    // console.log(friend.isOnline)
  })
}

const getMyTeams = async () => {
  getMyTeamsUsingGet()
    .then((res) => {
      console.log('获得我的队伍')
      teamList.value = res.data
      // console.log(res.data)
    })
    .catch((error) => {
      ElMessage.error(error)
    })
}
const getMyFriends = async () => {
  getMyFriendListUsingGet()
    .then((res) => {
      friendList.value = res.data
      // console.log(res.data)
    })
    .catch((error) => {
      ElMessage.error(error)
    })
    .finally(() => {
      updateOnlineStatus()
    })
}

async function addUserLoginList(messageJson: ImMessageRequest) {
  loginUserIdList.value = JSON.parse(messageJson.im.text)
  // console.log(loginUserIdList.value)
  // console.log(loginUserList.value.length)
  const res = await getUserListByIdsUsingPOST({
    ids: loginUserIdList.value
  })
  console.log(res.data)
  loginUserList.value = res.data
}
</script>

<style>
.im-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.imHeader {
  margin-bottom: 5px;
}
</style>
