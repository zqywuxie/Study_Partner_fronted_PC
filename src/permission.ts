import router from './router'
import { useAppStoreWithOut } from '@/store/modules/app'
import { useCache } from '@/hooks/web/useCache'
import { useTitle } from '@/hooks/web/useTitle'
import { useNProgress } from '@/hooks/web/useNProgress'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { usePageLoading } from '@/hooks/web/usePageLoading'
import {ElMessage} from "element-plus";

const permissionStore = usePermissionStoreWithOut()

const appStore = useAppStoreWithOut()

const { wsCache } = useCache()

const { start, done } = useNProgress()

const { loadStart, loadDone } = usePageLoading()

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach(async (to, from, next) => {
  start()
  loadStart()
  if (wsCache.get(appStore.getUserInfo)) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (permissionStore.getIsAddRouters) {
        // 如果已经添加了路由
        next()
        return
      }

      // // 开发者可根据实际情况进行修改
      // const roleRouters = wsCache.get('roleRouters') || []
      // const userInfo = wsCache.get(appStore.getUserInfo)
      //
      // userInfo.role === 'admin'
      //   ? await permissionStore.generateRoutes('admin', roleRouters as AppCustomRouteRecordRaw[])
      //   : await permissionStore.generateRoutes('test', roleRouters as string[])
      // permissionStore.getAddRouters.forEach((route) => {
      //   router.addRoute(route as unknown as RouteRecordRaw) // 动态添加可访问路由表
      // })

      // type=’none‘加载静态路由，这里不这样的话登陆后没有导航栏~也就是没有加载路由
      await permissionStore.generateRoutes('none')
      const redirectPath = from.query.redirect || to.path
      const redirect = decodeURIComponent(redirectPath as string)
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
      permissionStore.setIsAddRouters(true)
      next(nextData)
    }
  } else {

    if (whiteList.indexOf(to.path) !== -1) {
      next()
    }else if(to.path.indexOf("/login") !== -1){
      console.log(to.path)
      next()
    }else {
      console.log(to.path)
      ElMessage.error("请先登录")
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  }
})

router.afterEach((to) => {
  useTitle(to?.meta?.title as string)
  done() // 结束Progress
  loadDone()
})
