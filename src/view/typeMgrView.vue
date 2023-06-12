<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>知识库分类管理</span>
          <el-button type="primary" @click="showAdd()">新增</el-button>
        </div>
      </template>
      <div>
        <el-table :data="tableData" style="width: 100%;">
          <el-table-column prop="id" label="ID" />
          <el-table-column prop="catName" label="类别名称" />
          <!-- <el-table-column prop="showInNav" label="是否显示" /> -->
          <el-table-column prop="sortOrder" label="sortOrder" />
          <el-table-column prop="parentId" label="上级ID" />
          <el-table-column fixed="right" label="操作">
            <template #default="scoped">
              <el-button link type="primary" size="small" @click="showEdit(scoped.row.id)">编辑</el-button>
              <el-button link type="danger" size="small" @click="toDel(scoped.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <el-dialog v-model="addDialogVisible" title="新增知识库分类" style="width: 40%;">
      <div>
        <div>
          <el-input v-model="newOne.catName" placeholder="知识库分类名称" />
        </div>
        <br>
        <div>
          <el-input v-model="newOne.sortOrder" placeholder="sortOrder" />
        </div>
        <br>
        <div>
          <el-input v-model="newOne.parentId" placeholder="上级ID" />
        </div>
        <br>
        <div>
          是否显示：
          <el-radio-group v-model="newOne.showInNav" size="small">
            <el-radio :label="true" border>true</el-radio>
            <el-radio :label="false" border>false</el-radio>
          </el-radio-group>
        </div>
        <br>
        <div>
          <el-button type="primary" style="width: 100%;" @click="toAdd()">添加</el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog v-model="editDialogVisible" title="修改知识库分类" style="width: 40%;">
      <div>
        <div>
          <el-input v-model="editOne.catName" placeholder="知识库分类名称" />
        </div>
        <br>
        <div>
          <el-input v-model="editOne.sortOrder" placeholder="sortOrder" />
        </div>
        <br>
        <div>
          <el-input v-model="editOne.parentId" placeholder="上级ID" />
        </div>
        <br>
        <div>
          是否显示：
          <el-radio-group v-model="editOne.showInNav" size="small">
            <el-radio :label="true" border>true</el-radio>
            <el-radio :label="false" border>false</el-radio>
          </el-radio-group>
        </div>
        <br>
        <div>
          <el-button type="primary" style="width: 100%;" @click="toEdit()">修改</el-button>
        </div>
      </div>
    </el-dialog>


  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  articleCat_all, articleCat_add, articleCat_delete, articleCat_edit, articleCat_one, articleCat_cateName
} from '../api/article-cat';

const addDialogVisible = ref(false);
const editDialogVisible = ref(false);
const tableData = ref([]);
const newOne = ref({
  catName: "",
  deleted: 0,
  id: 0,
  parentId: "",
  showInNav: "",
  sortOrder: "",
});
const editOne = ref();

const showAdd = () => {
  newOne.value = {
    catName: "",
    createTime: new Date(),
    deleted: "",
    id: 0,
    parentId: 0,
    showInNav: "",
    sortOrder: "",
    updateTime: new Date()
  };
  addDialogVisible.value = true;
}

const toAdd = () => {
  let data = {
    catName: newOne.value.catName,
    createTime: "",
    deleted: 0,
    id: 0,
    parentId: parseInt(newOne.value.parentId),
    showInNav: newOne.value.showInNav,
    sortOrder: parseInt(newOne.value.sortOrder),
    updateTime: ""
  };
  articleCat_cateName(data.catName).then(res => {
    if (res.data.code == 1) {
      articleCat_add(data).then(res => {
        if (res.data.code == 1) {
          alert("新增成功。")
          loadData();
          addDialogVisible.value = false;
        }
      });
    } else {
      alert(res.data.msg);
    }
  });
}

const showEdit = (id) => {
  articleCat_one(id).then(res => {
    editOne.value = res.data.data.articleCat;
    editDialogVisible.value = true;
  });
}

const toEdit = () => {
  let data = {
    catName: editOne.value.catName,
    createTime: editOne.value.createTime,
    deleted: editOne.value.deleted,
    id: editOne.value.id,
    parentId: parseInt(editOne.value.parentId),
    showInNav: editOne.value.showInNav,
    sortOrder: parseInt(newOne.value.sortOrder),
    updateTime: editOne.value.updateTime
  }
  articleCat_cateName(data.catName).then(res => {
    if (res.data.code == 1) {
      articleCat_edit(data).then(res => {
        if (res.data.code == 1) {
          alert("修改成功。")
          loadData();
          editDialogVisible.value = false;
        }
      });
    } else {
      alert(res.data.msg);
    }
  });
}


const toDel = (id) => {
  if (confirm("是否要删除该知识库分类？")) {
    articleCat_delete(id).then(res => {
      if (res.data.code == 1) {
        alert("该知识库分类删除成功。");
        loadData();
      }
    });
  }
}

const loadData = () => {
  articleCat_all().then(res => {
    tableData.value = res.data.data.articleCats;
  });
}

loadData();



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