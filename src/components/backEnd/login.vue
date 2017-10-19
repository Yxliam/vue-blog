<template>
  <div class="login-box">
    <div v-wechat-title="$route.meta.title"></div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm" label-width="80px"  element-loading-text="页面跳转中">
        <h3 class="title">后台登录</h3>
         <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
         <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item class="button-box">
          <el-button type="primary" :loading="loading" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from '@/api/backend'
import common from '../common/common'
  export default {
    data() {
      return {
        dialogVisible: false,
        loading:false,
        ruleForm: {
          name: '',
          password:''
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password:[
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        let _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.loading = true            
            let username = this.ruleForm.name,
                password = this.ruleForm.password;
            let data = {username:username,password:password}
              this.$store.dispatch('userLogin',data);
              this.loading = false; 
          } else {
            this.loading = false; 
            this.$Message.error('表单验证失败!');
            return false;
          }
        });
      },
    },
  }
</script>
<style lang="scss" scoped> 
  .demo-ruleForm{
    position: absolute;
    left: 50%;
    top:50%;
    margin-left:-200px;
    margin-top:-200px;
        width: 350px;
        height:300px;
    padding: 35px 35px 15px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin-bottom: 20px;
    background-color: #f9fafc;
    border: 2px solid #8492a6;
    .title{
         margin: 0 auto 40px;
    text-align: center;
    color: #505458;
        font-size: 1.17em;
    }
    
  }
  .login-box{
    height:100%;
    position: relative;
    background: #1f2d3d;
  }

</style>
