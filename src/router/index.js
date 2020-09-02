import Vue from 'vue'
import Router from 'vue-router'
import page from '@/components/page'
import login from '@/components/login'
import home from '@/components/home'
import welcome from '@/components/welcome'
import users from '@/components/user/users'
import plans from '@/components/plan/plans'
import needsPlans from '@/components/plan/needsPlans'
import materialContract from '@/components/plan/materialContract'
// 合同管理
import contractManagement from '@/components/plan/contractManagement'
// 材料入场
import admissionMaterials from '@/components/material/admissionMaterials'
// 材料出库
import materialDelivery from '@/components/material/materialDelivery'
// 材料盘点
import detailMaterial from '@/components/material/detailMaterial'
//合同配置
import contractConfiguration from '@/components/materialSettings/contractConfiguration'
// 仓库配置
import warehouseConfiguration from '@/components/materialSettings/warehouseConfiguration'
// 基础物质库
import basicMaterialWarehouse from '@/components/materialSettings/basicMaterialWarehouse'
// 供应商配置
import supplierConfiguration from '@/components/materialSettings/supplierConfiguration'


import person from '@/components/person'
import top1 from '@/components/top1'


Vue.use(Router)

const router = new Router({
  // 更换模式
  mode: 'history',
  // 配置全局样式
  linkExactActiveClass: 'aaa',
  routes: [
    {
      path: '/',
      redirect: './login'
    },
    {
      path: '/index',
      name: 'page',
      component: page
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect: '/welcome',
      children:[
        {path: '/welcome', component: welcome},
        {path: '/users', component: users},
        {path: '/plans', component: plans},
        {path: '/needsPlans', component: needsPlans},
        {path: '/materialContract',
         component: materialContract,
         children: [
            {path: '/contractManagement',component: contractManagement}
          ]
        },
        {path: '/admissionMaterials', component: admissionMaterials},
        {path: '/materialDelivery', component: materialDelivery},
        {path: '/detailMaterial', component: detailMaterial},
        {path: '/contractConfiguration', component: contractConfiguration},
        {path: '/warehouseConfiguration', component: warehouseConfiguration},
        {path: '/basicMaterialWarehouse', component: basicMaterialWarehouse},
        {path: '/supplierConfiguration', component: supplierConfiguration},
    ]
    },
    {
      path: '/person',
      name: 'person',
      component: person
    },
    {
      path: '/top1',
      name: 'top1',
      component: top1
    },
    
  ]
})

//挂载路由导航守卫
// router.beforeEach((to, from, next) => {
    // to 将要访问的路径
    // form 代表从那个路径跳转过来
    // next 是一个函数， 表示放行
        // next() 放行    next('./login')   强制跳转

        
        // if(to.path === './login') return next()
        // //获取token
        // const tokenStr = window.sessionStorage.getItem('token') 
        // if(!tokenStr) return next('./login')
        // next()
// })


export default router