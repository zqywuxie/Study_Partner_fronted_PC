declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    description?: string;
    message?: string;
  };

  type BaseResponseIm_ = {
    code?: number;
    data?: Im;
    description?: string;
    message?: string;
  };

  type BaseResponseInt_ = {
    code?: number;
    data?: number;
    description?: string;
    message?: string;
  };

  type BaseResponseListIm_ = {
    code?: number;
    data?: Im[];
    description?: string;
    message?: string;
  };

  type BaseResponseListTeamUserVo_ = {
    code?: number;
    data?: TeamUserVo[];
    description?: string;
    message?: string;
  };

  type BaseResponseListUser_ = {
    code?: number;
    data?: User[];
    description?: string;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    description?: string;
    message?: string;
  };

  type BaseResponsePageIm_ = {
    code?: number;
    data?: PageIm_;
    description?: string;
    message?: string;
  };

  type BaseResponsePageTeam_ = {
    code?: number;
    data?: PageTeam_;
    description?: string;
    message?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    description?: string;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    description?: string;
    message?: string;
  };

  type BaseResponseTeamUserVo_ = {
    code?: number;
    data?: TeamUserVo;
    description?: string;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    description?: string;
    message?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type deleteUsingDELETEParams = {
    /** id */
    id: number;
  };

  type findAllInitUsingGETParams = {
    /** limit */
    limit: number;
  };

  type findOneUsingGETParams = {
    /** id */
    id: number;
  };

  type findPageUsingGETParams = {
    /** pageNum */
    pageNum: number;
    /** pageSize */
    pageSize: number;
    /** username */
    username?: string;
  };

  type getTeamByIdUsingGETParams = {
    /** id */
    id?: number;
  };
  type getTeamListByUserIdUsingGETParams = {
    /** id */
    userId?: number;
  };

  type Im = {
    avatarUrl?: string;
    createTime?: string;
    id?: number;
    img?: string;
    profile?: string;
    text?: string;
    uid?: number;
    toId?: number;
    username?: string;
  };

  type listMyCreateTeamsUsingGETParams = {
    description?: string;
    id?: number;
    ids?: number[];
    maxNum?: number;
    name?: string;
    pageNum?: number;
    pageSize?: number;
    searchText?: string;
    status?: number;
    userId?: number;
  };

  type listMyJoinTeamsUsingGETParams = {
    description?: string;
    id?: number;
    ids?: number[];
    maxNum?: number;
    name?: string;
    pageNum?: number;
    pageSize?: number;
    searchText?: string;
    status?: number;
    userId?: number;
  };

  type listTeamsByPageUsingGETParams = {
    description?: string;
    id?: number;
    ids?: number[];
    maxNum?: number;
    name?: string;
    pageNum?: number;
    pageSize?: number;
    searchText?: string;
    status?: number;
    userId?: number;
  };

  type listTeamsUsingGETParams = {
    description?: string;
    id?: number;
    ids?: number[];
    maxNum?: number;
    name?: string;
    pageNum?: number;
    pageSize?: number;
    searchText?: string;
    status?: number;
    userId?: number;
  };

  type matchUsersUsingGETParams = {
    /** num */
    num?: number;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageIm_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Im[];
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

  type recommendUsersUsingGETParams = {
    /** pageNum */
    pageNum?: number;
    /** pageSize */
    pageSize?: number;
  };

  type searchUserByTagsUsingGETParams = {
    /** tagList */
    tagList?: string[];
  };

  type searchUsersUsingGETParams = {
    /** username */
    username?: string;
  };
  type searchUsersPageUsingGETParams = {
    /** searchText */
    searchText?: string;
    /** pageNum */
    pageNum?: number;
    /** pageSize */
    pageSize?: number;
  };

  type Team = {
    avatarUrl?: string;
    createTime?: string;
    description?: string;
    announce?: string;
    expireTime?: string;
    id?: number;
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
    announce?: string;
    expireTime?: string;
    maxNum?: number;
    name?: string;
    password?: string;
    status?: number;
    userId?: number;
  };

  type TeamJoinRequest = {
    password?: string;
    teamId?: number;
  };

  type TeamQuitRequest = {
    teamId?: number;
  };

  type TeamUpdateRequest = {
    avatarUrl?: string;
    description?: string;
    announce?: string;
    expireTime?: string;
    maxNum?: number;
    id?: number;
    name?: string;
    password?: string;
    status?: number;
  };

  type TeamUserVo = {
    avatarUrl?: string;
    createTime?: string;
    createUser?: UserVo;
    description?: string;
    announce?: string;
    expireTime?: string;
    hasJoin?: boolean;
    hasJoinNum?: number;
    id?: number;
    joinUserList?: UserVo[];
    maxNum?: number;
    name?: string;
    status?: number;
    updateTime?: string;
    userId?: number;
  };

  type User = {
    avatarUrl?: string;
    contactInfo?: string;
    createTime?: string;
    gender?: number;
    id?: number;
    isDelete?: number;
    phone?: string;
    planetCode?: string;
    profile?: string;
    tags?: string;
    updateTime?: string;
    userAccount?: string;
    userPassword?: string;
    userRole?: number;
    userStatus?: number;
    username?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserRegisterRequest = {
    avatarUrl?: string;
    checkPassword?: string;
    planetCode?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserVo = {
    avatarUrl?: string;
    contactInfo?: string;
    createTime?: string;
    gender?: number;
    id?: number;
    isDelete?: number;
    phone?: string;
    planetCode?: string;
    profile?: string;
    tags?: string;
    updateTime?: string;
    userAccount?: string;
    userRole?: number;
    userStatus?: number;
    username?: string;
  };
}
