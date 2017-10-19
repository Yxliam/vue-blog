import api from '@/api/backend'
import router from '../router'
import msgAlert from './msg_alert'
export default {
    //这里使用 {commit}的结构的方式  不写{commit}方式的话，就要写 context  然后context.commit() 的方式commit
    addCountIn({commit}){
        commit('ADDCOUNT')
    },
    userLogin({commit},data){
        api.doLogin(data).then(function( res ){
            if(res.data.code == 1){
                msgAlert('登录成功','success');
              let state_data = {data:data,token:res.data.data.token};
              commit('USER_LOGIN',state_data)
              router.replace({path:'/admin/articleList'})
             
            }else{
                msgAlert(res.data.msg);
            }
        })
    },
    userLogout({commit}){
        api.doLogout().then((res)=>{
            if(res.data.code == 1){
                commit('USR_LOGOUT')
                router.replace({path:'/login'})
                window.location.reload();
            }else{
                msgAlert(res.data.msg);
            }
           
       })
    },
    changeHeadLine({commit},headline){
         commit('HEAD_LINE',headline)
       }
}