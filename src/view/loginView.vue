<template>
  <div>
    <div style="width: 100vw;height: 100vh; display: flex;justify-content: center;align-items: center;">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>登录</span>
          </div>
        </template>
        <div>
          <div>
            <el-input v-model="user.loginName" placeholder="Please input" />
          </div>
          <br>
          <div>
            <el-input v-model="user.password" placeholder="Please input" />
          </div>
          <br>
          <div>
            身份：
            <el-radio-group v-model="user.identity" size="small">
              <el-radio :label="1" border>管理员</el-radio>
              <el-radio :label="2" border>用户</el-radio>
            </el-radio-group>
          </div>
          <br>
          <div>
            <el-button type="primary" style="width: 100%;" @click="toLogin()">登录</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { useStore } from 'vuex';
import { elogin } from '../api/mobile';

const store = useStore();
const router = useRouter();
const user = ref({
  loginName: '414090297@qq.com',
  password: '12345678',
  identity: 1
});

const toLogin = () => {
  let data = {
    email: user.value.loginName,
    password: user.value.password
  };
  elogin(data).then(res => {
    if (res.data.code == 1) {
      let token = res.data.data.userinfo.token;
      console.log(token);
      store.commit('setLoginState', true);
      store.commit("setToken", token);
      store.commit("setInfo", res.data.data.userinfo);
      alert("登录成功。");
      if(user.value.identity==1){
        router.push('/home');
      }else if(user.value.identity==2){
        router.push('/userHome');
      }
    } else {
      alert("登录失败，账号或密码输入有误。");
    }
  });
}
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>