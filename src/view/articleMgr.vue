<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>文章管理</span>
          <el-button type="primary" @click="showAdd()">新增</el-button>
        </div>
      </template>
      <div>
        <el-table :data="tableData" style="width: 100%;">
          <el-table-column prop="id" label="ID" />
          <el-table-column prop="articleCatId" label="知识库分类" />
          <el-table-column prop="title" label="文章标题" />
          <el-table-column prop="content" label="文章内容" width="500" />
          <el-table-column prop="userinfoId" label="用户信息ID" />
          <el-table-column prop="open" label="open" />
          <el-table-column fixed="right" label="操作">
            <template #default="scoped">
              <el-button link type="primary" size="small" @click="showEdit(scoped.row.id)">编辑</el-button>
              <el-button link type="danger" size="small" @click="toDel(scoped.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <br>
      <div>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
          :small="small" :background="background" layout="total, sizes, prev, pager, next, jumper" :total="total"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </el-card>

    <el-dialog v-model="addDialogVisible" title="新增文章" style="width: 40%;">
      <div>
        <div>
          <el-select v-model="newOne.articleCatId" placeholder="知识库分类" size="large" style="width: 100%;">
            <el-option v-for="item in articleList" :key="item.id" :label="item.catName" :value="item.id" />
          </el-select>
        </div>
        <br>
        <div>
          <el-input v-model="newOne.title" placeholder="文章标题" />
        </div>
        <br>
        <div>
          <el-input v-model="newOne.content" placeholder="文章内容" type="textarea" />
        </div>
        <br>
        <div>
          是否显示：
          <el-radio-group v-model="newOne.open" size="small">
            <el-radio :label="1" border>true</el-radio>
            <el-radio :label="0" border>false</el-radio>
          </el-radio-group>
        </div>
        <br>
        <div>
          <el-button type="primary" style="width: 100%;" @click="toAdd()">添加</el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog v-model="editDialogVisible" title="修改文章" style="width: 40%;">
      <div>
        <div>
          <el-select v-model="editOne.articleCatId" placeholder="知识库分类" size="large" style="width: 100%;">
            <el-option v-for="item in articleList" :key="item.id" :label="item.catName" :value="item.id" />
          </el-select>
        </div>
        <br>
        <div>
          <el-input v-model="editOne.title" placeholder="文章标题" />
        </div>
        <br>
        <div>
          <el-input v-model="editOne.content" placeholder="文章内容" type="textarea" />
        </div>
        <br>
        <div>
          是否显示：
          <el-radio-group v-model="editOne.open" size="small">
            <el-radio :label="1" border>true</el-radio>
            <el-radio :label="0" border>false</el-radio>
          </el-radio-group>
        </div>
        <br>
        <div>
          <el-button type="primary" style="width: 100%;" @click="toEdit()">添加</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { article_add, article_edit, article_one, article_page, article_delete } from '../api/article';
import { articleCat_all, articleCat_one } from '../api/article-cat';

const store = useStore();
const addDialogVisible = ref(false);
const editDialogVisible = ref(false);
const tableData = ref([]);
const articleList = ref([]);
const newOne = ref({
  articleCatId: "",
  content: "",
  createTime: "",
  deleted: 0,
  id: 0,
  open: 0,
  title: "",
  updateTime: "",
  userinfoId: 0
});
const editOne = ref();
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);

const showAdd = () => {
  newOne.value = {
    articleCatId: "",
    content: "",
    open: "",
    title: "",
    userinfoId: 0
  };
  addDialogVisible.value = true;
}

const toAdd = () => {
  let data = {
    articleCatId: parseInt(newOne.value.articleCatId),
    content: newOne.value.content,
    createTime: new Date(),
    deleted: 0,
    id: 0,
    open: parseInt(newOne.value.open),
    title: newOne.value.title,
    updateTime: new Date(),
    userinfoId: 0
  };
  article_add(data).then(res => {
    if (res.data.code == 1) {
      alert("文章新增成功。");
      addDialogVisible.value = false;
      loadData();
    }
  });
}

const showEdit = (id) => {
  article_one(id).then(res => {
    editOne.value = res.data.data.article;
    editDialogVisible.value = true;
  });
}

const toEdit = () => {
  let data = {
    articleCatId: parseInt(editOne.value.articleCatId),
    content: editOne.value.content,
    createTime: editOne.value.createTime,
    deleted: editOne.value.deleted,
    id: editOne.value.id,
    open: parseInt(editOne.value.open),
    title: editOne.value.title,
    updateTime: new Date(),
    userinfoId: editOne.value.userinfoId
  };
  article_edit(data).then(res => {
    if (res.data.code == 1) {
      alert("修改成功。");
      editDialogVisible.value = false;
      loadData();

    }
  });
}

const toDel = (id) => {
  if (confirm("是否要删除该文章？")) {
    article_delete(id).then(res => {
      if (res.data.code == 1) {
        alert("该文章删除成功。");
        loadData();
      }
    });
  }
}

// const loadData = () => {
//   let data = {
//     current: currentPage.value,
//     size: pageSize.value
//   }
//   article_page(data).then((res) => {
//     let tempData = res.data.data.pages.records;
//     for (let item of tempData) {
//       let catName = getArticleCat(item.articleCatId);
//       console.log(catName);
//     }

//     // tableData.value = res.data.data.pages.records;
//     total.value = res.data.data.pages.total;
//   });
// }

const loadData = () => {
  let data = {
    current: currentPage.value,
    size: pageSize.value
  }
  article_page(data).then((res) => {
    let tempData = res.data.data.pages.records;
    total.value = res.data.data.pages.total;
    Promise.all(tempData.map((item) => articleCat_one(item.articleCatId))).then(res=>{
      for(let i=0;i<tempData.length;i++){
        tempData[i].articleCatId = res[i].data.data.articleCat.catName
      }
      tableData.value = tempData;
    });
  });
}

const loadArticleCat = () => {
  articleCat_all().then(res => {
    articleList.value = res.data.data.articleCats;
  });
}

const handleSizeChange = (val) => {
  pageSize.value = val;
  loadData();
}

const handleCurrentChange = (val) => {
  currentPage.value = val;
  loadData();
}

loadData();
loadArticleCat();

</script>

<style scoped>
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
  width: 100%;
}
</style>