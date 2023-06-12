<template>
    <div>
        <div>
            <el-menu mode="horizontal" background-color="#545c64" text-color="#fff">
                <el-menu-item index="0">知识库系统</el-menu-item>
                <div class="flex-grow" />
                <el-menu-item index="1">欢迎您，用户</el-menu-item>
                <el-menu-item index="2" @click="exit()">退出</el-menu-item>
            </el-menu>
        </div>
        <div class="boxf">
            <div class="demo-collapse">
                <el-collapse>
                    <el-collapse-item title="文章分类">
                        <div class="header">
                            <div @click="loadData(null)">
                                <el-tag type="success" hit size="large">全部</el-tag>
                            </div>
                            <div v-for="item in menuData" :key="item.id" @click="loadData(item.id)">
                                <el-tag type="info" size="large" hit>{{ item.catName }}</el-tag>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div>
                <ul class="infinite-list" style="overflow: auto">
                    <li v-for="item in tableData" :key="item.id" class="infinite-list-item" @click="showOne(item.id)">
                        <div>
                            <el-text class="mx-1" type="info">{{ item.title }}</el-text>
                        </div>
                        <div style="text-align: right;">
                            <el-text class="mx-1" type="danger">{{ item.createTime }}</el-text>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-show="pager">
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
                    :small="small" :background="background" layout="total, sizes, prev, pager, next, jumper" :total="total"
                    @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
        </div>

        <el-dialog v-model="dialogVisible" title="文章详情" style="width: 50%;">
            <div>
                <h1>{{ one.title }}</h1>
            </div>
            <div>
                <span>
                    文章分类：{{ cateOne.catName }}
                </span>
                <span>
                    文章作者ID：{{ one.userinfoId }}
                </span>
            </div>
            <el-divider />
            <div>
                {{ one.content }}
            </div>
            <el-divider />
            <div>发布时间：{{ one.createTime }}</div>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { articleCat_all, articleCat_one } from '../api/article-cat';
import { article_all, article_cateId, article_page, article_one } from '../api/article';
const store = useStore();
const router = useRouter();
const menuData = ref([]);
const tableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);
const pager = ref(true);
const dialogVisible = ref(false);
const one = ref();
const cateOne = ref();

const exit = () => {
    if (confirm("是否要退出？")) {
        store.commit('setLoginState', false);
        store.commit("setToken", null);
        router.push(`/`);
    }
}

const loadMenuData = () => {
    articleCat_all().then(res => {
        menuData.value = res.data.data.articleCats;
    });
}

const loadData = (cateId) => {
    if (cateId == null) {
        let data = {
            current: currentPage.value,
            size: pageSize.value
        }
        article_page(data).then((res) => {
            tableData.value = res.data.data.pages.records;
            total.value = res.data.data.pages.total;
            pager.value = true;
        });
    } else {
        article_cateId(cateId).then((res) => {
            if (res.data.code == 2) {
                alert("没有数据");
            } else {
                tableData.value = res.data.data.articles;
                pager.value = false;
            }
        });
    }

}

const handleSizeChange = (val) => {
    pageSize.value = val;
    loadData();
}

const handleCurrentChange = (val) => {
    currentPage.value = val;
    loadData();
}

const showOne = (id) => {
    article_one(id).then((res) => {
        one.value = res.data.data.article;
        articleCat_one(one.value.articleCatId).then(res => {
            cateOne.value = res.data.data.articleCat;
            dialogVisible.value = true;
        });
    });

}

loadMenuData();
loadData(null);

</script>

<style scoped>
.flex-grow {
    flex-grow: 1;
}

.header {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.header div {
    width: 10%;
    text-align: center;
    margin-bottom: 15px;
    cursor: pointer;
}

.boxf {
    width: 90%;
    height: 100vh;
    margin: 0 auto;
}

.infinite-list {
    height: 100%;
    overflow: auto;
    padding: 0;
    margin: 0;
    list-style: none;
}

.infinite-list-item {
    background-color: #ecf5ff;
    margin: 10px;
    padding: 15px;
    cursor: pointer;
}
</style>