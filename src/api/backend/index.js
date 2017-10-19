//api接口
import axios from 'axios';
import qs from 'qs';
let host = window.location.hostname;
let baseUrl = null;
if(host == 'localhost'){
    baseUrl = '/api/'
}else{
    baseUrl = '/'
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'     //如果写成json的话 php需要转化一下
export default {
    doLogin(data){
        return axios.post(baseUrl+'index.php/Admin/Login/login',qs.stringify(data))
    },
    addClass(data){
        return axios.post(baseUrl+'index.php/Admin/Index/add_class',qs.stringify(data))
    },
    doLogout(){
        return axios.post(baseUrl+'index.php/Admin/Login/logout')
    },
    classList(){
        return axios.post(baseUrl+'index.php/Admin/Index/class_list')
    },
    addArticle(data){
        return axios.post(baseUrl+'index.php/Admin/Index/add_article',qs.stringify(data))
    },
    articleList(data){
        return axios.post(baseUrl+'index.php/Admin/Index/article_list',qs.stringify(data))  
    },
    getArticle(data){
        return axios.post(baseUrl+'index.php/Admin/Index/get_article_by_id',qs.stringify(data))  
    },
    editArticle(data){
        return axios.post(baseUrl+'index.php/Admin/Index/edit_article',qs.stringify(data)) 
    },
    delArticle(data){
        return axios.post(baseUrl+'index.php/Admin/Index/delete_article',qs.stringify(data))  
    },
    getClassList(data){
        return axios.post(baseUrl+'index.php/Admin/Index/get_class_list',qs.stringify(data))  
    },
    editClass(data){
        return axios.post(baseUrl+'index.php/Admin/Index/edit_class',qs.stringify(data))    
    },
    delClass(data){
        return axios.post(baseUrl+'index.php/Admin/Index/del_class',qs.stringify(data))  
    }
}