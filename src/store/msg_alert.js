import Vue from 'vue'
export default function (message,type){
    type = type || 'error'
  Vue.prototype.$message({
      message,
      type:type,
      showClose: true
  })
}
