import type { App } from 'vue'

// 需要全局引入一些组件，如ElScrollbar，不然一些下拉项样式有问题
// import { ElLoading, ElScrollbar } from 'element-plus'
//
// const plugins = [ElLoading]
//
// const components = [ElScrollbar]
//
// export const setupElementPlus = (app: App) => {
//   plugins.forEach((plugin) => {
//     app.use(plugin)
//   })
//
//   components.forEach((component) => {
//     app.component(component.name, component)
//   })
// }
import ElementPlus from 'element-plus'
export const setupElementPlus = (app: App) => {
  app.use(ElementPlus)
}
