<template>
    <div>
        <div v-wechat-title="$route.meta.title"></div>
        <el-row  style="padding:10px 15px;background:#fff">
            <el-col :span="24">
                <el-button size="small" type="primary" @click="dialogFormVisible=true">添加分类</el-button>
            </el-col>
         </el-row>
         <el-row>
            <el-col :span='24' >
                 <el-table
             style='width:100%' align="center" :data="classLists" v-loading="listLoading"  element-loading-text="拼命加载中">
              <el-table-column type='index' width="60" ></el-table-column>
              <el-table-column   prop="class_name" min-width="200" label="分类名称" ></el-table-column>
              <el-table-column  min-width="180" label="操作" >
                <template scope='scope'>
                  <!--这里点击查看进入具体页面但是路径中必须带有admin,这时具体页面里会出现评论的删除选项  -->
                  <el-button size="small" type='primary' prop ="id" @click="editClass(scope.row,scope.$index)">编辑</el-button>
                  <el-button size="small" type='danger' @click="remove(scope.row.id,scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="block" style="margin-top:10px;">
                <el-pagination
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
            <el-dialog :title="classTitle" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="分类名称" prop="className" :label-width="formLabelWidth">
                <el-input v-model="form.className" auto-complete="off" placeholder="请填写分类名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addClass('form')">{{btnText}}</el-button>
            </div>
            </el-dialog>


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
            classTitle:'添加分类',
            classLists:[],
            itemId:'',
            itemIndex:'',
            dialogFormVisible: false,
            btnText:'添 加',
            form: {
                className: '',
            },
            rules:{
                className:[{required: true, message: '请输入分类名称', trigger: 'blur'}]
            },
             formLabelWidth: '120px'
      }
  },
  methods:{
      editClass(scope,index){
          this.btnText = '修 改';
          this.classTitle = '修改分类'
          this.dialogFormVisible = true
          this.itemId = scope.id;
          this.form.className = scope.class_name
          this.itemIndex = index
      },
      remove(id,index){
         this.$confirm('删除了这个分类，该分类下的文章也会删除，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    api.delClass({id:id}).then((res)=>{
                         if(res.data.code == 1){
                             this.classLists.splice(index,1);
                             MsgAlert('删除分类成功','success')
                         }else{
                              MsgAlert(res.data.msg);
                         }
                      })
                })
         
      },
       addClass(form){
            let _this = this;
            this.$refs[form].validate((valid)=>{
                if(valid){
                    var data = {
                        className:_this.form.className
                    }
                    if(this.itemId){
                        api.editClass({id:this.itemId,class_name:_this.form.className}).then((res)=>{
                            this.itemId = ''
                            if(res.data.code == 1){
                                _this.dialogFormVisible = false;  
                                _this.classLists[_this.itemIndex].class_name = _this.form.className
                                MsgAlert('修改分类成功','success')

                            }else{
                                MsgAlert(res.data.msg);
                            }
                        })
                    }else{
                            api.addClass(data).then((res)=>{
                                console.log( res );
                                if(res.data.code == 1){
                                    _this.dialogFormVisible = false;    
                                    var itemObj = {id:res.data.data,class_name:_this.form.className};
                                    _this.classLists.push(itemObj);                      
                                    MsgAlert('添加分类成功','success')
                                }else{
                                        MsgAlert(res.data.msg);
                                }

                        }).catch((res)=>{
                                console.log( res );
                        })
                    }
                  


                }else{
                    console.log(2);
                }
            })   
      },
       handleCurrentChange(val) {
          //页码改变触发的事件
        console.log(`当前页: ${val}`);
        this._getClassList(val);
      },
      _getClassList(page){
            let _this = this;
        this.listLoading = true;
        api.getClassList({page:page}).then((res)=>{
           if(res.data.code == 1){
               _this.classLists = res.data.list;
                _this.listLoading = false;
                //totalNum 一定要是数字
                _this.totalNum = (res.data.count)-0;
           }else{
              MsgAlert(res.data.msg); 
           }
        })
      }
  },
  mounted(){
        // api.getClassList({page:})  
        this._getClassList();
  }
}
</script>
<style>

</style>
