<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-card class="box-card" style="width: 200px">
          <template #header>
            <div class="user-card-header">
              <span>在线列表</span>
            </div>
          </template>
          <el-empty v-if="!loginUserList || loginUserList.length === 1" description="还没有人在线喔~" />
          <div v-for="item in loginUserList" style="margin-bottom: 8px">
            <el-popover
                :width="200"
                placement="top-start"
                trigger="hover"
            >
              <template #reference>
                <div v-if="item.id !== currentUser.id" style="display: flex; align-items: center;">
                  <template v-if="item.isNew">
                    <el-badge class="item" is-dot>
                      <el-avatar :size="50" :src="item.avatarUrl" @click="checkToUser(item)"/>
                    </el-badge>
                  </template>
                  <template v-else>
                    <el-avatar :size="50" :src="item.avatarUrl" @click="checkToUser(item)"/>
                  </template>
                  <span style="margin-left: 5px">{{ item.username }}</span>
                </div>
              </template>
              <div style="line-height: 20px">
                <div style="font-size: 16px">{{ item.username }}</div>
                <div style="font-size: 12px;">{{ item.profile }}</div>
              </div>
            </el-popover>
          </div>
        </el-card>

      </el-aside>

      <el-main style="padding: 0">
        <div v-if="!toUser">
          <el-empty :image-size="200" description="快去选择一名好友聊天吧！"/>
        </div>

        <div v-else style="width: 90%; margin: 0 auto">
          <div class="imHeader">
            <el-card class="box-card">

              <div slot="header" class="im-card-header">
                <div style="display: flex; align-items: center;">
                  <el-avatar :size="50" :src="toUser.avatarUrl"/>
                  <span style="margin-left: 5px">{{ toUser.username }}</span>
                </div>
                <el-button type="info" @click="getHistoryMessage">获取历史消息</el-button>
              </div>
            </el-card>
          </div>
          <div ref="divRef"
               style="background-color: white; padding: 20px; border: 1px solid #ccc; border-radius: 10px; height: 380px; overflow-y: scroll;">
            <div v-for="item in messages" :key="item.id">
              <div v-if="currentUser.id !== item.uid && item.uid === toUser.id" style="display: flex; margin: 20px 0;">
                <el-popover
                    :width="100"
                    placement="top-start"
                    trigger="click"
                >
                  <template #reference>
                    <img :src="toUser.avatarUrl" alt=""
                         style="width: 30px; height: 30px; border-radius: 50%; margin-right: 10px">
                  </template>
                  <div style="line-height: 20px">
                    <div style="font-size: 16px">{{ toUser.username }}</div>
                    <div style="font-size: 12px;">{{ toUser.profile }}</div>
                  </div>
                </el-popover>
                <!--          <div style="width: 50px; line-height: 30px; margin-left: 5px; color: #888; overflow: hidden; font-size: 14px">{{ item.username }}</div>-->
                <div
                    v-if="item.uid === toUser.id"
                    style="line-height: 30px; background-color: aliceblue; padding: 0 10px; width:fit-content; border-radius: 10px">
                  {{ item.text }}
                </div>
              </div>

              <div v-else-if="currentUser.id === item.uid && item.toId === toUser.id "
                   style="display: flex; justify-content: flex-end; margin: 20px 0;">
                <div
                    style="line-height: 30px; background-color: lightyellow; padding: 0 10px; width:fit-content; border-radius: 10px;">
                  {{ item.text }}
                </div>
                <el-popover
                    :width="100"
                    placement="top-start"
                    trigger="hover"
                >
                  <template #reference>
                    <img :src="currentUser.avatarUrl" alt=""
                         style="width: 30px; height: 30px; border-radius: 50%; margin-left: 10px">
                  </template>
                  <div style="line-height: 20px">
                    <div style="font-size: 16px">{{ currentUser.username }}</div>
                    <div style="font-size: 12px;">{{ currentUser.profile }}</div>
                  </div>
                </el-popover>
              </div>
            </div>
          </div>

          <div style="margin: 10px 0; width: 100%">
            <V3Emoji v-model="text" :keep="true" :options-name="optionsName" :recent="true" :textArea="true"
                     default-select="recent" size="mid"/>
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
import {nextTick, onMounted, ref} from "vue";
import V3Emoji from 'vue3-emoji'
import 'vue3-emoji/dist/style.css'
import {useAppStoreWithOut} from "../../store/modules/app";
import {useCache} from "../../hooks/web/useCache";
import {findAllInitUsingGET} from "../../api/langbei/imController";
import {getUserListByIdsUsingPOST} from "@/api/langbei/userController";
import {ElMessage} from "element-plus";

