<template>
  <div class="panel">
      <div v-wechat-title="$route.meta.title"></div>
      <el-row class="panel-top"> 
        <el-col :span="4"><div class="grid-content bg-purple"><span class="p-l-20">后台管理</span></div></el-col>
        <el-col :span="18">
            &nbsp;
           
        </el-col>
        <el-col :span="2"><div class="grid-content bg-purple"><span class="user-item">{{ userName }}</span><i class="fa fa-user user-item-icon"></i><i class="logout-item fa fa-close" @click="logout">退出</i></div></el-col>
    </el-row>
         <el-row class="tac panel-center">
  <el-col :span="2" class="panel-left">
    <el-menu default-active="2" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
    <template v-for="(item,index) in $router.options.routes" v-if='!item.hidden'>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>{{ item.flagName }}</template>
        <el-menu-item v-for="(child,index) in item.children" :key="child.id" :index="item.path+'/'+child.path" v-if="!child.hidden">{{child.flagName}}</el-menu-item>
      </el-submenu> 
    </template>
     
    </el-menu>
  </el-col>
  <el-col :span="22" class="panel-c-c">
      <el-row>
          <el-col :span='24' class="breadcrumb">
            <el-breadcrumb separator="/" style='float:left'>
                  <!-- <el-breadcrumb-item :to="{path:'/admin/articleList'}">首页</el-breadcrumb-item> -->
                  <el-breadcrumb-item :to="{path:'/admin/articleList'}">{{currentPathNameParent}}</el-breadcrumb-item>
                  <el-breadcrumb-item>{{currentPathName}}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </el-row>
      <router-view></router-view>
  </el-col>
</el-row>
   

  </div>
</template>
<script>
import {mapState} from 'vuex'
import api from '@/api/backend'
export default {
    data(){
        return{
            activeIndex: '1',
            activeIndex2: '1',
             currentPathNameParent:'管理面板',
            currentPathName:'文章列表',
            loading2:true,
        }
    },
    computed:{
        ...mapState(['userName'])
    },
    methods:{
        logout(){
            let _this = this;
            this.$confirm('确认退出吗?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type:'warning'
                    }).then(()=>{
                        this.$store.dispatch('userLogout'); 
            })
          
           
        },
        reload(){
            window.location.reload();
        },
         handleSelect(key, keyPath) {
             console.log(key, keyPath);
        },
        handleOpen(key, keyPath) {
        console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    
    beforeRouteUpdate(to,from,next){
            this.currentPath = to.path;//变成绝对路径
            this.currentPathNameParent = to.matched[0].meta.flagName;//根级路由的name
            this.currentPathName = to.meta.flagName//匹配的完整的带子路由的name
        next();
    },
    //另外一种检测路由变化的方式
   /*  watch:{
        "$route"(to,from){
             this.currentPath = to.path;//变成绝对路径
            this.currentPathNameParent = to.matched[0].name;//根级路由的name
            this.currentPathName = to.flagName//匹配的完整的带子路由的name
        }
    } */
}
</script>
<style lang="scss" scpoed>
.panel{
    position:absolute;
    top:0;
    bottom: 0;
    width:100%;
    height:100%;
  }

    .panel-top{
        height: 60px;
        line-height: 60px;
        background: #1f2d3d;
        color: #c0ccda;
        .p-l-20{
            padding-left:20px;
        }
        .user-item{
            margin-right: 10px;
        }
        .user-item-icon{
            margin-right: 10px;
        }
        .logout-item{
            cursor: pointer;
        }
    }
    .panel-center{
            position: absolute!important;
            top: 60px;
            bottom: 0px;
        width: 100%;
        overflow: hidden;
        background: #324057;
    }
     .panel-c-c{
    /*这是列，因为已经有了列的宽度因此无需设置width*/
    background: #f1f2f7;
	  position: absolute;
		right: 0px;
		top: 0px;
		bottom: 0px;
		overflow-y: scroll;
    /*内层设置滚动*/
		padding: 30px;
  }
   .breadcrumb{
    margin-bottom:15px;
  }
</style>
