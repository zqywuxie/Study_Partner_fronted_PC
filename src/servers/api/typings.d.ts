declare namespace API {
  type addBlogUsingPOSTParams = {
    /** 正文 */
    content?: string;
    /** 图片 */
    images?: string[];
    /** 标题 */
    title?: string;
  };

  type agreeToApplyUsingPOSTParams = {
    /** fromId */
    fromId: number;
  };

  type BlogDTO = {
    pageNum?: number;
    pageSize?: number;
    searchText?: string;
  };

  type BlogVO = {
    author?: UserVO;
    commentsNum?: number;
    content?: string;
    /** 封面图片 */
    coverImage?: string;
    createTime?: string;
    id?: number;
    images?: string;
    /** 是否删除 设置逻辑删除 */
    isDelete?: number;
    /** 是否点赞 */
    isLike?: boolean;
    likedNum?: number;
    title?: string;
    updateTime?: string;
    userId?: number;
  };

  type canceledApplyUsingPOSTParams = {
    /** id */
    id: number;
  };

  type ChatMessageVO = {
    /** 聊天类型 */
    chatType?: number;
    /** 创建时间 */
    createTime?: string;
    fromUser?: WebSocketVO;
    /** 是否为管理员 */
    isAdmin?: boolean;
    /** 是否是我的消息 */
    isMy?: boolean;
    /** 队伍id */
    teamId?: number;
    /** 正文 */
    text?: string;
    toUser?: WebSocketVO;
  };

  type ChatRequest = {
    formId?: number;
    teamId?: number;
    toId?: number;
  };

  type checkCodeUsingGETParams = {
    /** 验证码 */
    code?: string;
    /** 手机号 */
    phone?: string;
  };

  type CommentsAddRequest = {
    blogId?: number;
    content?: string;
    parentCommentId?: number;
  };

  type CommentsVO = {
    blogId?: number;
    blogVO?: BlogVO;
    childCommentId?: number;
    commentUser?: UserVO;
    content?: string;
    createTime?: string;
    id?: number;
    /** 是否删除 设置逻辑删除 */
    isDelete?: number;
    isLiked?: boolean;
    likedNum?: number;
    parentCommentId?: number;
    status?: number;
    updateTime?: string;
    userId?: number;
  };

  type CommonResultBlogVO_ = {
    /** 响应码 */
    code?: number;
    data?: BlogVO;
    /** 响应描述 */
    description?: string;
    /** 响应信息 */
    message?: string;
  };

  type CommonResultBoolean_ = {
    /** 响应码 */
    code?: number;
    /** 响应数据 */
    data?: boolean;
    /** 响应描述 */
    description?: string;
    /** 响应信息 */
    message?: string;
  };

  type CommonResultCommentsVO_ = {
    /** 响应码 */
    code?: number;
    data?: CommentsVO;
    /** 响应描述 */
    description?: string;
    /** 响应信息 */
    message?: string;
  };

  type CommonResultInt_ = {
    /** 响应码 */
    code?: number;
    /** 响应数据 */
    data?: number;
    /** 响应描述 */
    description?: string;
    /** 响应信息 */
    message?: string;
  };

  type CommonResultListChatMessageVO_ = {
    /** 响应码 */
    code?: number;
    /** 响应数据 */
    data?: ChatMessageVO[];
    /** 响应描述 */
    description?: string;
    /** 响应信息 */
    message?: string;
  };

  type CommonResultListCommentsVO_ = {
    /** 响应码 */
    code?: number;
    /** 响应数据 */
    data?: CommentsVO[];
    /** 响应描述 */
    description?: string;
    /** 响应信息 */
    message?: string;
  };

  type CommonResultListFriendsRecordVO_ = {
    /** 响应码 */
    code?: number;
    /** 响应数据 */
    data?: FriendsRecordVO[];
    /** 响应描述 */
    description?: string;
    /** 响应信息 */
    message?: string;
  };

  type CommonResultListMessageVO_ = {
    /** 响应码 */
    code?: number;
    /** 响应数据 */
    data?: MessageVO[];
    /** 响应描述 */
    description?: string;
    /** 响应信息 */
    message?: string;
  };

  type CommonResultListTeamUserVO_ = {
    /** 响应码 */
    code?: number;
    /** 响应数据 */
    data?: TeamUserVO[];
    /** 响应描述 */
    description?: string;
    /** 响应信息 */
    message?: string;
  };

  type CommonResultListUser_ = {
    /** 响应码 */
    code?: number;
    /** 响应数据 */
    data?: User[];
    /** 响应描述 */
    description?: string;
    /** 响应信息 */
    message?: string;
  };

  type CommonResultListUserVO_ = {
    /** 响应码 */
    code?: number;
    /** 响应数据 */
    data?: UserVO[];
    /** 响应描述 */
    description?: string;
    /** 响应信息 */
    message?: string;
  };

  type CommonResultLong_ = {
    /** 响应码 */
    code?: number;
    /** 响应数据 */
    data?: number;
    /** 响应描述 */
    description?: string;
    /** 响应信息 */
    message?: string;
  };

  type CommonResultPageBlogVO_ = {
    /** 响应码 */
    code?: number;
    data?: PageBlogVO_;
    /** 响应描述 */
    description?: string;
    /** 响应信息 */
    message?: string;
  };

  type CommonResultPageTeam_ = {
    /** 响应码 */
    code?: number;
    data?: PageTeam_;
    /** 响应描述 */
    description?: string;
    /** 响应信息 */
    message?: string;
  };

  type CommonResultPageUser_ = {
    /** 响应码 */
    code?: number;
    data?: PageUser_;
    /** 响应描述 */
    description?: string;
    /** 响应信息 */
    message?: string;
  };

  type CommonResultString_ = {
    /** 响应码 */
    code?: number;
    /** 响应数据 */
    data?: string;
    /** 响应描述 */
    description?: string;
    /** 响应信息 */
    message?: string;
  };

  type CommonResultTeamUserVO_ = {
    /** 响应码 */
    code?: number;
    data?: TeamUserVO;
    /** 响应描述 */
    description?: string;
    /** 响应信息 */
    message?: string;
  };

  type CommonResultUser_ = {
    /** 响应码 */
    code?: number;
    data?: User;
    /** 响应描述 */
    description?: string;
    /** 响应信息 */
    message?: string;
  };

  type CommonResultUserVO_ = {
    /** 响应码 */
    code?: number;
    data?: UserVO;
    /** 响应描述 */
    description?: string;
    /** 响应信息 */
    message?: string;
  };

  type deleteBlogByIdUsingDELETEParams = {
    /** id */
    id: number;
  };

  type deleteBlogCommentUsingDELETEParams = {
    /** id */
    id: number;
  };

  type deleteFriendRecordsUsingGETParams = {
    /** friendId */
    friendId: number;
  };

  type followUserUsingPOSTParams = {
    /** followerId */
    followerId: number;
  };

  type FriendAddRequest = {
    /** id */
    id?: number;
    /** 接收申请的用户id */
    receiveId?: number;
    /** 好友申请备注信息 */
    remark?: string;
  };

  type FriendsRecordVO = {
    applyUser?: UserVO;
    /** 申请时间 */
    createTime?: string;
    /** 好友申请备注信息 */
    remark?: string;
    /** 申请状态 */
    status?: number;
  };

  type getBlogByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type getCaptchaFromRedisUsingGETParams = {
    /** email */
    email: string;
  };

  type getCaptchaUsingGET1Params = {
    /** email */
    email: string;
  };

  type getCommentByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type getUserBlogMessageUsingGETParams = {
    /** type */
    type: string;
  };

  type getUserMessageNumUsingGETParams = {
    /** type */
    type: string;
  };

  type likeBlogUsingPUTParams = {
    /** id */
    id: number;
  };

  type likeCommentUsingPUTParams = {
    /** id */
    id: number;
  };

  type listBlogCommentsUsingGETParams = {
    /** blogId */
    blogId: number;
  };

  type listMyBlogsUsingGETParams = {
    /** currentPage */
    currentPage?: number;
  };

  type LoginByEmailRequest = {
    /** 验证码 */
    captcha?: string;
    /** 用户邮箱 */
    email?: string;
  };

  type LoginRequest = {
    /** 用户密码 */
    password?: string;
    /** 用户账号 */
    useraccount?: string;
  };

  type matchUsersUsingGETParams = {
    /** num */
    num?: number;
  };

  type MessageVO = {
    blog?: BlogVO;
    comment?: CommentsVO;
    createTime?: string;
    data?: string;
    friendsRecordVO?: FriendsRecordVO;
    fromId?: number;
    fromUser?: UserVO;
    id?: number;
    /** 是否删除 设置逻辑删除 */
    isDelete?: number;
    isRead?: number;
    toId?: number;
    type?: number;
    updateTime?: string;
  };

  type myCreateTeamsUsingGETParams = {
    /** 是否关注 */
    'userVO.isFollow'?: boolean;
    /** 是否关注 */
    'userVO.isFriend'?: boolean;
    description?: string;
    id?: number;
    idList?: number[];
    joinId?: number;
    maxNum?: number;
    name?: string;
    pageNum?: number;
    pageSize?: number;
    searchText?: string;
    status?: number;
    userId?: number;
    'userVO.avatarUrl'?: string;
    'userVO.createTime'?: string;
    'userVO.email'?: string;
    'userVO.gender'?: number;
    'userVO.id'?: number;
    'userVO.phone'?: string;
    'userVO.profile'?: string;
    'userVO.status'?: number;
    'userVO.tags'?: string;
    'userVO.updateTime'?: string;
    'userVO.useraccount'?: string;
    'userVO.username'?: string;
  };

  type myJoinTeamsUsingGETParams = {
    /** 是否关注 */
    'userVO.isFollow'?: boolean;
    /** 是否关注 */
    'userVO.isFriend'?: boolean;
    description?: string;
    id?: number;
    idList?: number[];
    joinId?: number;
    maxNum?: number;
    name?: string;
    pageNum?: number;
    pageSize?: number;
    searchText?: string;
    status?: number;
    userId?: number;
    'userVO.avatarUrl'?: string;
    'userVO.createTime'?: string;
    'userVO.email'?: string;
    'userVO.gender'?: number;
    'userVO.id'?: number;
    'userVO.phone'?: string;
    'userVO.profile'?: string;
    'userVO.status'?: number;
    'userVO.tags'?: string;
    'userVO.updateTime'?: string;
    'userVO.useraccount'?: string;
    'userVO.username'?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageBlogVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: BlogVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageTeam_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Team[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type readMessageUsingGETParams = {
    /** type */
    type: string;
  };

  type recommendUsingGETParams = {
    /** currentPage */
    currentPage: number;
    /** pageSize */
    pageSize: number;
  };

  type RegisterRequest = {
    /** 头像地址 */
    avatarUrl?: string;
    /** 验证码 */
    captcha?: string;
    /** 核实密码 */
    checkPassword?: string;
    /** 邮箱 */
    email?: string;
    /** 用户密码 */
    password?: string;
    /** 用户名 */
    userName?: string;
    /** 用户账号 */
    useraccount?: string;
  };

  type searchAllByPageUsingGETParams = {
    /** 是否关注 */
    'userVO.isFollow'?: boolean;
    /** 是否关注 */
    'userVO.isFriend'?: boolean;
    description?: string;
    id?: number;
    idList?: number[];
    joinId?: number;
    maxNum?: number;
    name?: string;
    pageNum?: number;
    pageSize?: number;
    searchText?: string;
    status?: number;
    userId?: number;
    'userVO.avatarUrl'?: string;
    'userVO.createTime'?: string;
    'userVO.email'?: string;
    'userVO.gender'?: number;
    'userVO.id'?: number;
    'userVO.phone'?: string;
    'userVO.profile'?: string;
    'userVO.status'?: number;
    'userVO.tags'?: string;
    'userVO.updateTime'?: string;
    'userVO.useraccount'?: string;
    'userVO.username'?: string;
  };

  type searchAllUsingGETParams = {
    /** 是否关注 */
    'userVO.isFollow'?: boolean;
    /** 是否关注 */
    'userVO.isFriend'?: boolean;
    description?: string;
    id?: number;
    idList?: number[];
    joinId?: number;
    maxNum?: number;
    name?: string;
    pageNum?: number;
    pageSize?: number;
    searchText?: string;
    status?: number;
    userId?: number;
    'userVO.avatarUrl'?: string;
    'userVO.createTime'?: string;
    'userVO.email'?: string;
    'userVO.gender'?: number;
    'userVO.id'?: number;
    'userVO.phone'?: string;
    'userVO.profile'?: string;
    'userVO.status'?: number;
    'userVO.tags'?: string;
    'userVO.updateTime'?: string;
    'userVO.useraccount'?: string;
    'userVO.username'?: string;
  };

  type searchTeamByIDUsingGETParams = {
    /** id */
    id?: number;
  };

  type searchUserByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type searchUsersByTagsUsingGETParams = {
    /** tags */
    tags?: string[];
  };

  type Team = {
    /** 用户头像 */
    avatarUrl?: string;
    createTime?: string;
    description?: string;
    expireTime?: string;
    id?: number;
    /** 是否删除 设置逻辑删除 */
    isDelete?: number;
    maxNum?: number;
    name?: string;
    password?: string;
    status?: number;
    updateTime?: string;
    userId?: number;
  };

  type TeamAddRequest = {
    avatarUrl?: string;
    description?: string;
    expireTime?: string;
    maxNum?: number;
    name?: string;
    password?: string;
    status?: number;
    userId?: number;
  };

  type TeamDeleteRequest = {
    teamId?: number;
  };

  type TeamJoinRequest = {
    password?: string;
    teamId?: number;
  };

  type TeamQuitRequest = {
    teamId?: number;
  };

  type TeamUpdateRequest = {
    description?: string;
    expireTime?: string;
    id?: number;
    name?: string;
    password?: string;
    status?: number;
  };

  type TeamUserVO = {
    avatarUrl?: string;
    createTime?: string;
    description?: string;
    expireTime?: string;
    hasJoin?: boolean;
    hasJoinNum?: number;
    id?: number;
    joinUserList?: UserVO[];
    manageUserList?: UserVO[];
    maxNum?: number;
    name?: string;
    status?: number;
    updateTime?: string;
    userId?: number;
  };

  type toReadUsingGETParams = {
    /** ids */
    ids?: number[];
  };

  type updateBlogUsingPUTParams = {
    /** 正文 */
    content?: string;
    /** id */
    id?: number;
    /** 未上传的图片 */
    images?: string[];
    /** 已上传的图片 */
    imgStr?: string;
    /** 标题 */
    title?: string;
  };

  type UpdatePasswordRequest = {
    /** 邮箱 */
    email?: string;
    /** 密码 */
    password?: string;
  };

  type uploadOssFileUsingPOSTParams = {
    /** type */
    type?: string;
    /** useraccount */
    useraccount?: string;
  };

  type User = {
    /** 用户头像 */
    avatarUrl?: string;
    /** 创建时间 */
    createTime?: string;
    deptId?: number;
    /** 邮箱 */
    email?: string;
    /** 好友id */
    friendsIds?: string;
    /** 性别 */
    gender?: number;
    /** 用户id */
    id?: number;
    /** 是否删除 设置逻辑删除 */
    isDelete?: number;
    /** 密码 */
    password?: string;
    /** 电话 */
    phone?: string;
    /** 用户个人简历 */
    profile?: string;
    /** 状态 0-正常 */
    status?: number;
    tags?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 账号 */
    useraccount?: string;
    /** 用户昵称 */
    username?: string;
  };

  type UserDTO = {
    pageNum?: number;
    pageSize?: number;
    searchText?: string;
  };

  type UserUpdateRequest = {
    /** 邮箱 */
    email?: string;
    /** 性别 */
    gender?: number;
    /** 用户id */
    id?: number;
    /** 电话 */
    phone?: string;
    /** 用户个人简历 */
    profile?: string;
    tags?: string;
    /** 用户昵称 */
    username?: string;
  };

  type UserVO = {
    avatarUrl?: string;
    createTime?: string;
    email?: string;
    gender?: number;
    id?: number;
    /** 是否关注 */
    isFollow?: boolean;
    /** 是否关注 */
    isFriend?: boolean;
    phone?: string;
    profile?: string;
    status?: number;
    tags?: string;
    updateTime?: string;
    useraccount?: string;
    username?: string;
  };

  type WebSocketVO = {
    /** 用户头像 */
    avatarUrl?: string;
    /** id */
    id?: number;
    /** 用户账号 */
    useraccount?: string;
    /** 用户昵称 */
    username?: string;
  };
}
