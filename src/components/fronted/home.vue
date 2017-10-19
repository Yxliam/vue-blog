<template>
  <div v-loading="loading2"  element-loading-text="加载中">
      <div v-wechat-title="$route.meta.title"></div>
      <h2 class="h2"> 文章列表 </h2>
     <div class="article-item" v-for="item in list">
         <h1 class="title">{{ item.title }}</h1>
        <p class="descript">{{ item.descript }}</p>
        <div class="foot clearfix">
            <div class="time fl">
                <i class="el-icon-time"></i><span>{{ item.create_time}}</span>
                <i class="tag fa fa-tag">{{ item.class_name }}</i>
            </div>
            <router-link class="home_readMore fr" :to="{path:`/article/${item.id}`}">阅读全文>></router-link>
        </div>
     </div>
     <footer class='loadMore' v-if='loadMoreShow'><el-button class="btn" type="primary" :loading="loadMoreFlag" @click='loadMore'>{{loadMoreText}}</el-button></footer>
  </div>
</template>
<script>
import '@/components/common/common.scss';
import api from '@/api/fronted'
export default {
    data(){
        return{
            loading2:true,
            loadMoreFlag:false,
            loadMoreText:'加载更多',
            loadMoreShow:false,
            page:1,
            list:[],
        }
    },
    methods:{
        loadMore(){
             this.loadMoreText = '加载中'
            this.loadMoreFlag = true
            this.page++
            this.lode(this.page)
        },
        lode(page){
            let _this = this;
            api.getAllArticle({page:page}).then((res)=>{
                console.log( res );
                if(res.data.code == 1){
                    this.loading2=false;
                        if(res.data.list){
                            _this.loadMoreFlag =  false
                            _this.list = _this.list.concat(res.data.list);
                            let len = this.list.length;
                            console.log( len );
                            console.log( res.data.count );
                             if(res.data.count>len){
                                _this.loadMoreShow = true
                                _this.loadMoreText = '加载更多'
                             }else{
                                _this.loadMoreShow = false
                             }
                        }else{
                            
                        }        
                }
            })
        }
    },
    mounted(){
        this.$store.dispatch('changeHeadLine','主页')
        this.lode(this.page)

    }
}
</script>
<style lang="scss" scoped>
.h2{
    font-size: 2rem;
    margin-top: 1rem;
}
    .article-item{
        border:1px solid #dedede;
        margin:2rem 0;
        padding:1rem;
        .title{
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }
        .tag{
            margin-left: 0.5rem;
        }
        .descript{
            margin-bottom: 0.5rem;
        }
    }
    .loadMore{
        text-align: center;
        .btn{
            background: black;
            border:none;
        }
    }
</style>
