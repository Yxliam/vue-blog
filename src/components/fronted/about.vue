<template>
    <div class="about">
        <div v-wechat-title="$route.meta.title"></div>
        <h1>一个菜鸟web开发者</h1>
        <h2>
            技术栈:vue2.0+vue-router+vuex+axios+element-ui+php    
        </h2>  
        <h3>
            个人博客传送门:<a href="http://yxlblog.com">个人博客</a>
        </h3>
    </div>
</template>
<script>
export default {
  data(){
      return{

      }
  }
}
</script>
<style lang="scss" scoped>
    .about{
        text-align: center;
        margin-top: 2rem;
        font-size: 2rem;
        h1{
            margin-bottom: 1rem;

        }
        h2{
            margin-bottom: 2rem;
            font-size: 1rem;
        }
        h3{
            font-size: 2rem;
        }
        
    }
</style>
