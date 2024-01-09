declare namespace API {
  type addBlogUsingPOSTParams = {
    /** 正文 */
    content?: string
    /** 图片 */
    images?: string[]
    /** 标题 */
    title?: string
  }

  type agreeToApplyUsingPOSTParams = {
    /** fromId */
    fromId: string
  }

  type BlogDTO = {
    pageNum?: number
    pageSize?: number
    searchText?: string
  }

  type BlogVO = {
    author?: UserVO
    commentsNum?: number
    content?: string
    /** 封面图片 */
    coverImage?: string
    createTime?: string
    id?: string
    images?: string
    /** 是否删除 设置逻辑删除 */
    isDelete?: number
    /** 是否点赞 */
    isLike?: boolean
    likedNum?: number
    title?: string
    updateTime?: string
    userId?: string
  }

  type canceledApplyUsingPOSTParams = {
    /** id */
    id: string
  }

  type ChatMessageVO = {
    /** 聊天类型 */
    chatType?: number
    /** 创建时间 */
    createTime?: string
    fromUser?: WebSocketVO
    /** 是否为管理员 */
    isAdmin?: boolean
    /** 是否是我的消息 */
    isMy?: boolean
    /** 队伍id */
    teamId?: string
    /** 正文 */
    text?: string
    toUser?: WebSocketVO
  }

  type ChatRequest = {
    formId?: string
    teamId?: string
    toId?: string
  }

  type checkCodeUsingGETParams = {
    /** 验证码 */
    code?: string
    /** 手机号 */
    phone?: string
  }

  type CommentsAddRequest = {
    blogId?: string
    content?: string
    parentCommentId?: number
  }

  type CommentsVO = {
    blogId?: string
    blogVO?: BlogVO
    childCommentId?: number
    commentUser?: UserVO
    content?: string
    createTime?: string
    id?: string
    /** 是否删除 设置逻辑删除 */
    isDelete?: number
    isLiked?: boolean
    likedNum?: number
    parentCommentId?: number
    status?: number
    updateTime?: string
    userId?: string
  }

  type CommonResultBlogVO_ = {
    /** 响应码 */
    code?: number
    data?: BlogVO
    /** 响应描述 */
    description?: string
    /** 响应信息 */
    message?: string
  }

  type CommonResultBoolean_ = {
    /** 响应码 */
    code?: number
    /** 响应数据 */
    data?: boolean
    /** 响应描述 */
    description?: string
    /** 响应信息 */
    message?: string
  }

  type CommonResultCommentsVO_ = {
    /** 响应码 */
    code?: number
    data?: CommentsVO
    /** 响应描述 */
    description?: string
    /** 响应信息 */
    message?: string
  }

  type CommonResultInt_ = {
    /** 响应码 */
    code?: number
    /** 响应数据 */
    data?: number
    /** 响应描述 */
    description?: string
    /** 响应信息 */
    message?: string
  }

  type CommonResultListChatMessageVO_ = {
    /** 响应码 */
    code?: number
    /** 响应数据 */
    data?: ChatMessageVO[]
    /** 响应描述 */
    description?: string
    /** 响应信息 */
    message?: string
  }

  type CommonResultListCommentsVO_ = {
    /** 响应码 */
    code?: number
    /** 响应数据 */
    data?: CommentsVO[]
    /** 响应描述 */
    description?: string
    /** 响应信息 */
    message?: string
  }

  type CommonResultListFriendsRecordVO_ = {
    /** 响应码 */
    code?: number
    /** 响应数据 */
    data?: FriendsRecordVO[]
    /** 响应描述 */
    description?: string
    /** 响应信息 */
    message?: string
  }

  type CommonResultListMessageVO_ = {
    /** 响应码 */
    code?: number
    /** 响应数据 */
    data?: MessageVO[]
    /** 响应描述 */
    description?: string
    /** 响应信息 */
    message?: string
  }

  type CommonResultListTeamUserVO_ = {
    /** 响应码 */
    code?: number
    /** 响应数据 */
    data?: TeamUserVO[]
    /** 响应描述 */
    description?: string
    /** 响应信息 */
    message?: string
  }

  type CommonResultListUser_ = {
    /** 响应码 */
    code?: number
    /** 响应数据 */
    data?: User[]
    /** 响应描述 */
    description?: string
    /** 响应信息 */
    message?: string
  }

  type CommonResultListUserVO_ = {
    /** 响应码 */
    code?: number
    /** 响应数据 */
    data?: UserVO[]
    /** 响应描述 */
    description?: string
    /** 响应信息 */
    message?: string
  }

  type CommonResultLong_ = {
    /** 响应码 */
    code?: number
    /** 响应数据 */
    data?: string
    /** 响应描述 */
    description?: string
    /** 响应信息 */
    message?: string
  }

  type CommonResultPageBlogVO_ = {
    /** 响应码 */
    code?: number
    data?: PageBlogVO_
    /** 响应描述 */
    description?: string
    /** 响应信息 */
    message?: string
  }

  type CommonResultPageTeam_ = {
    /** 响应码 */
    code?: number
    data?: PageTeam_
    /** 响应描述 */
    description?: string
    /** 响应信息 */
    message?: string
  }

  type CommonResultPageUser_ = {
    /** 响应码 */
    code?: number
    data?: PageUser_
    /** 响应描述 */
    description?: string
    /** 响应信息 */
    message?: string
  }

  type CommonResultString_ = {
    /** 响应码 */
    code?: number
    /** 响应数据 */
    data?: string
    /** 响应描述 */
    description?: string
    /** 响应信息 */
    message?: string
  }

  type CommonResultTeamUserVO_ = {
    /** 响应码 */
    code?: number
    data?: TeamUserVO
    /** 响应描述 */
    description?: string
    /** 响应信息 */
    message?: string
  }

  type CommonResultUser_ = {
    /** 响应码 */
    code?: number
    data?: User
    /** 响应描述 */
    description?: string
    /** 响应信息 */
    message?: string
  }

  type CommonResultUserVO_ = {
    /** 响应码 */
    code?: number
    data?: UserVO
    /** 响应描述 */
    description?: string
    /** 响应信息 */
    message?: string
  }

  type deleteBlogByIdUsingDELETEParams = {
    /** id */
    id: string
  }

  type deleteBlogCommentUsingDELETEParams = {
    /** id */
    id: string
  }

  type deleteFriendRecordsUsingGETParams = {
    /** friendId */
    friendId: string
  }

  type followUserUsingPOSTParams = {
    /** followerId */
    followerId: string
  }

  type FriendAddRequest = {
    /** id */
    id?: string
    /** 接收申请的用户id */
    receiveId?: string
    /** 好友申请备注信息 */
    remark?: string
  }

  type FriendsRecordVO = {
    applyUser?: UserVO
    /** 申请时间 */
    createTime?: string
    /** 好友申请备注信息 */
    remark?: string
    /** 申请状态 */
    status?: number
  }

  type getBlogByIdUsingGETParams = {
    /** blogId */
    blogId: string
  }

  type getCaptchaFromRedisUsingGETParams = {
    /** email */
    email: string
  }

  type getCaptchaUsingGET1Params = {
    /** email */
    email: string
  }

  type getCommentByIdUsingGETParams = {
    /** id */
    id: string
  }

  type getUserBlogMessageUsingGETParams = {
    /** type */
    type: string
  }

  type getUserMessageNumUsingGETParams = {
    /** type */
    type: string
  }

  type likeBlogUsingPUTParams = {
    /** id */
    id: string
  }

  type likeCommentUsingPUTParams = {
    /** id */
    id: string
  }

  type listBlogCommentsUsingGETParams = {
    /** blogId */
    blogId: string
  }

  type listMyBlogsUsingGETParams = {
    /** currentPage */
    currentPage?: string
  }

  type LoginByEmailRequest = {
    /** 验证码 */
    captcha?: string
    /** 用户邮箱 */
    email?: string
  }

  type LoginRequest = {
    /** 用户密码 */
    password?: string
    /** 用户账号 */
    useraccount?: string
  }

  type matchUsersUsingGETParams = {
    /** num */
    num?: string
  }

  type MessageVO = {
    blog?: BlogVO
    comment?: CommentsVO
    createTime?: string
    data?: string
    friendsRecordVO?: FriendsRecordVO
    fromId?: string
    fromUser?: UserVO
    id?: string
    /** 是否删除 设置逻辑删除 */
    isDelete?: number
    isRead?: number
    toId?: string
    type?: number
    updateTime?: string
  }

  type myCreateTeamsUsingGETParams = {
    /** 是否关注 */
    'userVO.isFollow'?: boolean
    /** 是否关注 */
    'userVO.isFriend'?: boolean
    description?: string
    id?: string
    idList?: string[]
    joinId?: string
    maxNum?: number
    name?: string
    pageNum?: number
    pageSize?: number
    searchText?: string
    status?: number
    userId?: string
    'userVO.avatarUrl'?: string
    'userVO.createTime'?: string
    'userVO.email'?: string
    'userVO.gender'?: number
    'userVO.id'?: string
    'userVO.phone'?: string
    'userVO.profile'?: string
    'userVO.status'?: number
    'userVO.tags'?: string
    'userVO.updateTime'?: string
    'userVO.useraccount'?: string
    'userVO.username'?: string
  }

  type myJoinTeamsUsingGETParams = {
    /** 是否关注 */
    'userVO.isFollow'?: boolean
    /** 是否关注 */
    'userVO.isFriend'?: boolean
    description?: string
    id?: string
    idList?: string[]
    joinId?: string
    maxNum?: number
    name?: string
    pageNum?: number
    pageSize?: number
    searchText?: string
    status?: number
    userId?: string
    'userVO.avatarUrl'?: string
    'userVO.createTime'?: string
    'userVO.email'?: string
    'userVO.gender'?: number
    'userVO.id'?: string
    'userVO.phone'?: string
    'userVO.profile'?: string
    'userVO.status'?: number
    'userVO.tags'?: string
    'userVO.updateTime'?: string
    'userVO.useraccount'?: string
    'userVO.username'?: string
  }

  type OrderItem = {
    asc?: boolean
    column?: string
  }

  type PageBlogVO_ = {
    countId?: string
    current?: string
    maxLimit?: string
    optimizeCountSql?: boolean
    orders?: OrderItem[]
    pages?: string
    records?: BlogVO[]
    searchCount?: boolean
    size?: string
    total?: string
  }

  type PageTeam_ = {
    countId?: string
    current?: string
    maxLimit?: string
    optimizeCountSql?: boolean
    orders?: OrderItem[]
    pages?: string
    records?: Team[]
    searchCount?: boolean
    size?: string
    total?: string
  }

  type PageUser_ = {
    countId?: string
    current?: string
    maxLimit?: string
    optimizeCountSql?: boolean
    orders?: OrderItem[]
    pages?: string
    records?: User[]
    searchCount?: boolean
    size?: string
    total?: string
  }

  type readMessageUsingGETParams = {
    /** type */
    type: string
  }

  type recommendUsingGETParams = {
    /** currentPage */
    currentPage: string
    /** pageSize */
    pageSize: string
  }

  type RegisterRequest = {
    /** 头像地址 */
    avatarUrl?: string
    /** 验证码 */
    captcha?: string
    /** 核实密码 */
    checkPassword?: string
    /** 邮箱 */
    email?: string
    /** 用户密码 */
    password?: string
    /** 用户名 */
    userName?: string
    /** 用户账号 */
    useraccount?: string
  }

  type searchAllByPageUsingGETParams = {
    /** 是否关注 */
    'userVO.isFollow'?: boolean
    /** 是否关注 */
    'userVO.isFriend'?: boolean
    description?: string
    id?: string
    idList?: string[]
    joinId?: string
    maxNum?: number
    name?: string
    pageNum?: number
    pageSize?: number
    searchText?: string
    status?: number
    userId?: string
    'userVO.avatarUrl'?: string
    'userVO.createTime'?: string
    'userVO.email'?: string
    'userVO.gender'?: number
    'userVO.id'?: string
    'userVO.phone'?: string
    'userVO.profile'?: string
    'userVO.status'?: number
    'userVO.tags'?: string
    'userVO.updateTime'?: string
    'userVO.useraccount'?: string
    'userVO.username'?: string
  }

  type searchTeamByIDUsingGETParams = {
    /** id */
    id?: string
  }

  type searchUserByIdUsingGETParams = {
    /** id */
    id: string
  }

  type searchUsersByTagsUsingGETParams = {
    /** tags */
    tags?: string[]
  }

  type Team = {
    /** 用户头像 */
    avatarUrl?: string
    createTime?: string
    description?: string
    expireTime?: string
    id?: string
    /** 是否删除 设置逻辑删除 */
    isDelete?: number
    maxNum?: number
    name?: string
    password?: string
    status?: number
    updateTime?: string
    userId?: string
  }

  type TeamAddRequest = {
    avatarUrl?: string
    description?: string
    expireTime?: string
    maxNum?: number
    name?: string
    password?: string
    status?: number
    userId?: string
  }

  type TeamDeleteRequest = {
    teamId?: string
  }

  type TeamJoinRequest = {
    password?: string
    teamId?: string
  }

  type TeamQuitRequest = {
    teamId?: string
  }

  type TeamUpdateRequest = {
    description?: string
    expireTime?: string
    id?: string
    name?: string
    password?: string
    status?: number
  }

  type TeamUserVO = {
    avatarUrl?: string
    createTime?: string
    description?: string
    expireTime?: string
    hasJoin?: boolean
    hasJoinNum?: number
    id?: string
    joinUserList?: UserVO[]
    manageUserList?: UserVO[]
    maxNum?: number
    name?: string
    status?: number
    updateTime?: string
    userId?: string
  }

  type toReadUsingGETParams = {
    /** ids */
    ids?: string[]
  }

  type updateBlogUsingPUTParams = {
    /** 正文 */
    content?: string
    /** id */
    id?: string
    /** 未上传的图片 */
    images?: string[]
    /** 已上传的图片 */
    imgStr?: string
    /** 标题 */
    title?: string
  }

  type UpdatePasswordRequest = {
    /** 邮箱 */
    email?: string
    /** 密码 */
    password?: string
  }

  type uploadOssFileUsingPOSTParams = {
    /** type */
    type?: string
    /** useraccount */
    useraccount?: string
  }

  type User = {
    /** 用户头像 */
    avatarUrl?: string
    /** 创建时间 */
    createTime?: string
    deptId?: string
    /** 邮箱 */
    email?: string
    /** 好友id */
    friendsIds?: string
    /** 性别 */
    gender?: number
    /** 用户id */
    id?: string
    /** 是否删除 设置逻辑删除 */
    isDelete?: number
    /** 密码 */
    password?: string
    /** 电话 */
    phone?: string
    /** 用户个人简历 */
    profile?: string
    /** 状态 0-正常 */
    status?: number
    tags?: string
    /** 更新时间 */
    updateTime?: string
    /** 账号 */
    useraccount?: string
    /** 用户昵称 */
    username?: string
  }

  type UserDTO = {
    pageNum?: number
    pageSize?: number
    searchText?: string
  }

  type UserUpdateRequest = {
    /** 邮箱 */
    email?: string
    /** 性别 */
    gender?: number
    /** 用户id */
    id?: string
    /** 电话 */
    phone?: string
    /** 用户个人简历 */
    profile?: string
    tags?: string
    /** 用户昵称 */
    username?: string
  }

  type UserVO = {
    avatarUrl?: string
    createTime?: string
    email?: string
    gender?: number
    id?: string
    /** 是否关注 */
    isFollow?: boolean
    /** 是否关注 */
    isFriend?: boolean
    phone?: string
    profile?: string
    status?: number
    tags?: string
    updateTime?: string
    useraccount?: string
    username?: string
  }

  type WebSocketVO = {
    /** 用户头像 */
    avatarUrl?: string
    /** id */
    id?: string
    /** 用户账号 */
    useraccount?: string
    /** 用户昵称 */
    username?: string
  }
}
