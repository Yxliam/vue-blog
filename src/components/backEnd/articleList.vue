<template>
    <div v-loading="loading2"  element-loading-text="加载中">
        <div v-wechat-title="$route.meta.title"></div>
        <el-row  style="padding:10px 15px;background:#fff">
            <el-col :span="24">
                <el-button size="small" type="primary" @click="createArticle">添加文章</el-button>
            </el-col>
         </el-row>
         <el-row>
            <el-col :span='24' >
                 <el-table
             style='width:100%' align="center" :data="articleLists" v-loading="listLoading" selection-change="selectChange(data)" element-loading-text="拼命加载中">
              <el-table-column type='index' width="60" ></el-table-column>
              <el-table-column   prop="create_time" min-width="200" label="修改时间" ></el-table-column>
              <el-table-column  prop="class_name" min-width="150" label="所属分类" ></el-table-column>
              <el-table-column  prop="title" min-width="180" label="文章标题" ></el-table-column>
              <el-table-column  min-width="180" label="操作" >
                <template scope='scope'>
                  <!--这里点击查看进入具体页面但是路径中必须带有admin,这时具体页面里会出现评论的删除选项  -->
                  <el-button size="small" @click="read(scope.row.id)">查看</el-button>
                  <el-button size="small" type='primary' prop ="id" @click="editArticle(scope.row.id)">编辑</el-button>
                  <el-button size="small" type='danger' @click="remove(scope.row.id,scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="block" style="margin-top:10px;">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="totalNum" style="float:right">
                </el-pagination>
            </div>
            </el-col>
         </el-row>
            <!-- element form表单的校验使用  el-form要写:model  :rules ref el-form-itm prop 然后表单元素需要写 v-model: :model.字段名  然后  
                data 数据中需要定义 :model  的form元素   rules 定义校验规则  提交事件 需要把form作为参数提交  然后检验的时候 validate 作为检验
             -->
            


    </div>
</template>
<script>
import api from '@/api/backend'
import MsgAlert from '@/store/msg_alert'
export default {
    data(){
        return{
            currentPage: 1,//当前选中的页码
            pageSize:10,
            totalNum:0,
            listLoading:true,
            articleLists:[],
            loading2:true,
        }
    },
    methods:{
        createArticle(){
            this.$router.push({path:'/admin/addArticle'})
        },
       handleSizeChange(val) {
           //pageSize 改变时会触发
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
          //页码改变触发的事件
        console.log(`当前页: ${val}`);
        this.getArtcileList(val);
      },
      getArtcileList(page){
           let _this = this;
        this.listLoading = true;
        api.articleList({page:page}).then((res)=>{
            this.loading2 = false;
           if(res.data.code == 1){
               _this.articleLists = res.data.list;
                _this.listLoading = false;
                //totalNum 一定要是数字
                _this.totalNum = (res.data.count)-0;
           }else{
              MsgAlert(res.data.msg); 
           }
        })
      },
      editArticle(id){
          this.$router.push({path:`/admin/editArticle/${id}`})
      },
        remove(id,index){
            this.$confirm('你是否要删除这篇文章?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    api.delArticle({id:id}).then(( res )=>{
                        if(res.data.code == 1){
                            this.articleLists.splice(index,1);
                         this.$message({
                           type: 'success',
                            message: '删除成功!'
                           });
                        }else{
                           this.$message({
                           type: 'error',
                            message: res.data.msg
                           }); 
                        }
                    })
                   
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
        }
        
    },
    mounted(){
       this.getArtcileList();
    }
}
</script>
<style lang="scss" scoped>
    .el-row{
        position: static;
    }
</style>
