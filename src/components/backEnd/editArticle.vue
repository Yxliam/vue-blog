<template>
    <div>
        <div v-wechat-title="$route.meta.title"></div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" v-loading="listLoading" class="demo-ruleForm">
            <el-form-item label="文章标题" prop="title">
                <el-input v-model="ruleForm.title" placeholder="请填写文章标题"></el-input>
            </el-form-item>
            <el-form-item label="文章分类" prop="class_type">
                <el-select v-model="ruleForm.class_type" placeholder="文章分类" >
                    <el-option v-for="(item,index) in classList" :key='item.id' :label="item.class_name" :value="item.id" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章描述" prop="descript">
                <el-input type="textarea" v-model="ruleForm.descript" :rows="4" placeholder="请在此处编辑文章描述"></el-input>
            </el-form-item>
                <el-row style="margin-top:20px">
                <el-col :span='12'>
                    <!-- 编辑区 -->
                    <el-form-item label="文章内容" class="show" prop="content" >
                    <el-input type="textarea" v-model="ruleForm.content" :rows="25" placeholder="请在此处编辑文章"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <!-- 展示区 -->
                    <div style="background:#fff;margin:0 0 0 20px;height:526px;overflow-y:auto;" v-html="markedToHtml"></div>
                </el-col>
                </el-row>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" :loading="load">{{ btnText }}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import api from '@/api/backend'
import MsgAlert from '@/store/msg_alert'
import marked from 'marked'
import hlj from 'highlight.js'
import  'highlight.js/styles/atom-one-dark.css'
  export default {
    data() {
      return {
          classList:[],
          isExitClass:true,
          load:false,
        btnText:"立即更新",
         listLoading:false,
        ruleForm: {
          title: '',
          class_type:'',
          content:'',
          id:'',
           descript:''
        },
        rules: {
          title: [
            { required: true, message: '请输入文章标题', trigger: 'blur' },
            { min: 3, message: '最少3个字符', trigger: 'blur' }
          ],
          class_type: [
            { required: true, message: '请选择文章分类', trigger: 'change' }
          ],
          descript:[
               { required: true, message: '请输入文章描述', trigger: 'blur' },
          ],
          content:[
             { required: true, message: '请填写文章内容', trigger: 'blur' }  
          ]
        
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
               this.load = true;
                    // 换成真实API的时候可以直接提交this.article
                    this.btnText = "更新中"
              let data = {
                  title: this.ruleForm.title,
                  content:this.ruleForm.content,
                  class_type:this.ruleForm.class_type,
                   descript:this.ruleForm.descript,
                  id:this.ruleForm.id
              }
              
               api.editArticle(data).then((res)=>{
                     this.load = false;                   
                 if(res.data.code == 1){
                     this.btnText="立即更新";
                     MsgAlert('修改文章成功','success')
                     this.$router.push({path:'/admin/articleList'})
                 }else{
                     this.btnText="立即更新";
                    MsgAlert(res.data.msg)
                 }
              }) 
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
    computed:{
        markedToHtml(){
        marked.setOptions({
            highlight: function (code) {
            return hlj.highlightAuto(code).value;
            }
        });
        // console.log(this.article.content);
        return marked(this.ruleForm.content);
        }
  },
    mounted(){
        var _this = this;
        this.listLoading=true
        api.classList().then((res)=>{
            if(res.data.code == 1){
                if(res.data.length === 0){
                    MsgAlert('暂无分类');
                    _this.isExitClass = false;
                }
                _this.isExitClass = true;
                _this.classList = res.data.data;
            }
        });
        let id = _this.$route.params.id
        api.getArticle({id:id}).then(( res )=>{
            // console.log( res );
           if( res.data.code == 1){
               this.listLoading  =false
               //如果要响应到表单上需要 双向绑定 就是v-model 要绑定要改数据上
               let d = res.data.data;
              this.ruleForm.title = d.title
              this.ruleForm.content = d.content 
              this.ruleForm.class_type = d.pid 
              this.ruleForm.id = d.id
              this.ruleForm.descript = d.descript
           }
        })
    }
  }
</script>
<style>

</style>
