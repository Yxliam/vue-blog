
export default{
    alert(obj,cont,cb,title){
         title = title || '提示',
            cb = cb || function(){};
        obj.$alert(cont, title, {
            confirmButtonText: '确定',
            callback: action => {
                    cb()
            }
          });
    }

}