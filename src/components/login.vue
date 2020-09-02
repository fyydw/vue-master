<template>
  <div class="login_container w">
    <img src="../../static/login.jpg" alt />
    <p class="mask"></p>
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../assets/head.png" alt="">
      </div>
      <!-- 登录表单 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username" status-icon>
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user" ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" status-icon>
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item>

        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    
  <router-view></router-view>
  </div>
</template>

<script>
export default {
    data() {
      return{
        // 登录表单的数据绑定对象
        loginForm:{
          username:'sq',
          password:'123456'
        },
        // 表单的验证规则对象
        loginFormRules:{
          // 验证用户名
          username:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
          ],
          // 验证密码
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      //点击重置
      resetLoginForm() {
        console.log(this);
        this.$refs.loginFormRef.resetFields();
      },
      login() {
        this.$refs.loginFormRef.validate(async (valid) => {
          console.log(valid);
          if(!valid) return;
          //发起登录请求
          const result = await this.$http.post("/api/users/login", this.loginForm)
          console.log(result);
          if(result.status !== 200) return this.$message.error("登录失败");
          this.$message.success("登录成功");
          window.sessionStorage.setItem("token", result.data.token);
          this.$router.push('/home');
        });
      }
    }
}
</script>


<style scoped lang="scss">
    .w{
      width: 1519px;

    }
    .login_container {
      height: 100%;
      position: relative;
    }
    .login_container > img {
      width: 100%;
      height: 100%;
    }
    /* 遮罩层 */
    .mask {
      width: 100%;
      height: 100%;
      background-color: #000;
      opacity: 0.5;
      filter: alpha(opacity=50);
      position: absolute;
      top: -15px;
      left: 0;
    }
    .login_box {
      width: 450px;
      height: 300px;
      background: #fff;
      border-radius: 3px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .avatar_box{
        width: 110px;
        height: 110px;
        border: 1px solid #000;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #eee;
        }
      }
    }
    .btns{
      display: flex;
      justify-content: space-around;
    }
    .login_form{
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
    }
</style>