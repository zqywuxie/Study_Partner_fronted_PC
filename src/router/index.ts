import type {RouteRecordRaw} from 'vue-router'
import * as VueRouter from 'vue-router'
import type {App} from 'vue'
import {Layout} from '@/utils/routerHelper'

export const constantRouterMap: AppRouteRecordRaw[] = [
    {
        path: '/',
        component: Layout,
        redirect: '/index',
        name: 'root',
        meta: {},
        children: [
            {
                path: 'index',
                component: () => import('@/views/Index/Index.vue'),
                name: 'index',
                meta: {
                    title: '找伙伴',
                    icon: 'game-icons:three-friends'
                }
            }
        ]
    },
    {
        path: '/team',
        component: Layout,
        name: 'team',
        meta: {},
        children: [
            {
                path: '',
                component: () => import('@/views/Team/TeamList.vue'),
                name: 'teamIndex',
                meta: {
                    title: '找队伍',
                    icon: 'fluent:people-team-32-filled'
                }
            },
            {
                path: 'info',
                component: () => import('@/views/Team/TeamInfo.vue'),
                name: 'teamInfo',
                meta: {
                    hidden: true
                }
            },
            {
                path: 'edit',
                component: () => import('@/views/Team/TeamEdit.vue'),
                name: 'teamEdit',
                meta: {
                    hidden: true
                }
            },
            {
                path: 'create',
                component: () => import('@/views/Team/TeamEdit.vue'),
                name: 'teamCreate',
                meta: {
                    hidden: true
                }
            }
        ]
    },
    {
        path: '/im',
        component: Layout,
        name: 'imRoot',
        meta: {},
        children: [
            {
                path: '',
                component: () => import('@/views/Im/Im.vue'),
                name: 'im',
                meta: {
                    title: '聊天室',
                    icon: 'material-symbols:chat'
                }
            }
        ]
    },
    {
        path: '/blog',
        component: Layout,
        name: 'blog',
        meta: {},
        children: [
            {
                path: '',
                component: () => import('@/views/Blog/BlogList.vue'),
                name: 'im',
                meta: {
                    title: '博客广场',
                    icon: 'material-symbols:bookmark'
                }
            },
            {
                path: 'info',
                component: () => import('@/views/Blog/BlogInfo.vue'),
                name: 'blogInfo',
                meta: {
                    hidden: true
                }
            },
            {
                path: 'edit',
                component: () => import('@/views/Blog/BlogEdit.vue'),
                name: 'blogEdit',
                meta: {
                    hidden: true
                }
            }
        ]
    },
    {
        path: '/my',
        component: Layout,
        name: 'my',
        meta: {
            hidden: true
        },
        children: [
            {
                path: 'info',
                component: () => import('@/views/My/Info.vue'),
                name: 'myInfo',
                meta: {}
            },
            {
                path: 'edit',
                component: () => import('@/views/My/Edit.vue'),
                name: 'myEdit',
                meta: {}
            }
        ]
    },
    {
        path: '/user',
        component: Layout,
        name: 'user',
        meta: {
            hidden: true
        },
        children: [
            {
                path: 'info',
                component: () => import('@/views/User/Info.vue'),
                name: 'userInfo',
                meta: {}
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/Login/Login.vue'),
        name: 'Login',
        meta: {
            hidden: true,
            title: '登录',
            noTagsView: true
        }
    },
    {
        path: '/404',
        component: () => import('@/views/Error/404.vue'),
        name: 'NoFind',
        meta: {
            hidden: true,
            title: '404',
            noTagsView: true
        }
    }
]

export const asyncRouterMap: AppRouteRecordRaw[] = [
    // {
    //   path: '/level',
    //   component: Layout,
    //   redirect: '/level/menu1/menu1-1/menu1-1-1',
    //   name: 'Level',
    //   meta: {
    //     title: t('router.level'),
    //     icon: 'carbon:skill-level-advanced'
    //   },
    //   children: [
    //     {
    //       path: 'menu1',
    //       name: 'Menu1',
    //       component: getParentLayout(),
    //       redirect: '/level/menu1/menu1-1/menu1-1-1',
    //       meta: {
    //         title: t('router.menu1')
    //       },
    //       children: [
    //         {
    //           path: 'menu1-1',
    //           name: 'Menu11',
    //           component: getParentLayout(),
    //           redirect: '/level/menu1/menu1-1/menu1-1-1',
    //           meta: {
    //             title: t('router.menu11'),
    //             alwaysShow: true
    //           },
    //           children: [
    //             {
    //               path: 'menu1-1-1',
    //               name: 'Menu111',
    //               component: () => import('@/views/Level/Menu111.vue'),
    //               meta: {
    //                 title: t('router.menu111')
    //               }
    //             }
    //           ]
    //         },
    //         {
    //           path: 'menu1-2',
    //           name: 'Menu12',
    //           component: () => import('@/views/Level/Menu12.vue'),
    //           meta: {
    //             title: t('router.menu12')
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       path: 'menu2',
    //       name: 'Menu2',
    //       component: () => import('@/views/Level/Menu2.vue'),
    //       meta: {
    //         title: t('router.menu2')
    //       }
    //     }
    //   ]
    // }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    strict: true,
    routes: constantRouterMap as RouteRecordRaw[],
    scrollBehavior: () => ({left: 0, top: 0})
})

export const resetRouter = (): void => {
    const resetWhiteNameList = ['Redirect', 'Login', 'NoFind', 'Root']
    router.getRoutes().forEach((route) => {
        const {name} = route
        if (name && !resetWhiteNameList.includes(name as string)) {
            router.hasRoute(name) && router.removeRoute(name)
        }
    })
}

export const setupRouter = (app: App<Element>) => {
    app.use(router)
}

export default router
