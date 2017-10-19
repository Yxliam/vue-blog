//api接口
import axios from 'axios';
import qs from 'qs'
const baseUrl = '/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json'
export default {
    test(data){
        //axios get 传参 {params}
        // return axios.get(baseUrl+'index.php/Home/Index/test',{params:data})
        //另外，由于axios默认发送数据时，数据格式是Request Payload，而并非我们常用的Form Data格式，PHP后端未必能正常获取到，所以在发送之前，需要使用qs模块对其进行处理。
        return axios.post(baseUrl+'index.php/Home/Index/test',qs.stringify(data))
    }
}