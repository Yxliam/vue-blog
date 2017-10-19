export default{
    token:null,
    isLogin:isLoggedIn() || null,
    userName:getUserName() || null,
    headline:''
}

function isLoggedIn(){
    let token = sessionStorage.getItem('userId');
    if(token){
          return token;
    }else{
      return false;
    }
  
  }

  function getUserName(){
    let user = sessionStorage.getItem('userName');
    if(!user) return false;
    return user;
  }
  