<template>
  <div>
    <div v-clickoutside="hideReplyBtn" @click="inputFocus" class="my-reply">
      <el-avatar class="header-img" :size="40" :src="currentUser?.avatarUrl"></el-avatar>
      <div class="reply-info">
        <div
          tabindex="0"
          contenteditable="true"
          id="replyInput"
          spellcheck="false"
          placeholder="输入评论..."
          class="reply-input"
          @focus="showReplyBtn"
          @input="onDivInput($event)"
        >
        </div>
      </div>
      <div class="reply-btn-box" v-show="btnShow">
        <el-button class="reply-btn" size="medium" @click="sendComment" type="primary"
          >发表评论</el-button
        >
      </div>
    </div>

    <div v-for="(item, i) in $props.commentList" :key="i" class="author-title reply-father">
      <el-avatar class="header-img" :size="40" :src="item.commentUser.avatarUrl"></el-avatar>
      <div class="author-info">
        <span class="author-name">{{ item.commentUser.username }}</span>
        <span class="author-time">
          {{ item.createTime }}
        </span>
      </div>
      <div class="icon-btn">
        <span @click="showReplyInput(i, item.name, item.id)">
          <el-icon><ChatLineSquare /></el-icon>
          {{ item.commentNum }}</span
        >
        <el-icon>
          <Star />
        </el-icon>
        {{ item.likedNum }}
      </div>
      <div class="talk-box">
        <p>
          <span class="reply">{{ item.comment }}</span>
        </p>
      </div>

      <!--      回复-->
      <div class="reply-box">
        <div v-for="(reply, j) in item.reply" :key="j" class="author-title">
          <el-avatar class="header-img" :size="40" :src="reply.fromHeadImg"></el-avatar>
          <div class="author-info">
            <span class="author-name">{{ reply.from }}</span>
            <span class="author-time">{{ reply.time }}</span>
          </div>
          <div class="icon-btn">
            <span @click="showReplyInput(i, reply.from, reply.id)"
              ><i class="iconfont el-icon-s-comment"></i>{{ reply.commentNum }}</span
            >
            <i class="iconfont el-icon-caret-top"></i>{{ reply.like }}
          </div>
          <div class="talk-box">
            <p>
              <span>回复 {{ reply.to }}:</span>
              <span class="reply">{{ reply.comment }}</span>
            </p>
          </div>
          <div class="reply-box"> </div>
        </div>
      </div>
      <div v-show="_inputShow(i)" class="my-reply my-comment-reply">
        <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
        <div class="reply-info">
          <div
            tabindex="0"
            contenteditable="true"
            spellcheck="false"
            placeholder="输入评论..."
            @input="onDivInput($event)"
            class="reply-input reply-comment-input"
          ></div>
        </div>
        <div class="reply-btn-box">
          <el-button class="reply-btn" size="medium" @click="sendCommentReply(i, j)" type="primary"
            >发表评论
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<!--https://blog.csdn.net/zLanaDelRey/article/details/100997792-->
<script>
import { ChatLineSquare, Search, Star } from '@element-plus/icons-vue'
import { currentUserUsingGet } from '@/servers/api/userController'

const clickoutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false
      }
      // 只有不是本身 才会响应事件
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e)
      }
    }

    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.vueClickOutside = documentHandler
    document.addEventListener('click', documentHandler)
  },
  // update() {
  // },
  // vue 弹出框 下面 响应
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.vueClickOutside)
    delete el.vueClickOutside
  }
}
export default {
  name: 'ArticleComment',
  components: { ChatLineSquare, Star, Search },
  props: {
    commentList: {
      type: [],
      required: true
    }
  },
  data() {
    return {
      currentUser: null,
      btnShow: false,
      index: '0',
      replyComment: '',
      myName: 'Lana Del Rey',
      myHeader: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
      myId: 19870621,
      to: '',
      toId: -1,
      comments: [
        {
          name: 'Lana Del Rey',
          id: 19870621,
          headImg: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
          comment: '我发布一张新专辑Norman Fucking Rockwell,大家快来听啊',
          time: '2019年9月16日 18:43',
          commentNum: 2,
          like: 15,
          inputShow: false,
          reply: [
            {
              from: 'Taylor Swift',
              fromId: 19891221,
              fromHeadImg: 'https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg',
              to: 'Lana Del Rey',
              toId: 19870621,
              comment: '我很喜欢你的新专辑！！',
              time: '2019年9月16日 18:43',
              commentNum: 1,
              like: 15,
              inputShow: false
            },
            {
              from: 'Ariana Grande',
              fromId: 1123,
              fromHeadImg: 'https://ae01.alicdn.com/kf/Hf6c0b4a7428b4edf866a9fbab75568e6U.jpg',
              to: 'Lana Del Rey',
              toId: 19870621,
              comment: '别忘记宣传我们的合作单曲啊',
              time: '2019年9月16日 18:43',
              commentNum: 0,
              like: 5,
              inputShow: false
            }
          ]
        },
        {
          name: 'Taylor Swift',
          id: 19891221,
          headImg: 'https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg',
          comment: '我发行了我的新专辑Lover',
          time: '2019年9月16日 18:43',
          commentNum: 1,
          like: 5,
          inputShow: false,
          reply: [
            {
              from: 'Lana Del Rey',
              fromId: 19870621,
              fromHeadImg: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
              to: 'Taylor Swift',
              toId: 19891221,
              comment: '新专辑和speak now 一样棒！',
              time: '2019年9月16日 18:43',
              commentNum: 25,
              like: 5,
              inputShow: false
            }
          ]
        },
        {
          name: 'Norman Fucking Rockwell',
          id: 20190830,
          headImg: 'https://ae01.alicdn.com/kf/Hdd856ae4c81545d2b51fa0c209f7aa28Z.jpg',
          comment: 'Plz buy Norman Fucking Rockwell on everywhere',
          time: '2019年9月16日 18:43',
          commentNum: 0,
          like: 5,
          inputShow: false,
          reply: []
        }
      ]
    }
  },
  directives: { clickoutside },

  methods: {
    async fetchData() {
      try {
        let data = await currentUserUsingGet().then((res) => {
          return res.data
        })
        return data
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    messageTitleClick(num) {
      // 点击了具体某条消息
      console.log('点击了消息', num)
    },
    inputFocus() {
      var replyInput = document.getElementById('replyInput')
      replyInput.style.padding = '8px 8px'
      replyInput.style.border = '2px solid blue'
      replyInput.focus()
    },
    showReplyBtn() {
      this.btnShow = true
    },
    hideReplyBtn() {
      let replyInput = document.getElementById('replyInput')
      this.btnShow = false
      replyInput.style.padding = '10px'
      replyInput.style.border = 'none'
    },
    showReplyInput(i, name, id) {
      // todo inputshow
      // this.comments[this.index].inputShow = false
      this.index = i
      // this.comments[i].inputShow = true
      this.to = name
      this.toId = id
    },
    _inputShow(i) {
      // return this.comments[i].inputShow
    },
    sendComment() {
      if (!this.replyComment) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: '评论不能为空'
        })
      } else {
        let a = {}
        let input = document.getElementById('replyInput')
        let timeNow = new Date().getTime()
        let time = this.dateStr(timeNow)
        a.name = this.myName
        a.comment = this.replyComment
        a.headImg = this.myHeader
        a.time = time
        a.commentNum = 0
        a.like = 0
        this.comments.push(a)
        this.replyComment = ''
        input.innerHTML = ''
      }
    },
    sendCommentReply(i, j) {
      if (!this.replyComment) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: '评论不能为空'
        })
      } else {
        let a = {}
        let timeNow = new Date().getTime()
        let time = this.dateStr(timeNow)
        a.from = this.myName
        a.to = this.to
        a.fromHeadImg = this.myHeader
        a.comment = this.replyComment
        a.time = time
        a.commentNum = 0
        a.like = 0
        this.comments[i].reply.push(a)
        this.replyComment = ''
        document.getElementsByClassName('reply-comment-input')[i].innerHTML = ''
      }
    },
    onDivInput: function (e) {
      this.replyComment = e.target.innerHTML
    },
    dateStr(date) {
      //获取js 时间戳
      var time = new Date().getTime()
      //去掉 js 时间戳后三位，与php 时间戳保持一致
      time = parseInt((time - date) / 1000)
      //存储转换值
      var s
      if (time < 60 * 10) {
        //十分钟内
        return '刚刚'
      } else if (time < 60 * 60 && time >= 60 * 10) {
        //超过十分钟少于1小时
        s = Math.floor(time / 60)
        return s + '分钟前'
      } else if (time < 60 * 60 * 24 && time >= 60 * 60) {
        //超过1小时少于24小时
        s = Math.floor(time / 60 / 60)
        return s + '小时前'
      } else if (time < 60 * 60 * 24 * 30 && time >= 60 * 60 * 24) {
        //超过1天少于30天内
        s = Math.floor(time / 60 / 60 / 24)
        return s + '天前'
      } else {
        //超过30天ddd
        // var date = new Date(parseInt(date));
        date = new Date(parseInt(date))
        return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
      }
    }
  },
  async mounted() {
    this.currentUser = await this.fetchData()
  }
}
</script>

