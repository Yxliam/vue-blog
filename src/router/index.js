import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'

Vue.use(Router)

// 路由钩子
const router =  new Router({
  mode:'history',
  routes
})

router.beforeEach(({meta,path},from,next)=>{
  // NProgress.start();
  let {auth=true}=meta
  let isLogin = Boolean(store.state.isLogin)


  /*
      访问不需要权限的设置meta:false
      注册也要设置成meta:false
  */
  if(auth&&!isLogin&&path!=='/login'){
      next({path:'/login'})
  }
  // 如果登录了以后再访问reg和login则路由到Home
  if(isLogin&&(path=='/login')){
    next({path:'/admin'});
  }
  // 未登录的情况下访问reg则直接路由
  next();
})

export default router;


