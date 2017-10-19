<template>
    <div v-loading="loading2"  element-loading-text="加载中">
        <div v-wechat-title="$route.meta.title"></div>
       <header class="header-link">
           <ul >
               <li :class="{'active':-1==selected}" @click="changeAll">全部</li>
               <li :class="{'active':index==selected}" @click="changeTag(index,item)" v-for="(item,index) in linkList" :key='item.id'>{{ item.class_name }}</li>
           </ul>
       </header>
           <div  class="article-item" v-for="item in list" :key='item.id'>
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
        <div v-show="showNone">
                <p class="nothing">暂无数据</p>
        </div>
        <footer class='loadMore' v-if='loadMoreShow'><el-button class="btn" type="primary" :loading="loadMoreFlag"  @click="loadMore">{{loadMoreText}}</el-button></footer>
    </div>
</template>
<script>
import api from '@/api/fronted'
export default {
    data(){
        return{
            loading2:false,
            linkList:[],
            selected:-1,
            list:[],
            showNone:false,
            tagId:'-1', //-1是全部
            page:0,
            loadMoreShow:false,
            loadMoreFlag:false,
             loadMoreText:'加载更多',
             firstLoad:true
        }
    },
    methods:{
        __getTags(){
            api.getTags().then((res)=>{
               if(res.data.code == 1){
                   this.linkList = res.data.data
               }
            })
        },
        changeAll(){
            this.selected = -1
            this.tagId = -1
            this.changeTag(-1,{id:-1});
        },
        changeTag(index,item){
            this.showNone = false;
            this.selected = index;
            this.tagId = item.id;
            this.page = 1;
            this.list = [];
            if(item.id =='-1'){
                this.$store.dispatch('changeHeadLine','文章')
            }else{
                this.$store.dispatch('changeHeadLine',item.class_name)
            }
          this.__getArticleList(this.tagId,this.page);
        },
        __getArticleList(pid,page){
            let data = {
                pid:pid,
                page:page
            }
            this.loading2 = true;
            api.getTagArticle(data).then((res)=>{
                console.log(  this.firstLoad );
                if(res.data.code == 1   ){
                    this.loading2 = false;
                    if(res.data.list){
                         this.list = this.list.concat( res.data.list )

                        let len = this.list.length;
                         if(len < res.data.count){
                                    this.loadMoreShow = true
                                }else{
                                    this.loadMoreShow = false
                                }
                    }else{
                        this.showNone = false; 
                        if(this.firstLoad){
                            this.list = [];
                            this.showNone = true;                            
                         }
                    }
                    this.firstLoad = false;                    
                }
            })
        },
        loadMore(){
            this.page = this.page +=1 
            console.log( this.tagId );    
            this.__getArticleList(this.tagId,this.page);            
        }
    },
    mounted(){
        this.$store.dispatch('changeHeadLine','文章标签')
        this.__getTags()
        this.loadMore()
        
        
    }
}
</script>
<style lang="scss" scoped>
    .header-link{
        margin-top: 1rem;
        ul{
            display:flex;
            li{
                flex-direction: row;
                margin-right: 2rem;
                border:1px solid #333;
                padding:0.4rem 0.6rem;
                border-radius: 4px;
                background: white;
                cursor: pointer;
                color:#0e1719;
                font-size: 1rem;
            }
            .active{
                background: #0e1719;
                color:white;
            }
        }
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
    .nothing{
        margin:2rem 0;
        text-align: center;
        font-size: 2rem;
    }
</style>
