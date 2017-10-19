const ADDCOUNT = 'ADDCOUNT';
const USER_LOGIN = 'USER_LOGIN';
const USR_LOGOUT = 'USR_LOGOUT';
const HEAD_LINE = 'HEAD_LINE';
export default{
    [ADDCOUNT](state){
        state.count ++
    },
    [USER_LOGIN](state,data){
        console.log( data );
        sessionStorage.setItem('userName',data.data.username);
        sessionStorage.setItem('userId',data.token)
        state.token = data.token;
        state.isLogin = data.token;
        state.userName = data.data.username;
    },
    [USR_LOGOUT](state){
        sessionStorage.clear();
        state.token = null;
        state.isLogin = null;        
    },
    [HEAD_LINE](state,headline){
        state.headline  = headline
      }
}