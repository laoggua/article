<template>
    <div>
        <div class="navBar">
            <div>
                <div style="display: flex;">
                    <div class="title">
                        知识库后台管理系统
                    </div>
                </div>
            </div>

            <div>
                <div class="my">
                    <div style="display: flex;">
                        <div>欢迎您，管理员</div>
                    </div>
                </div>
            </div>
        </div>
        <div style="display: flex;">
            <el-menu active-text-color="#ffd04b" background-color="#393d49" text-color="#fff" default-active="1"
                class="menuBar">
                <el-menu-item index="1" @click="jump('welcome')">
                    <el-icon><icon-menu /></el-icon>
                    <span>首页</span>
                </el-menu-item>
                <el-sub-menu index="2">
                    <template #title>
                        <el-icon>
                            <location />
                        </el-icon>
                        <span>知识库管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="2-1" @click="jump('typeMgr')">
                            知识库分类管理
                        </el-menu-item>
                        <el-menu-item index="2-2" @click="jump('articleMgr')">
                            文章管理
                        </el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
                <el-menu-item index="3" @click="jump('exit')">
                    <el-icon>
                        <setting />
                    </el-icon>
                    <span>退出</span>
                </el-menu-item>
            </el-menu>
            <div class="content">
                <router-view class="a"></router-view>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const store = useStore();
const router = useRouter();

const jump = (url) => {
    if (url == "exit") {
        if (confirm("是否要退出？")) {
            store.commit('setLoginState', false);
            store.commit("setToken", null);
            router.push(`/`);
        }
    } else {
        router.push(`/home/${url}`);
    }
}
</script>

<style scoped>
.navBar {
    background-color: #393d49;
    width: 100%;
    height: 8vh;
    display: flex;
    justify-content: space-between;
}

.title {
    color: #fff;
    font-size: 22px;
    line-height: 8vh;
    margin-left: 35px;
}

.my {
    line-height: 8vh;
    margin-right: 35px;
    color: #fff;
}

.menuBar {
    width: 15vw;
    height: 92vh;
}

.content {
    width: 95vw;
    height: 92vh;
    overflow-y: auto;
}

.a{
    width: 95%;
    padding: 30px;
    margin: 0 auto;
}
</style>