//定义消息的类型
interface ImMessage {
  uid;
  toId;
  text;
  username;
  avatarUrl;
  profile;
}

interface ImMessageRequest {
  type;
  im;
}


const messages = ref<API.Im[]>([])
const appStore = useAppStoreWithOut()
const {wsCache} = useCache()
const text = ref('')  // 聊天输入的内容
const toUser = ref<API.User>()  // 聊天对象
const divRef = ref()   // 聊天框的引用
const currentUser = ref();
const limitMessage = ref(10);
const loginUserIdList = ref();
const loginUserList = ref();

// 页面滚动到最新位置的函数
const scrollBottom = () => {
  nextTick(() => {   // 等到页面元素出来之后再去滚动
    divRef.value.scrollTop = divRef.value.scrollHeight
  })
}


// 页面加载完成触发此函数
onMounted(() => {
  // request.get("/im/init/10").then(res => {
  //   messages.value = res.data
  // })
  scrollBottom()
})

const checkToUser = (checkUser) => {
  // console.log(checkUser)
  toUser.value = checkUser;
  // console.log(toUser.value)
  let index = loginUserList.value.indexOf(checkUser);
  loginUserList.value[index].isNew = false;
  console.log(loginUserList.value[index])
}

//获取历史消息
const getHistoryMessage = () => {
  findAllInitUsingGET({
    limit: limitMessage.value
  }).then(res => {
    // console.log(res.data)
    messages.value = res.data
    limitMessage.value += 10;
  });

}

// 建立 websocket 连接
currentUser.value = wsCache.get(appStore.getUserInfo)
// const client = new WebSocket(`ws://localhost:8088/ws?id=${currentUser.value.id}`)
const client = new WebSocket(`ws://localhost:8081/api/im`)

// 发送消息触发滚动条滚动
const send = () => {
  if(text.value.length > 40){
    ElMessage.error('消息长度不能大于40个字符喔');
    return;
  }
  // console.log(toUser?.value?.id)
  if (client) {
    if (text.value !== '') {
      let message: ImMessage = {
        uid: currentUser.value.id,
        toId: toUser?.value?.id,
        text: text.value
      }
      client.send(JSON.stringify(message))
    }
  }
  text.value = ''  // 清空文本框
}

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
  console.log('open')
}
client.onclose = () => {  // 页面刷新的时候和后台websocket服务关闭的时候
  ElMessage.error('服务器断开，请刷新重试');
  console.log('close')
}

// 当收到消息
client.onmessage = (msg) => {
  console.log(msg)
  if (msg.data) {
    // console.log(msg.data)
    let json = JSON.parse(msg.data)
    const messageType = json.type;
    if (messageType === 10003) {
      addUserLoginList(json)
      return;
    }
    // console.log(json)
    if (json.uid && json.text) {  // 聊天消息
      messages.value.push(json)
      console.log(json)
      console.log(messages)
      loginUserList.value.forEach(user => {
        if (user.id === json.uid) {
          user.isNew = true;
        }
      })
      scrollBottom()  // 滚动页面到最底部
    }
  }
}

async function addUserLoginList(messageJson: ImMessageRequest) {
  loginUserIdList.value = JSON.parse(messageJson.im.text);
  // console.log(loginUserIdList.value)
  // console.log(loginUserList.value.length)
  const res = await getUserListByIdsUsingPOST({
    ids: loginUserIdList.value
  });
  console.log(res.data)
  loginUserList.value = res.data
}

</script>

<style>
.im-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.imHeader {
  margin-bottom: 5px;
}
</style>
