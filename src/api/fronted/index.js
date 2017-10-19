//api接口
import axios from 'axios';
import qs from 'qs'
let host = window.location.hostname;
let baseUrl = null;
if(host == 'localhost'){
    baseUrl = '/api/'
}else{
    baseUrl = '/'
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'     //如果写成json的话 php需要转化一下
export default {
    getAllArticle(data){
        return axios.post(baseUrl+'index.php/Admin/Home/get_all_article',qs.stringify(data))  
    },
    getArticle(data){
        return axios.post(baseUrl+'index.php/Admin/Home/get_article',qs.stringify(data))  
    },
    getTags(){
        return axios.post(baseUrl+'index.php/Admin/Home/get_tag')  
    },
    getTagArticle(data){
        return axios.post(baseUrl+'index.php/Admin/Home/get_tag_article',qs.stringify(data))
    }

}