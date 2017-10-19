import Admin from '@/components/backEnd/admin'
import Login from '@/components/backEnd/login'
import AddArticle from '@/components/backEnd/addArticle'
import EditArticle from '@/components/backEnd/editArticle'
import ArticleList from '@/components/backEnd/articleList'
import ClassList from '@/components/backEnd/classList'
import Front from '@/components/fronted/front'
import Home from '@/components/fronted/home'
import Article from '@/components/fronted/article'
import Tag from '@/components/fronted/tag'
import About from '@/components/fronted/about'
import Error from '@/components/error'

export default [

    {
        path:'/login',
        meta:{auth:false,title:'登录'},
        hidden:true,
        component:Login
    },
    {
        path:'/admin',
        meta:{auth:true,flagName:'管理面板',title:'后台首页'},
        component:Admin,
        flagName:'管理面板',
        children:[
            {
                path:'articleList',
                component:ArticleList,
                meta:{auth:true,flagName:'文章列表',title:'文章管理'},
                flagName:'文章列表'
            },
            {
                path:'addArticle',
                component:AddArticle,
                meta:{auth:true,flagName:'添加文章',title:'添加文章'},
                flagName:'添加文章'
            },{
                path:'editArticle/:id',
                component:EditArticle,
                hidden:true,
                meta:{auth:true,flagName:'修改文章',title:'修改文章'},
                flagName:'修改文章' 
            },{
                path:'classList',
                component:ClassList,
                meta:{auth:true,flagName:'分类列表',title:'分类列表'},
                flagName:'分类列表'
            }
        ]
    },
    {
        path:'/',
        meta:{auth:false},
        component:Front,
        hidden:true,
        children:[
            {path:'/index.html',redirect:'home',  meta:{auth:false,title:'首页'}},
            {path:'home',component:Home,  meta:{auth:false,title:'首页'}},
            {path:'article/:id',component:Article,meta:{auth:false,title:'文章'}},
            {path:'tag',component:Tag,meta:{auth:false,title:'文章标签'}},
            {path:'about',component:About,meta:{auth:false,title:'关于我们'}}
        ]
    },
    {
        path:'*',
        hidden:true,
        component:Error
    }

]