<style scoped lang="css">
.my-reply {
  padding: 10px;
  //background-color: #fafbfc;
}

.my-reply .header-img {
  display: inline-block;
  vertical-align: top;
}

.my-reply .reply-info {
  display: inline-block;
  width: 90%;
  margin-left: 5px;
}

@media screen and (max-width: 1200px) {
  .my-reply .reply-info {
    width: 80%;
  }
}

.my-reply .reply-info .reply-input {
  min-height: 20px;
  padding: 10px 10px;
  line-height: 22px;
  //color: #ccc;
  //background-color: #fff;
  border-radius: 5px;
}

.my-reply .reply-info .reply-input:empty:before {
  content: attr(placeholder);
}

.my-reply .reply-info .reply-input:focus:before {
  content: none;
}

.my-reply .reply-info .reply-input:focus {
  padding: 8px 8px;
  border: 2px solid #ec0f0f;
  outline: none;
  box-shadow: none;
}

.my-reply .reply-btn-box {
  height: 25px;
  margin: 10px 0;
}

.my-reply .reply-btn-box .reply-btn {
  position: relative;
  float: right;
  margin-right: 15px;
}

.my-comment-reply {
  margin-left: 50px;
}

.my-comment-reply .reply-input {
  width: flex;
}

.author-title:not(:last-child) {
  border-bottom: 1px solid rgb(145, 0, 0);
}

.author-title {
  margin-top: 1rem;
  padding: 10px;
}

.author-title .header-img {
  display: inline-block;
  vertical-align: top;
}

.author-title .author-info {
  display: inline-block;
  width: 60%;
  height: 40px;
  margin-left: 5px;
  line-height: 20px;
}

.author-title .author-info > span {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
}

.author-title .author-info .author-name {
  color: #e8171e;
  font-weight: bold;
  font-size: 18px;
}

.author-title .author-info .author-time {
  font-size: 14px;
}

.author-title .icon-btn {
  float: right;
  width: 30%;
  padding: 0 !important;
}

@media screen and (max-width: 1200px) {
  .author-title .icon-btn {
    width: 20%;
    padding: 7px;
  }
}

.author-title .icon-btn > span {
  cursor: pointer;
}

.author-title .icon-btn .iconfont {
  margin: 0 5px;
  color: #2d8cf0;
}

.author-title .talk-box {
  margin: 0 50px;
}

.author-title .talk-box > p {
  margin: 0;
}

.author-title .talk-box .reply {
  color: #0000ff;
  font-size: 16px;
}

.author-title .reply-box {
  margin: 10px 0 0 50px;
  //background-color: #efefef;
}
</style>
